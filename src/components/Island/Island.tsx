import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useI18n } from "../../i18n/I18nContext";
import "./Island.css";

// ---------- deterministic value-noise (no external deps) ----------

function hash2(x: number, y: number, seed: number): number {
  let h = x * 374761393 + y * 668265263 + seed * 974521;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}

function smootherstep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function valueNoise2D(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const sx = smootherstep(x - x0);
  const sy = smootherstep(y - y0);

  const n00 = hash2(x0, y0, seed);
  const n10 = hash2(x1, y0, seed);
  const n01 = hash2(x0, y1, seed);
  const n11 = hash2(x1, y1, seed);

  const ix0 = lerp(n00, n10, sx);
  const ix1 = lerp(n01, n11, sx);
  return lerp(ix0, ix1, sy);
}

function fbm(x: number, y: number, seed: number, octaves = 5): number {
  let amplitude = 0.5;
  let frequency = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amplitude * valueNoise2D(x * frequency, y * frequency, seed + i * 101);
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return sum / norm; // ~0..1
}

/** Height of the island at normalized coords (-1..1), before vertical scale. */
function islandHeight(nx: number, ny: number, seed: number): number {
  const n = fbm(nx * 2.2 + 11.3, ny * 2.2 + 7.1, seed);
  const d = Math.sqrt(nx * nx + ny * ny);
  const mask = Math.max(0, 1 - Math.pow(Math.min(d / 0.92, 1.4), 3));
  return n * mask - (1 - mask) * 0.22;
}

// ---------- colors by elevation ----------

const COLORS = {
  deepWater: new THREE.Color("#1b5e86"),
  seabed: new THREE.Color("#2c7aa8"),
  sand: new THREE.Color("#e3d6a0"),
  grass: new THREE.Color("#6fa85a"),
  forest: new THREE.Color("#3f7a44"),
  rock: new THREE.Color("#8d8577"),
  snow: new THREE.Color("#f4f6f8"),
};

function colorForHeight(h: number): THREE.Color {
  if (h < -0.05) return COLORS.seabed;
  if (h < 0.06) return COLORS.sand;
  if (h < 0.55) return COLORS.grass;
  if (h < 1.0) return COLORS.forest;
  if (h < 1.45) return COLORS.rock;
  return COLORS.snow;
}

const SEGMENTS = 110;
const WORLD_SIZE = 9;
const HEIGHT_SCALE = 2.6;
const SEA_LEVEL = 0;

function buildTerrainGeometry(seed: number): THREE.BufferGeometry {
  const geometry = new THREE.PlaneGeometry(
    WORLD_SIZE,
    WORLD_SIZE,
    SEGMENTS,
    SEGMENTS,
  );
  geometry.rotateX(-Math.PI / 2);

  const position = geometry.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(position.count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const nx = x / (WORLD_SIZE / 2);
    const nz = z / (WORLD_SIZE / 2);

    const raw = islandHeight(nx, nz, seed);
    const y = Math.max(raw, -0.5) * HEIGHT_SCALE;
    position.setY(i, y);

    color.copy(colorForHeight(raw));
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export function Island() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const terrainRef = useRef<THREE.Mesh | null>(null);
  const waterRef = useRef<THREE.Mesh | null>(null);
  const waterGeomRef = useRef<THREE.PlaneGeometry | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const clockRef = useRef(new THREE.Clock());

  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1_000_000));
  const [seedInput, setSeedInput] = useState(String(seed));

  // one-time scene / renderer / controls setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#bfe6ff");
    scene.fog = new THREE.Fog(0xbfe6ff, 9, 18);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 5.6, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 4.2;
    controls.maxDistance = 13;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.target.set(0, 0.2, 0);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x3a5a40, 0.9);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff1d6, 1.3);
    sun.position.set(5, 8, 4);
    scene.add(sun);

    // water
    const waterGeom = new THREE.PlaneGeometry(WORLD_SIZE * 1.6, WORLD_SIZE * 1.6, 40, 40);
    waterGeom.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x3f9fd8,
      transparent: true,
      opacity: 0.78,
      roughness: 0.3,
      metalness: 0.1,
    });
    const water = new THREE.Mesh(waterGeom, waterMat);
    water.position.y = SEA_LEVEL;
    scene.add(water);
    waterRef.current = water;
    waterGeomRef.current = waterGeom;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let raf = 0;
    const basePos = waterGeom.attributes.position as THREE.BufferAttribute;
    const baseY = Float32Array.from(
      { length: basePos.count },
      (_, i) => basePos.getY(i),
    );

    const tick = () => {
      const elapsed = clockRef.current.getElapsedTime();
      for (let i = 0; i < basePos.count; i++) {
        const x = basePos.getX(i);
        const z = basePos.getZ(i);
        const wave = Math.sin(x * 0.6 + elapsed * 1.1) * 0.03 +
          Math.cos(z * 0.5 + elapsed * 0.9) * 0.03;
        basePos.setY(i, baseY[i] + wave);
      }
      basePos.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      waterGeom.dispose();
      waterMat.dispose();
      terrainRef.current?.geometry.dispose();
      (terrainRef.current?.material as THREE.Material | undefined)?.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // (re)build terrain whenever the seed changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const geometry = buildTerrainGeometry(seed);
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 1,
      metalness: 0,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const prev = terrainRef.current;
    if (prev) {
      scene.remove(prev);
      prev.geometry.dispose();
      (prev.material as THREE.Material).dispose();
    }

    scene.add(mesh);
    terrainRef.current = mesh;
  }, [seed]);

  const applySeed = useCallback(() => {
    const parsed = Number.parseInt(seedInput, 10);
    setSeed(Number.isFinite(parsed) ? parsed : 0);
  }, [seedInput]);

  const randomSeed = useCallback(() => {
    const next = Math.floor(Math.random() * 1_000_000);
    setSeed(next);
    setSeedInput(String(next));
  }, []);

  return (
    <div className="island-app">
      <div className="island-toolbar">
        <label className="island-seed-label">
          {t.island.seed}
          <input
            className="island-seed-input"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && applySeed()}
            inputMode="numeric"
          />
        </label>
        <button className="island-btn" onClick={applySeed}>
          ↻
        </button>
        <button className="island-btn island-btn-primary" onClick={randomSeed}>
          🎲 {t.island.newIsland}
        </button>
      </div>
      <div className="island-canvas" ref={containerRef} />
      <div className="island-hint">{t.island.hint}</div>
    </div>
  );
}
