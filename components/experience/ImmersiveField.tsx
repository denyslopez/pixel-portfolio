"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uStage;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
               mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
  }

  float stageWeight(float stage, float target) {
    return 1.0 - smoothstep(0.0, 1.0, abs(stage - target));
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - .5;
    centered.x *= 1.5;
    vec2 pointer = (uPointer - .5) * vec2(1.5, 1.0);

    float w0 = stageWeight(uStage, 0.0);
    float w1 = stageWeight(uStage, 1.0);
    float w2 = stageWeight(uStage, 2.0);
    float w3 = stageWeight(uStage, 3.0);
    float wSum = max(.0001, w0 + w1 + w2 + w3);
    w0 /= wSum; w1 /= wSum; w2 /= wSum; w3 /= wSum;

    float flow = noise(uv * 3.2 + vec2(uTime * .045, -uTime * .03));
    flow += .46 * noise(uv * 6.6 - vec2(uTime * .022, uTime * .032));

    float design = .5 + .5 * sin((uv.y * 13.0 + uv.x * 3.0) + flow * 4.2 + uTime * .18);
    design *= smoothstep(1.0, .14, length(centered - pointer * .13));

    float gx = .5 + .5 * sin(uv.x * 27.0 + uTime * .25 + flow * 2.0);
    float gy = .5 + .5 * sin(uv.y * 19.0 - uTime * .18 - flow * 1.4);
    float build = pow(max(gx * gy, 0.0), 2.4) + .18 * flow;

    float aiA = sin(uv.x * 15.0 + uv.y * 8.0 + uTime * .42 + flow * 3.1);
    float aiB = sin(uv.x * 6.0 - uv.y * 14.0 - uTime * .31 + flow * 2.4);
    float ai = .5 + .5 * (aiA * aiB);
    ai *= smoothstep(1.0, .12, length(centered - pointer * .15));

    float growth = .5 + .5 * sin(uv.x * 8.0 + uv.y * 17.0 - uTime * .54 - uScroll * .0015 + flow * 4.0);
    growth = pow(max(growth, 0.0), 1.35);
    growth *= smoothstep(1.05, .12, length(centered));

    float energy = design * w0 + build * w1 + ai * w2 + growth * w3;
    float pointerGlow = smoothstep(.58, .025, length(centered - pointer * .23));
    energy += pointerGlow * mix(.08, .22, w2 + w3);

    vec3 base = vec3(.014);
    vec3 signal = vec3(.56, .86, .08);
    vec3 warm = vec3(.94, .93, .89);
    vec3 color = base;
    color += signal * pow(max(energy, 0.0), 1.72) * (.22 + .2 * (w2 + w3));
    color += warm * pow(max(flow - .74, 0.0), 2.15) * (.08 + .11 * w1);

    float vignette = smoothstep(1.02, .25, length(centered));
    color *= .58 + vignette * .42;
    gl_FragColor = vec4(color, .9);
  }
`;

export function ImmersiveField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch {
      host.dataset.fallback = "true";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(.5, .5) },
      uScroll: { value: 0 },
      uStage: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    host.appendChild(renderer.domElement);
    host.dataset.stage = "0";

    let stageTarget = 0;
    const resize = () => renderer.setSize(host.clientWidth, host.clientHeight, false);
    const onPointer = (event: PointerEvent) => {
      uniforms.uPointer.value.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
    };
    const onScroll = () => { uniforms.uScroll.value = window.scrollY; };
    const onStage = (event: Event) => {
      const detail = (event as CustomEvent<{ stage?: number }>).detail;
      stageTarget = Math.max(0, Math.min(3, detail?.stage ?? 0));
      host.dataset.stage = String(stageTarget);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("portfolio:stage", onStage);

    let raf = 0;
    const clock = new THREE.Clock();
    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uStage.value += (stageTarget - uniforms.uStage.value) * .05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("portfolio:stage", onStage);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="immersive-field" aria-hidden="true" />;
}
