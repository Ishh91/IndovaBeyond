import React, { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import * as THREE from "three";

const RING_COUNT = 52;
const SPACING = 3.15;
const TUNNEL_LENGTH = RING_COUNT * SPACING;
const TUNNEL_RADIUS = 5.25;

const goldMaterial = new THREE.MeshStandardMaterial({
  color: "#080808",
  metalness: 0.95,
  roughness: 0.2,
});

const darkMetalMaterial = new THREE.MeshStandardMaterial({
  color: "#17130e",
  metalness: 0.92,
  roughness: 0.3,
});

const lightMaterial = new THREE.MeshBasicMaterial({
  color: "#ffffff",
  toneMapped: false,
});

/* ------------------------------------------------------------------ */
/*  ORIGINAL TUNNEL — unchanged                                        */
/* ------------------------------------------------------------------ */

function TunnelRings() {
  const ringData = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => ({
        id: i,
        z: -i * SPACING,
        radius: TUNNEL_RADIUS + Math.sin(i * 0.27) * 0.08,
      })),
    []
  );

  return (
    <group>
      {ringData.map((ring) => (
        <group key={ring.id} position={[0, 0, ring.z]}>
          {/* Main heavy structural rib */}
          <mesh scale={[1, 0.82, 1]}>
            <torusGeometry args={[ring.radius, 0.09, 12, 128]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>

          {/* Polished golden outer edge */}
          <mesh scale={[1, 0.82, 1]}>
            <torusGeometry args={[ring.radius - 0.11, 0.027, 8, 128]} />
            <primitive object={lightMaterial} attach="material" />
          </mesh>

          {/* Inner metallic trim */}
          <mesh scale={[1, 0.82, 1]} position={[0, 0, -0.12]}>
            <torusGeometry args={[ring.radius - 0.3, 0.025, 8, 128]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>

          {/* Ring connection brackets */}
          {Array.from({ length: 8 }, (_, j) => {
            const angle = (j / 8) * Math.PI * 2;
            const x = Math.cos(angle) * (ring.radius - 0.2);
            const y = Math.sin(angle) * (ring.radius * 0.82 - 0.2);

            return (
              <mesh
                key={j}
                position={[x, y, 0]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[0.17, 0.32, 0.19]} />
                <primitive object={goldMaterial} attach="material" />
              </mesh>
            );
          })}

          {/* Four bright ring markers */}
          {Array.from({ length: 4 }, (_, j) => {
            const angle = (j / 4) * Math.PI * 2;

            return (
              <mesh
                key={j}
                position={[
                  Math.cos(angle) * ring.radius,
                  Math.sin(angle) * ring.radius * 0.82,
                  0.035,
                ]}
              >
                <sphereGeometry args={[0.065, 12, 12]} />
                <primitive object={lightMaterial} attach="material" />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function LongitudinalRails() {
  const rails = useMemo(() => {
    const result = [];

    // Eight longitudinal rails around the tunnel.
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;

      const x = Math.cos(angle) * TUNNEL_RADIUS;
      const y = Math.sin(angle) * TUNNEL_RADIUS * 0.82;

      const points = [
        new THREE.Vector3(x, y, 4),
        new THREE.Vector3(x, y, -TUNNEL_LENGTH * 0.25),
        new THREE.Vector3(x, y, -TUNNEL_LENGTH * 0.55),
        new THREE.Vector3(x, y, -TUNNEL_LENGTH),
      ];

      const curve = new THREE.CatmullRomCurve3(points);

      result.push({
        id: i,
        geometry: new THREE.TubeGeometry(curve, 180, 0.045, 8, false),
      });
    }

    return result;
  }, []);

  return (
    <group>
      {rails.map((rail, i) => (
        <group key={rail.id}>
          <mesh geometry={rail.geometry}>
            <primitive
              object={i % 2 === 0 ? goldMaterial : darkMetalMaterial}
              attach="material"
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function WallPanels() {
  const panels = useMemo(() => {
    const items = [];

    for (let i = 0; i < RING_COUNT - 1; i++) {
      for (const side of [-1, 1]) {
        items.push({
          id: `${i}-${side}`,
          x: side * 5.12,
          y: 0,
          z: -i * SPACING - SPACING / 2,
          side,
        });
      }
    }

    return items;
  }, []);

  return (
    <group>
      {panels.map((panel) => (
        <group
          key={panel.id}
          position={[panel.x, panel.y, panel.z]}
          rotation={[0, panel.side * Math.PI / 2, 0]}
        >
          {/* Dark wall module */}
          <mesh>
            <boxGeometry args={[2.8, 4.2, 0.12]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>

          {/* Panel border */}
          <mesh position={[0, 0, panel.side * 0.075]}>
            <boxGeometry args={[2.5, 3.9, 0.035]} />
            <meshStandardMaterial
              color="#49331c"
              metalness={1}
              roughness={0.25}
            />
          </mesh>

          {/* Light panel */}
          <mesh position={[0, 0, panel.side * 0.1]}>
            <boxGeometry args={[0.055, 2.5, 0.035]} />
            <primitive object={lightMaterial} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FloorDetails() {
  const strips = [-3.8, -2.7, 2.7, 3.8];

  return (
    <group>
      {/* Reflective central floor */}
      <mesh
        position={[0, -4.25, -TUNNEL_LENGTH / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[11, TUNNEL_LENGTH + 30]} />
        <meshStandardMaterial
          color="#27221d"
          metalness={0.98}
          roughness={0.17}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floor light strips */}
      {strips.map((x) => (
        <mesh
          key={x}
          position={[x, -4.22, -TUNNEL_LENGTH / 2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[x % 2 === 0 ? 0.07 : 0.035, TUNNEL_LENGTH + 30]} />
          <meshBasicMaterial
            color="#ffffff"
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Floor cross-section seams */}
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <mesh
          key={i}
          position={[0, -4.205, -i * SPACING]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[10.5, 0.025]} />
          <meshBasicMaterial
            color="#ffffff"
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function CeilingLights() {
  return (
    <group>
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <group key={i} position={[0, 4.15, -i * SPACING]}>
          <mesh>
            <boxGeometry args={[1.5, 0.055, 0.2]} />
            <primitive object={lightMaterial} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AtmosphericParticles() {
  const pointsRef = useRef();

  const geometry = useMemo(() => {
    const positions = new Float32Array(850 * 3);

    for (let i = 0; i < 850; i++) {
      const angle = i * 2.399;
      const radius = 0.5 + ((i * 17) % 470) / 100;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.8;
      positions[i * 3 + 2] = -((i * 29) % Math.floor(TUNNEL_LENGTH));
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.025;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.035}
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function AnimatedLights() {
  const lightA = useRef();
  const lightB = useRef();
  const lightC = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (lightA.current) {
      lightA.current.intensity = 22 + Math.sin(t * 1.2) * 4;
    }

    if (lightB.current) {
      lightB.current.intensity = 15 + Math.sin(t * 1.7 + 1) * 3;
    }

    if (lightC.current) {
      lightC.current.intensity = 12 + Math.sin(t * 0.8 + 2) * 3;
    }
  });

  return (
    <>
      <pointLight
        ref={lightA}
        position={[0, 2.2, -12]}
        color="#ffffff"
        intensity={22}
        distance={32}
      />

      <pointLight
        ref={lightB}
        position={[-3, 0.5, -35]}
        color="#ffffff"
        intensity={15}
        distance={28}
      />

      <pointLight
        ref={lightC}
        position={[3, 1.5, -65]}
        color="#ffffff"
        intensity={12}
        distance={30}
      />
    </>
  );
}

function TunnelCamera({ progressRef }) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const progress = progressRef.current || 0;
    const targetZ = 4 - progress * (TUNNEL_LENGTH - 14);

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      3.5,
      delta
    );

    // Dynamic wide-angle 3D zoom out on scroll
    const targetFov = 70 + Math.min(progress * 24, 20);
    if (camera.isPerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 3, delta);
      camera.updateProjectionMatrix();
    }

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      Math.sin(progress * Math.PI * 3) * 0.16,
      2,
      delta
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      Math.sin(state.clock.elapsedTime * 0.45) * 0.045,
      2,
      delta
    );

    camera.rotation.z = THREE.MathUtils.damp(
      camera.rotation.z,
      Math.sin(progress * Math.PI * 2) * 0.012,
      2,
      delta
    );

    camera.lookAt(
      camera.position.x * 0.15,
      0,
      camera.position.z - 16
    );
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  NEW CREATIVE LAYERS — same white / dark-metal palette only         */
/* ------------------------------------------------------------------ */

// Deterministic random so the layout is identical on every load.
function createRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeGlowMaterial(opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
}

/* 1. Volumetric light beams falling from every ceiling light */

const beamVertexShader = /* glsl */ `
  attribute float aPhase;
  varying float vHeight;
  varying float vPhase;
  varying float vDepth;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    vec4 pos = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      pos = instanceMatrix * pos;
    #endif
    vec4 mv = modelViewMatrix * pos;

    vHeight = uv.y;
    vPhase = aPhase;
    vDepth = -mv.z;
    vNormalView = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);

    gl_Position = projectionMatrix * mv;
  }
`;

const beamFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying float vHeight;
  varying float vPhase;
  varying float vDepth;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    float vertical = pow(vHeight, 1.8);
    float softEdge = pow(abs(dot(vNormalView, vViewDir)), 1.4);
    float breathe = 0.82 + 0.18 * sin(uTime * 1.3 + vPhase * 6.2831);
    float farFade = 1.0 - smoothstep(30.0, 95.0, vDepth);
    float nearFade = smoothstep(0.6, 4.5, vDepth);

    float alpha = vertical * softEdge * breathe * farFade * nearFade * uOpacity;
    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`;

function LightBeams() {
  const meshRef = useRef();
  const BEAM_HEIGHT = 8.3;

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1.7, BEAM_HEIGHT, 40, 1, true);
    const phases = new Float32Array(RING_COUNT);
    for (let i = 0; i < RING_COUNT; i++) phases[i] = (i * 0.618) % 1;
    geo.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phases, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0.085 } },
        vertexShader: beamVertexShader,
        fragmentShader: beamFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    []
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < RING_COUNT; i++) {
      dummy.position.set(0, 4.15 - BEAM_HEIGHT / 2, -i * SPACING);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, RING_COUNT]}
      frustumCulled={false}
      renderOrder={2}
    />
  );
}

/* 2. Energy pulse rings that sweep through the tunnel toward the portal */

const PULSE_COUNT = 4;
const PULSE_SPEED = 13;

function EnergyPulses() {
  const groups = useRef([]);

  const materials = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        core: makeGlowMaterial(0),
        halo: makeGlowMaterial(0),
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PULSE_COUNT; i++) {
      const g = groups.current[i];
      if (!g) continue;

      const travel =
        (t * PULSE_SPEED + i * (TUNNEL_LENGTH / PULSE_COUNT)) % TUNNEL_LENGTH;
      const f = travel / TUNNEL_LENGTH;
      const fade = Math.sin(f * Math.PI);

      g.position.z = 2 - travel;
      const s = 1 + Math.sin(t * 3 + i) * 0.006;
      g.scale.set(s, s * 0.82, 1);

      materials[i].core.opacity = fade * 0.85;
      materials[i].halo.opacity = fade * 0.1;
    }
  });

  return (
    <group>
      {materials.map((m, i) => (
        <group key={i} ref={(el) => (groups.current[i] = el)}>
          <mesh material={m.core}>
            <torusGeometry args={[TUNNEL_RADIUS - 0.18, 0.03, 8, 160]} />
          </mesh>
          <mesh material={m.halo}>
            <torusGeometry args={[TUNNEL_RADIUS - 0.18, 0.22, 10, 160]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* 3. Light "chase" wave that rolls across the ceiling fixtures */

function CeilingChase() {
  const meshRef = useRef();
  const color = useMemo(() => new THREE.Color(), []);
  const geometry = useMemo(() => new THREE.BoxGeometry(1.9, 0.03, 0.42), []);
  const material = useMemo(() => makeGlowMaterial(1), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < RING_COUNT; i++) {
      dummy.position.set(0, 4.1, -i * SPACING);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.setScalar(0));
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
  }, [color]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || !mesh.instanceColor) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < RING_COUNT; i++) {
      const fast = Math.pow(Math.max(0, Math.sin(i * 0.32 - t * 2.4)), 14);
      const slow = Math.pow(Math.max(0, Math.sin(i * 0.11 - t * 0.7)), 6) * 0.35;
      mesh.setColorAt(i, color.setScalar((fast + slow) * 1.6));
    }
    mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, RING_COUNT]}
      frustumCulled={false}
    />
  );
}

/* 4. Light tracers racing along the floor strips */

const TRACER_LANES = [
  { x: -3.8, dir: 1, speed: 9 },
  { x: -2.7, dir: -1, speed: 5.5 },
  { x: 2.7, dir: -1, speed: 5.5 },
  { x: 3.8, dir: 1, speed: 9 },
];
const TRACERS_PER_LANE = 7;
const TRACER_COUNT = TRACER_LANES.length * TRACERS_PER_LANE;

function FloorTracers() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.06, 0.012, 1), []);
  const material = useMemo(() => lightMaterial, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    let idx = 0;

    TRACER_LANES.forEach((lane, li) => {
      for (let k = 0; k < TRACERS_PER_LANE; k++) {
        const offset = (k / TRACERS_PER_LANE) * TUNNEL_LENGTH + li * 11;
        const travel = (t * lane.speed + offset) % TUNNEL_LENGTH;
        const z = lane.dir === 1 ? 4 - travel : 4 - (TUNNEL_LENGTH - travel);
        const edgeFade = Math.sin((travel / TUNNEL_LENGTH) * Math.PI);

        dummy.position.set(lane.x, -4.2, z);
        dummy.scale.set(1, 1, 0.2 + edgeFade * 1.6);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx++, dummy.matrix);
      }
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, TRACER_COUNT]}
      frustumCulled={false}
    />
  );
}

/* 5. Speed streaks — stretch when the user scrolls fast */

const STREAK_COUNT = 140;
const STREAK_DEPTH = 70;

function SpeedStreaks() {
  const meshRef = useRef();
  const { camera } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.014, 0.014, 1), []);
  const material = useMemo(() => makeGlowMaterial(0.2), []);
  const motion = useRef({ prevZ: null, velocity: 0 });

  const streaks = useMemo(() => {
    const rand = createRandom(7);
    return Array.from({ length: STREAK_COUNT }, () => {
      const angle = rand() * Math.PI * 2;
      const radius = 1.4 + rand() * 3.1;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.78,
        z: 4 - rand() * STREAK_DEPTH,
        speed: 0.6 + rand() * 0.8,
      };
    });
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dt = Math.min(delta, 0.05);
    const m = motion.current;
    const camZ = camera.position.z;

    if (m.prevZ === null) m.prevZ = camZ;
    const rawVelocity = Math.max(0, (m.prevZ - camZ) / Math.max(dt, 1e-4));
    m.prevZ = camZ;
    m.velocity = THREE.MathUtils.damp(m.velocity, rawVelocity, 4, dt);

    const v = m.velocity;
    const length = THREE.MathUtils.clamp(0.35 + v * 0.18, 0.35, 7);
    material.opacity = THREE.MathUtils.clamp(0.16 + v * 0.025, 0.16, 0.75);

    for (let i = 0; i < STREAK_COUNT; i++) {
      const s = streaks[i];
      s.z += (2.5 + v * 0.9) * s.speed * dt;

      if (s.z > camZ + 1.5) {
        s.z = camZ - STREAK_DEPTH * (0.7 + Math.random() * 0.3);
      } else if (s.z < camZ - STREAK_DEPTH - 5) {
        s.z = camZ - Math.random() * STREAK_DEPTH;
      }

      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.set(1, 1, length * s.speed);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, STREAK_COUNT]}
      frustumCulled={false}
    />
  );
}

/* 6. Soft floating light motes drifting around the camera */

const MOTE_COUNT = 420;
const MOTE_DEPTH = 60;

function FloatingMotes() {
  const pointsRef = useRef();
  const { camera } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.45)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const { geometry, motes } = useMemo(() => {
    const rand = createRandom(19);
    const positions = new Float32Array(MOTE_COUNT * 3);
    const list = Array.from({ length: MOTE_COUNT }, () => {
      const angle = rand() * Math.PI * 2;
      const radius = 0.4 + rand() * 4.2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.8,
        z: 4 - rand() * MOTE_DEPTH,
        phase: rand() * Math.PI * 2,
        sway: 0.08 + rand() * 0.25,
        rise: 0.05 + rand() * 0.18,
      };
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, motes: list };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const camZ = camera.position.z;
    const arr = geometry.attributes.position.array;

    for (let i = 0; i < MOTE_COUNT; i++) {
      const m = motes[i];
      m.y += m.rise * dt;
      if (m.y > 3.9) m.y = -4;

      if (m.z > camZ + 2) m.z -= MOTE_DEPTH;
      else if (m.z < camZ - MOTE_DEPTH + 2) m.z += MOTE_DEPTH;

      arr[i * 3] = m.x + Math.sin(t * 0.4 + m.phase) * m.sway;
      arr[i * 3 + 1] = m.y + Math.cos(t * 0.6 + m.phase) * m.sway * 0.5;
      arr[i * 3 + 2] = m.z;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={texture}
        color="#ffffff"
        size={0.11}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* 7. Portal crown — halo + rotating arc rings + orbiting lights */

const haloVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const haloFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float core = pow(clamp(1.0 - d, 0.0, 1.0), 2.6);
    float ring = exp(-pow((d - 0.42) * 14.0, 2.0)) * 0.35;
    float pulse = 0.85 + 0.15 * sin(uTime * 1.6);
    float fade = 1.0 - smoothstep(45.0, 110.0, vDepth);
    gl_FragColor = vec4(vec3(1.0), (core * 0.55 + ring) * pulse * fade);
  }
`;

function PortalCrown() {
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const orbit = useRef();

  const haloMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: haloVertexShader,
        fragmentShader: haloFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    haloMaterial.uniforms.uTime.value = t;

    if (ringA.current) ringA.current.rotation.z = t * 0.25;
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.18;
      ringB.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (ringC.current) {
      ringC.current.rotation.z = t * 0.1;
      ringC.current.rotation.y = Math.cos(t * 0.25) * 0.12;
    }
    if (orbit.current) orbit.current.rotation.z = -t * 0.4;
  });

  return (
    <group position={[0, 0, -TUNNEL_LENGTH - 1]}>
      <mesh position={[0, 0, -2.5]} material={haloMaterial}>
        <planeGeometry args={[16, 16]} />
      </mesh>

      <mesh ref={ringA}>
        <torusGeometry args={[2.75, 0.022, 8, 160]} />
        <primitive object={lightMaterial} attach="material" />
      </mesh>

      <mesh ref={ringB}>
        <torusGeometry args={[3.2, 0.06, 10, 160, Math.PI * 1.55]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      <group ref={ringC}>
        {[0, Math.PI].map((rot) => (
          <mesh key={rot} rotation={[0, 0, rot]}>
            <torusGeometry args={[3.65, 0.035, 8, 120, Math.PI * 0.7]} />
            <primitive object={lightMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      <group ref={orbit}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const r = i % 2 === 0 ? 3.42 : 3.48;
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]}>
              <sphereGeometry args={[i % 4 === 0 ? 0.07 : 0.04, 10, 10]} />
              <primitive object={lightMaterial} attach="material" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  SCENE                                                              */
/* ------------------------------------------------------------------ */

function TunnelScene({ progressRef }) {
  return (
    <>
      <color attach="background" args={["#030201"]} />
      <fog attach="fog" args={["#080603", 22, 105]} />

      <ambientLight intensity={0.48} color="#ffffff" />

      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#090604"
        intensity={0.42}
      />

      <AnimatedLights />
      <TunnelCamera progressRef={progressRef} />

      <TunnelRings />
      <LongitudinalRails />
      <WallPanels />
      <FloorDetails />
      <CeilingLights />
      <AtmosphericParticles />

      {/* New creative layers */}
      <LightBeams />
      <EnergyPulses />
      <CeilingChase />
      <FloorTracers />
      <SpeedStreaks />
      <FloatingMotes />
      <PortalCrown />

      {/* Far-end golden portal */}
      <mesh position={[0, 0, -TUNNEL_LENGTH - 1]}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.35}
          luminanceThreshold={0.52}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette
          eskil={false}
          offset={0.25}
          darkness={0.78}
        />
        <Noise opacity={0.025} />
      </EffectComposer>
    </>
  );
}

export default function GoldenTunnel({ progressRef }) {
  return (
    <div className="golden-tunnel-canvas">
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 70,
          near: 0.1,
          far: 190,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <TunnelScene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
