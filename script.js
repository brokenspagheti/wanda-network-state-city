import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let layers = {
    surface: new THREE.Group(),
    transport: new THREE.Group(),
    water: new THREE.Group(),
    underground: new THREE.Group()
};

// Animation arrays
let buildings = [];
let vehicles = [];
let waterFlow = [];

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e27, 0.008);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(80, 60, 80);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0e27);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 200;
    controls.minDistance = 20;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(100, 100, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Add all layers to scene
    Object.values(layers).forEach(layer => scene.add(layer));

    // Create city
    createGround();
    createBarcelonaGrid();
    createTransportation();
    createWaterSystem();
    createUnderground();
    createGreenSpaces();
    createLandmarks();

    // Make toggleLayer global
    window.toggleLayer = toggleLayer;

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function createGround() {
    // Base terrain
    const groundGeo = new THREE.PlaneGeometry(200, 200, 50, 50);
    const groundMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    
    // Add subtle terrain variation
    const vertices = groundGeo.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        vertices[i + 2] = Math.random() * 0.5;
    }
    groundGeo.attributes.position.needsUpdate = true;
    groundGeo.computeVertexNormals();
    
    layers.surface.add(ground);

    // Grid overlay
    const gridHelper = new THREE.GridHelper(200, 100, 0x00ffff, 0x003344);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    layers.surface.add(gridHelper);
}

function createBrutalistBuilding(x, z, width, height, depth, hasGreenRoof = true) {
    const group = new THREE.Group();
    
    // Main concrete structure
    const buildingGeo = new THREE.BoxGeometry(width, height, depth);
    const concreteMat = new THREE.MeshStandardMaterial({
        color: 0x8b8b8b,
        roughness: 0.9,
        metalness: 0.1
    });
    const building = new THREE.Mesh(buildingGeo, concreteMat);
    building.position.y = height / 2;
    building.castShadow = true;
    building.receiveShadow = true;
    group.add(building);

    // Concrete texture with panels
    const panelGeo = new THREE.BoxGeometry(width * 0.95, height * 0.15, depth * 0.95);
    for (let i = 1; i < 6; i++) {
        const panel = new THREE.Mesh(panelGeo, new THREE.MeshStandardMaterial({
            color: 0x7a7a7a,
            roughness: 0.95
        }));
        panel.position.y = (height / 6) * i;
        group.add(panel);
    }

    // Green roof
    if (hasGreenRoof) {
        const roofGeo = new THREE.BoxGeometry(width, 0.5, depth);
        const roofMat = new THREE.MeshStandardMaterial({
            color: 0x2d5016,
            roughness: 0.8
        });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = height + 0.25;
        group.add(roof);

        // Solar panels
        const solarGeo = new THREE.BoxGeometry(width * 0.4, 0.1, depth * 0.4);
        const solarMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a3e,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x0000ff,
            emissiveIntensity: 0.1
        });
        const solar = new THREE.Mesh(solarGeo, solarMat);
        solar.position.y = height + 0.6;
        group.add(solar);
    }

    // Windows (small brutalist style)
    const windowGeo = new THREE.BoxGeometry(width * 0.08, height * 0.05, 0.1);
    const windowMat = new THREE.MeshStandardMaterial({
        color: 0x87ceeb,
        emissive: 0x4a90a4,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7
    });

    for (let floor = 0; floor < 8; floor++) {
        for (let col = 0; col < 6; col++) {
            const window1 = new THREE.Mesh(windowGeo, windowMat);
            window1.position.set(
                -width * 0.4 + (width * 0.8 / 6) * col,
                height * 0.15 + (height * 0.7 / 8) * floor,
                depth / 2 + 0.05
            );
            group.add(window1);

            const window2 = window1.clone();
            window2.position.z = -depth / 2 - 0.05;
            group.add(window2);
        }
    }

    group.position.set(x, 0, z);
    layers.surface.add(group);
    buildings.push(group);
    return group;
}

