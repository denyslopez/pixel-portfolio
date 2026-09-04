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

    float stage = clamp(uStage, 0.0, 3.0);
    vec2 pointer = (uPointer - .5) * vec2(1.5, 1.0);
    float d = length(centered - pointer * (.18 + stage * .025));

    float flowScale = 3.2 + stage * .38;
    float flow = noise(uv * flowScale + vec2(uTime * (.055 + stage * .004), -uTime * .035));
    flow += .55 * noise(uv * (6.6 + stage * .55) - vec2(uTime * .025, uTime * .04));

    float frequency = 14.5 + stage * 2.35;
    float wave = sin((uv.x + flow * (.12 + stage * .012) + uScroll * .00028) * frequency + uTime * (.42 + stage * .035));
    float energy = smoothstep(.72, .04, d) * (.52 + .48 * wave);
    energy += smoothstep(.78, .18, abs(uv.y - .52 - (.07 + stage * .012) * sin(uv.x * (7.5 + stage) + uTime * .28))) * (.1 + stage * .018);

    vec3 base = vec3(.018);
    vec3 acid = vec3(.72, 1.0, .08);
    vec3 warm = vec3(.96, .95, .91);

    vec3 color = base;
    color += acid * max(0.0, energy) * (.38 + stage * .055);
    color += warm * pow(max(flow - (.73 - stage * .018), 0.0), 2.1) * (.14 + stage * .02);

    float stagePulse = .5 + .5 * sin(uTime * .35 + stage * 1.7);
    color += acid * stagePulse * .018 * stage;

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

    let stageTarget = 0;
    const resize = () => renderer.setSize(host.clientWidth, host.clientHeight, false);
    const onPointer = (event: PointerEvent) => {
      uniforms.uPointer.value.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
    };
    const onScroll = () => { uniforms.uScroll.value = window.scrollY; };
    const onStage = (event: Event) => {
      const detail = (event as CustomEvent<{ stage?: number }>).detail;
      stageTarget = Math.max(0, Math.min(3, detail?.stage ?? 0));
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
