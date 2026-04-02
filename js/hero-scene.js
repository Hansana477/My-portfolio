import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js";

const canvas = document.getElementById("hero-canvas");

if (canvas) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.6, 8.8);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.HemisphereLight(0xa5f3fc, 0x040812, 1.4);
    const keyLight = new THREE.PointLight(0x7dd3fc, 22, 18, 2);
    const warmLight = new THREE.PointLight(0xf59e0b, 18, 16, 2);
    keyLight.position.set(4.6, 3.8, 3.8);
    warmLight.position.set(-4.2, -2.5, 2.5);

    scene.add(ambientLight, keyLight, warmLight);

    const group = new THREE.Group();
    scene.add(group);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x7dd3fc,
        emissive: 0x0b2742,
        metalness: 0.35,
        roughness: 0.22,
        transmission: 0.18,
        transparent: true,
        opacity: 0.92
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xf8fafc,
        transparent: true,
        opacity: 0.22,
        wireframe: true
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0x3a2204,
        metalness: 0.4,
        roughness: 0.32
    });

    const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.5, 0.42, 180, 28),
        coreMaterial
    );

    const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.45, 1),
        wireMaterial
    );

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.7, 0.06, 18, 180),
        ringMaterial
    );
    ring.rotation.x = 1.1;
    ring.rotation.y = 0.35;

    group.add(knot, shell, ring);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
        const radius = THREE.MathUtils.randFloat(3.6, 8.2);
        const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2);
        const phi = THREE.MathUtils.randFloatSpread(Math.PI);
        const offset = index * 3;

        positions[offset] = radius * Math.cos(theta) * Math.cos(phi);
        positions[offset + 1] = radius * Math.sin(phi) * 0.72;
        positions[offset + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xdbeafe,
        size: 0.04,
        transparent: true,
        opacity: 0.9
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const pointer = { x: 0, y: 0 };

    const onPointerMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", () => {
        pointer.x = 0;
        pointer.y = 0;
    });

    function resizeRendererToDisplaySize() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.7);
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);
        const shouldResize = canvas.width !== width || canvas.height !== height;

        if (shouldResize) {
            renderer.setSize(width, height, false);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
    }

    let animationFrameId = 0;

    const render = (time) => {
        const seconds = time * 0.001;

        resizeRendererToDisplaySize();

        group.rotation.y += ((pointer.x * 0.35) - group.rotation.y) * 0.04;
        group.rotation.x += ((pointer.y * 0.18) - group.rotation.x) * 0.04;
        shell.rotation.x = seconds * 0.12;
        shell.rotation.y = seconds * 0.16;

        if (!reducedMotion) {
            knot.rotation.x = seconds * 0.22;
            knot.rotation.y = seconds * 0.3;
            ring.rotation.z = seconds * 0.16;
            particles.rotation.y = seconds * 0.024;
            particles.rotation.x = Math.sin(seconds * 0.12) * 0.08;
        }

        renderer.render(scene, camera);

        if (!reducedMotion) {
            animationFrameId = window.requestAnimationFrame(render);
        }
    };

    render(0);

    window.addEventListener("resize", resizeRendererToDisplaySize);
    window.addEventListener("pagehide", () => {
        window.cancelAnimationFrame(animationFrameId);
        canvas.removeEventListener("pointermove", onPointerMove);
        knot.geometry.dispose();
        shell.geometry.dispose();
        ring.geometry.dispose();
        particlesGeometry.dispose();
        coreMaterial.dispose();
        wireMaterial.dispose();
        ringMaterial.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
    });
}
