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

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - .5;
    centered.x *= 1.5;

    vec2 pointer = (uPointer - .5) * vec2(1.5, 1.0);
    float d = length(centered - pointer * .25);

    float stage = clamp(uStage, 0.0, 3.0);
    float stageNorm = stage / 3.0;
    float density = mix(2.9, 5.4, stageNorm);
    float speed = mix(.045, .095, stageNorm);

    float flow = noise(uv * density + vec2(uTime * speed, -uTime * speed * .58));
    flow += .55 * noise(uv * (density * 2.05) - vec2(uTime * .025, uTime * .04));

    float wave = sin((uv.x + flow * .14 + uScroll * .00028) * mix(14.0, 22.0, stageNorm) + uTime * mix(.34, .7, stageNorm));
    float energy = smoothstep(.72, .04, d) * (.55 + .45 * wave);
    energy += smoothstep(.78, .18, abs(uv.y - .52 - .09 * sin(uv.x * 8.0 + uTime * .28))) * mix(.10, .2, stageNorm);

    vec3 base = vec3(.018);
    vec3 acid = vec3(.72, 1.0, .08);
    vec3 warm = vec3(.96, .95, .91);

    vec3 color = base;
    color += acid * max(0.0, energy) * mix(.36, .62, stageNorm);
    color += warm * pow(max(flow - mix(.75, .66, stageNorm), 0.0), 2.1) * mix(.12, .25, stageNorm);

    float vignette = smoothstep(.95, .25, length(centered));
    color *= .62 + vignette * .38;

    gl_FragColor = vec4(color, .93);
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
      uniforms.uStage.value += (stageTarget - uniforms.uStage.value) * .045;
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
