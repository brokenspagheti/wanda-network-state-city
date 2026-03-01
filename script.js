import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let buildings = [];
let connections = [];
let particles = [];

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e27, 0.015);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(50, 40, 50);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0e27);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 150;
    controls.minDistance = 20;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // Ground grid
    createGround();

    // Create city districts
    createGovernanceHub();
    createInnovationDistrict();
    createResidentialNodes();
    createGreenCommons();
    createDataCenters();

    // Create network connections
    createNetworkConnections();

    // Create particle system
    createParticles();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function createGround() {
    const gridHelper = new THREE.GridHelper(100, 50, 0x00ffff, 0x003344);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Base platform
    const platformGeometry = new THREE.CircleGeometry(50, 64);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0e27,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = -0.1;
    scene.add(platform);
}

function createBuilding(x, z, width, height, depth, color, glowIntensity = 1) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3 * glowIntensity,
        metalness: 0.8,
        roughness: 0.2
    });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, height / 2, z);
    building.castShadow = true;
    building.receiveShadow = true;
    
    // Add edge glow
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.8
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    building.add(wireframe);
    
    scene.add(building);
    buildings.push(building);
    return building;
}

function createGovernanceHub() {
    // Central governance tower
    const tower = createBuilding(0, 0, 8, 25, 8, 0x00ffff, 1.5);
    
    // Surrounding council buildings
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 12;
        const z = Math.sin(angle) * 12;
        createBuilding(x, z, 4, 12, 4, 0x0088ff);
    }
}

function createInnovationDistrict() {
    // Tech campus buildings
    const positions = [
        [20, -15], [25, -15], [30, -15],
        [20, -22], [25, -22], [30, -22]
    ];
    
    positions.forEach(([x, z]) => {
        const height = 8 + Math.random() * 10;
        createBuilding(x, z, 5, height, 5, 0xff00ff, 1.2);
    });
}

function createResidentialNodes() {
    // Distributed residential clusters
    const clusters = [
        [-25, 15], [-25, 25], [-35, 20],
        [25, 20], [30, 28], [35, 15]
    ];
    
    clusters.forEach(([cx, cz]) => {
        for (let i = 0; i < 4; i++) {
            const x = cx + (Math.random() - 0.5) * 8;
            const z = cz + (Math.random() - 0.5) * 8;
            const height = 6 + Math.random() * 6;
            createBuilding(x, z, 3, height, 3, 0x00ff88);
        }
    });
}

function createGreenCommons() {
    // Parks and green spaces
    const parks = [
        [-15, -5], [15, 10], [-10, 30], [10, -25]
    ];
    
    parks.forEach(([x, z]) => {
        const geometry = new THREE.CylinderGeometry(4, 4, 0.5, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x00ff00,
            emissiveIntensity: 0.2
        });
        const park = new THREE.Mesh(geometry, material);
        park.position.set(x, 0.25, z);
        scene.add(park);
        
        // Add trees
        for (let i = 0; i < 5; i++) {
            const tx = x + (Math.random() - 0.5) * 6;
            const tz = z + (Math.random() - 0.5) * 6;
            const treeGeometry = new THREE.ConeGeometry(0.5, 3, 8);
            const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
            const tree = new THREE.Mesh(treeGeometry, treeMaterial);
            tree.position.set(tx, 1.5, tz);
            scene.add(tree);
        }
    });
}

function createDataCenters() {
    // Network infrastructure nodes
    const dataNodes = [
        [-35, -25], [35, -25], [-35, 35], [35, 35]
    ];
    
    dataNodes.forEach(([x, z]) => {
        createBuilding(x, z, 6, 15, 6, 0xff0088, 1.3);
        
        // Add antenna
        const antennaGeometry = new THREE.CylinderGeometry(0.2, 0.2, 8, 8);
        const antennaMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0088,
            emissive: 0xff0088,
            emissiveIntensity: 0.5
        });
        const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna.position.set(x, 15 + 4, z);
        scene.add(antenna);
    });
}

function createNetworkConnections() {
    // Create glowing connections between key buildings
    const keyPoints = [
        new THREE.Vector3(0, 12, 0), // Governance
        new THREE.Vector3(25, 10, -18), // Innovation
        new THREE.Vector3(-30, 5, 20), // Residential
        new THREE.Vector3(-35, 7, -25), // Data Center 1
        new THREE.Vector3(35, 7, -25), // Data Center 2
    ];
    
    for (let i = 0; i < keyPoints.length; i++) {
        for (let j = i + 1; j < keyPoints.length; j++) {
            const points = [keyPoints[i], keyPoints[j]];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.2
            });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connections.push(line);
        }
    }
}

function createParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = Math.random() * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.2, 1, 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Pulse buildings
    buildings.forEach((building, index) => {
        const pulse = Math.sin(time * 2 + index * 0.5) * 0.2 + 0.8;
        building.material.emissiveIntensity = pulse * 0.3;
    });
    
    // Animate connections
    connections.forEach((connection, index) => {
        const opacity = Math.sin(time * 3 + index) * 0.1 + 0.2;
        connection.material.opacity = opacity;
    });
    
    // Rotate particles
    particles.forEach(particle => {
        particle.rotation.y = time * 0.1;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();