function createBarcelonaGrid() {
    // Barcelona's Eixample-inspired superblock system
    const blockSize = 15;
    const streetWidth = 3;
    const gridSize = 9;

    for (let i = -gridSize / 2; i < gridSize / 2; i++) {
        for (let j = -gridSize / 2; j < gridSize / 2; j++) {
            const x = i * (blockSize + streetWidth);
            const z = j * (blockSize + streetWidth);

            // Create superblock with chamfered corners (Barcelona style)
            const numBuildings = 4 + Math.floor(Math.random() * 3);
            
            for (let b = 0; b < numBuildings; b++) {
                const bx = x + (Math.random() - 0.5) * blockSize * 0.6;
                const bz = z + (Math.random() - 0.5) * blockSize * 0.6;
                const width = 3 + Math.random() * 2;
                const height = 8 + Math.random() * 12;
                const depth = 3 + Math.random() * 2;
                
                createBrutalistBuilding(bx, bz, width, height, depth);
            }

            // Pocket park in center of superblock
            if (Math.random() > 0.6) {
                const parkGeo = new THREE.CircleGeometry(3, 16);
                const parkMat = new THREE.MeshStandardMaterial({
                    color: 0x228b22,
                    roughness: 0.9
                });
                const park = new THREE.Mesh(parkGeo, parkMat);
                park.rotation.x = -Math.PI / 2;
                park.position.set(x, 0.1, z);
                layers.surface.add(park);
            }
        }
    }

    // Streets
    createStreets(gridSize, blockSize, streetWidth);
}

function createStreets(gridSize, blockSize, streetWidth) {
    const streetMat = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.8
    });

    // Horizontal streets
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
        const streetGeo = new THREE.PlaneGeometry(gridSize * (blockSize + streetWidth), streetWidth);
        const street = new THREE.Mesh(streetGeo, streetMat);
        street.rotation.x = -Math.PI / 2;
        street.position.set(0, 0.05, i * (blockSize + streetWidth));
        layers.surface.add(street);

        // Street markings
        const markingGeo = new THREE.PlaneGeometry(gridSize * (blockSize + streetWidth), 0.2);
        const markingMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        const marking = new THREE.Mesh(markingGeo, markingMat);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(0, 0.06, i * (blockSize + streetWidth));
        layers.surface.add(marking);
    }

    // Vertical streets
    for (let j = -gridSize / 2; j <= gridSize / 2; j++) {
        const streetGeo = new THREE.PlaneGeometry(streetWidth, gridSize * (blockSize + streetWidth));
        const street = new THREE.Mesh(streetGeo, streetMat);
        street.rotation.x = -Math.PI / 2;
        street.position.set(j * (blockSize + streetWidth), 0.05, 0);
        layers.surface.add(street);
    }
}

function createTransportation() {
    // Metro lines (4 lines in different colors)
    const metroColors = [0xff0000, 0x0000ff, 0x00ff00, 0xffff00];
    const metroRoutes = [
        [{x: -80, z: 0}, {x: 80, z: 0}],
        [{x: 0, z: -80}, {x: 0, z: 80}],
        [{x: -80, z: -80}, {x: 80, z: 80}],
        [{x: -80, z: 80}, {x: 80, z: -80}]
    ];

    metroRoutes.forEach((route, idx) => {
        const points = route.map(p => new THREE.Vector3(p.x, -5, p.z));
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.8, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({
            color: metroColors[idx],
            emissive: metroColors[idx],
            emissiveIntensity: 0.4,
            metalness: 0.6
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        layers.transport.add(tube);

        // Metro stations
        for (let i = 0; i <= 4; i++) {
            const t = i / 4;
            const point = curve.getPoint(t);
            const stationGeo = new THREE.CylinderGeometry(2, 2, 8, 16);
            const stationMat = new THREE.MeshStandardMaterial({
                color: 0x666666,
                roughness: 0.7
            });
            const station = new THREE.Mesh(stationGeo, stationMat);
            station.position.set(point.x, -1, point.z);
            layers.transport.add(station);

            // Station entrance
            const entranceGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 16);
            const entranceMat = new THREE.MeshStandardMaterial({
                color: metroColors[idx],
                emissive: metroColors[idx],
                emissiveIntensity: 0.3
            });
            const entrance = new THREE.Mesh(entranceGeo, entranceMat);
            entrance.position.set(point.x, 0.25, point.z);
            layers.surface.add(entrance);
        }
    });

    // Tram lines on surface
    const tramGeo = new THREE.BoxGeometry(0.3, 0.1, 150);
    const tramMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.8
    });
    
    [-20, 20].forEach(offset => {
        const tram = new THREE.Mesh(tramGeo, tramMat);
        tram.position.set(offset, 0.1, 0);
        layers.transport.add(tram);
    });

    // Bike lanes (green)
    const bikeGeo = new THREE.PlaneGeometry(1, 150);
    const bikeMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.3
    });
    
    [-15, 15].forEach(offset => {
        const bikeLane = new THREE.Mesh(bikeGeo, bikeMat);
        bikeLane.rotation.x = -Math.PI / 2;
        bikeLane.position.set(offset, 0.11, 0);
        layers.transport.add(bikeLane);
    });
}

function createWaterSystem() {
    // Main canal network
    const canalWidth = 4;
    const canalDepth = 2;
    
    // Horizontal canal
    const canalGeo1 = new THREE.BoxGeometry(160, canalDepth, canalWidth);
    const waterMat = new THREE.MeshStandardMaterial({
        color: 0x1e90ff,
        transparent: true,
        opacity: 0.6,
        metalness: 0.3,
        roughness: 0.1
    });
    const canal1 = new THREE.Mesh(canalGeo1, waterMat);
    canal1.position.set(0, -canalDepth / 2, 30);
    layers.water.add(canal1);

    // Vertical canal
    const canalGeo2 = new THREE.BoxGeometry(canalWidth, canalDepth, 160);
    const canal2 = new THREE.Mesh(canalGeo2, waterMat);
    canal2.position.set(-30, -canalDepth / 2, 0);
    layers.water.add(canal2);

    // Water treatment plants
    const plantPositions = [
        {x: -70, z: -70},
        {x: 70, z: 70}
    ];

    plantPositions.forEach(pos => {
        const plantGeo = new THREE.CylinderGeometry(5, 6, 8, 8);
        const plantMat = new THREE.MeshStandardMaterial({
            color: 0x4169e1,
            roughness: 0.6
        });
        const plant = new THREE.Mesh(plantGeo, plantMat);
        plant.position.set(pos.x, 4, pos.z);
        layers.water.add(plant);

        // Pipes
        for (let i = 0; i < 4; i++) {
            const pipeGeo = new THREE.CylinderGeometry(0.3, 0.3, 15, 8);
            const pipeMat = new THREE.MeshStandardMaterial({ color: 0x708090 });
            const pipe = new THREE.Mesh(pipeGeo, pipeMat);
            pipe.rotation.z = Math.PI / 2;
            pipe.position.set(pos.x + (i - 1.5) * 2, 2, pos.z);
            layers.water.add(pipe);
        }
    });

    // Fountains in parks
    for (let i = 0; i < 8; i++) {
        const fx = (Math.random() - 0.5) * 120;
        const fz = (Math.random() - 0.5) * 120;
        const fountainGeo = new THREE.CylinderGeometry(1.5, 2, 1, 16);
        const fountainMat = new THREE.MeshStandardMaterial({
            color: 0x87ceeb,
            emissive: 0x1e90ff,
            emissiveIntensity: 0.2
        });
        const fountain = new THREE.Mesh(fountainGeo, fountainMat);
        fountain.position.set(fx, 0.5, fz);
        layers.water.add(fountain);
        waterFlow.push(fountain);
    }
}

function createUnderground() {
    // Utility tunnel network
    const tunnelMat = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.8,
        transparent: true,
        opacity: 0.7
    });

    // Main utility corridors
    for (let i = -4; i <= 4; i++) {
        const tunnelGeo = new THREE.BoxGeometry(2, 2.5, 160);
        const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
        tunnel.position.set(i * 20, -8, 0);
        layers.underground.add(tunnel);

        const tunnel2 = new THREE.Mesh(new THREE.BoxGeometry(160, 2.5, 2), tunnelMat);
        tunnel2.position.set(0, -8, i * 20);
        layers.underground.add(tunnel2);
    }

    // Underground parking levels
    const parkingGeo = new THREE.BoxGeometry(30, 1, 30);
    const parkingMat = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        transparent: true,
        opacity: 0.5
    });

    for (let level = 1; level <= 3; level++) {
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                const parking = new THREE.Mesh(parkingGeo, parkingMat);
                parking.position.set(i * 40, -level * 4, j * 40);
                layers.underground.add(parking);
            }
        }
    }

    // Service access points
    for (let i = -3; i <= 3; i++) {
        for (let j = -3; j <= 3; j++) {
            const accessGeo = new THREE.CylinderGeometry(0.8, 0.8, 10, 8);
            const accessMat = new THREE.MeshStandardMaterial({
                color: 0x666666,
                transparent: true,
                opacity: 0.6
            });
            const access = new THREE.Mesh(accessGeo, accessMat);
            access.position.set(i * 25, -5, j * 25);
            layers.underground.add(access);
        }
    }
}

function createGreenSpaces() {
    // Central park (large)
    const parkGeo = new THREE.CircleGeometry(20, 32);
    const parkMat = new THREE.MeshStandardMaterial({
        color: 0x228b22,
        roughness: 0.9
    });
    const centralPark = new THREE.Mesh(parkGeo, parkMat);
    centralPark.rotation.x = -Math.PI / 2;
    centralPark.position.set(0, 0.1, 0);
    layers.surface.add(centralPark);

    // Trees in central park
    for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 5 + Math.random() * 12;
        const tx = Math.cos(angle) * radius;
        const tz = Math.sin(angle) * radius;
        createTree(tx, tz);
    }

    // Street trees
    for (let i = -80; i <= 80; i += 8) {
        createTree(i, 35);
        createTree(i, -35);
        createTree(35, i);
        createTree(-35, i);
    }
}

function createTree(x, z) {
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(x, 1.5, z);
    layers.surface.add(trunk);

    const foliageGeo = new THREE.SphereGeometry(2, 8, 8);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.set(x, 4, z);
    layers.surface.add(foliage);
}

function createLandmarks() {
    // Governance tower (central)
    const towerGeo = new THREE.CylinderGeometry(4, 5, 40, 8);
    const towerMat = new THREE.MeshStandardMaterial({
        color: 0x696969,
        roughness: 0.8
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(0, 20, 0);
    tower.castShadow = true;
    layers.surface.add(tower);

    // Antenna
    const antennaGeo = new THREE.CylinderGeometry(0.2, 0.3, 15, 8);
    const antennaMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5
    });
    const antenna = new THREE.Mesh(antennaGeo, antennaMat);
    antenna.position.set(0, 47.5, 0);
    layers.surface.add(antenna);

    buildings.push(tower);
}

function toggleLayer(layerName) {
    const layer = layers[layerName];
    if (layer) {
        layer.visible = !layer.visible;
        const btn = event.target;
        btn.classList.toggle('active');
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0005;
    
    // Animate water fountains
    waterFlow.forEach((fountain, i) => {
        fountain.material.emissiveIntensity = 0.2 + Math.sin(time * 2 + i) * 0.1;
    });

    // Pulse buildings slightly
    buildings.forEach((building, i) => {
        building.position.y = Math.sin(time + i * 0.1) * 0.05;
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