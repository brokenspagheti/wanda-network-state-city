import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

let scene, camera, renderer, labelRenderer, controls;
let layers = {
    surface: new THREE.Group(),
    transport: new THREE.Group(),
    water: new THREE.Group(),
    utilities: new THREE.Group(),
    social: new THREE.Group(),
    underground: new THREE.Group()
};

// Minecraft textures (procedural)
const textures = {};

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Minecraft sky blue
    scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(80, 60, 80);

    renderer = new THREE.WebGLRenderer({ antialias: false }); // Pixelated look
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // CSS2D Label Renderer
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('canvas-container').appendChild(labelRenderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 200;
    controls.minDistance = 20;

    // Minecraft-style lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(100, 100, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    scene.add(sunLight);

    // Create textures
    createMinecraftTextures();

    // Add all layers to scene
    Object.values(layers).forEach(layer => scene.add(layer));

    // Build Minecraft city with comprehensive infrastructure
    createGround();
    createMinecraftCity();
    createTransportation();
    createWaterSystem();
    createUtilities();
    createSocialInfrastructure();
    createUnderground();
    createTrees();
    createClouds();

    // Setup layer toggles with proper event listeners
    setupLayerToggles();

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function createLabel(text, color = '#FFD700') {
    const div = document.createElement('div');
    div.className = 'label';
    div.textContent = text;
    div.style.color = color;
    div.style.fontFamily = "'Press Start 2P', cursive";
    div.style.fontSize = '10px';
    div.style.padding = '4px 8px';
    div.style.background = 'rgba(0, 0, 0, 0.8)';
    div.style.border = '2px solid ' + color;
    div.style.borderRadius = '4px';
    div.style.textShadow = '1px 1px 2px black';
    div.style.whiteSpace = 'nowrap';
    div.style.pointerEvents = 'auto';
    div.style.cursor = 'pointer';
    
    const label = new CSS2DObject(div);
    return label;
}

function createMinecraftTextures() {
    // Stone Brick texture
    const stoneBrickCanvas = document.createElement('canvas');
    stoneBrickCanvas.width = 16;
    stoneBrickCanvas.height = 16;
    const sbCtx = stoneBrickCanvas.getContext('2d');
    const stoneColors = ['#7a7a7a', '#6a6a6a', '#8a8a8a', '#757575'];
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            sbCtx.fillStyle = stoneColors[Math.floor(Math.random() * stoneColors.length)];
            sbCtx.fillRect(i, j, 1, 1);
        }
    }
    textures.stoneBrick = new THREE.CanvasTexture(stoneBrickCanvas);
    textures.stoneBrick.magFilter = THREE.NearestFilter;
    textures.stoneBrick.minFilter = THREE.NearestFilter;

    // Grass Block texture
    const grassCanvas = document.createElement('canvas');
    grassCanvas.width = 16;
    grassCanvas.height = 16;
    const gCtx = grassCanvas.getContext('2d');
    gCtx.fillStyle = '#5a8c3a';
    gCtx.fillRect(0, 0, 16, 16);
    for (let i = 0; i < 30; i++) {
        gCtx.fillStyle = Math.random() > 0.5 ? '#4a7c2a' : '#6a9c4a';
        gCtx.fillRect(Math.random() * 16, Math.random() * 16, 1, 1);
    }
    textures.grass = new THREE.CanvasTexture(grassCanvas);
    textures.grass.magFilter = THREE.NearestFilter;
    textures.grass.minFilter = THREE.NearestFilter;

    // Dirt texture
    const dirtCanvas = document.createElement('canvas');
    dirtCanvas.width = 16;
    dirtCanvas.height = 16;
    const dCtx = dirtCanvas.getContext('2d');
    const dirtColors = ['#8b6914', '#7b5914', '#9b7914'];
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            dCtx.fillStyle = dirtColors[Math.floor(Math.random() * dirtColors.length)];
            dCtx.fillRect(i, j, 1, 1);
        }
    }
    textures.dirt = new THREE.CanvasTexture(dirtCanvas);
    textures.dirt.magFilter = THREE.NearestFilter;
    textures.dirt.minFilter = THREE.NearestFilter;

    // Glass texture
    const glassCanvas = document.createElement('canvas');
    glassCanvas.width = 16;
    glassCanvas.height = 16;
    const glCtx = glassCanvas.getContext('2d');
    glCtx.fillStyle = '#E0F0FF';
    glCtx.fillRect(0, 0, 16, 16);
    for (let i = 0; i < 10; i++) {
        glCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        glCtx.fillRect(Math.random() * 16, Math.random() * 16, 2, 2);
    }
    textures.glass = new THREE.CanvasTexture(glassCanvas);
    textures.glass.magFilter = THREE.NearestFilter;
    textures.glass.minFilter = THREE.NearestFilter;

    // Oak Plank texture
    const plankCanvas = document.createElement('canvas');
    plankCanvas.width = 16;
    plankCanvas.height = 16;
    const pCtx = plankCanvas.getContext('2d');
    pCtx.fillStyle = '#9C7A3C';
    pCtx.fillRect(0, 0, 16, 16);
    for (let i = 0; i < 16; i++) {
        pCtx.fillStyle = '#8C6A2C';
        pCtx.fillRect(0, i, 16, 1);
    }
    textures.oakPlank = new THREE.CanvasTexture(plankCanvas);
    textures.oakPlank.magFilter = THREE.NearestFilter;
    textures.oakPlank.minFilter = THREE.NearestFilter;
}

function createGround() {
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    const groundMat = new THREE.MeshStandardMaterial({
        map: textures.grass
    });
    textures.grass.wrapS = THREE.RepeatWrapping;
    textures.grass.wrapT = THREE.RepeatWrapping;
    textures.grass.repeat.set(50, 50);

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    layers.surface.add(ground);

    // Bedrock layer (bottom)
    const bedrockMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const bedrock = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300),
        bedrockMat
    );
    bedrock.rotation.x = -Math.PI / 2;
    bedrock.position.y = -15;
    layers.underground.add(bedrock);
}

function createMinecraftBlock(x, y, z, size, material) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createMinecraftBuilding(x, z, width, height, depth) {
    const blockSize = 1;
    const group = new THREE.Group();
    
    const stoneMat = new THREE.MeshStandardMaterial({
        map: textures.stoneBrick
    });
    
    // Build walls block by block
    for (let h = 0; h < height; h++) {
        // Front and back walls
        for (let w = 0; w < width; w++) {
            const frontBlock = createMinecraftBlock(
                x + w * blockSize - (width * blockSize) / 2,
                h * blockSize + blockSize / 2,
                z + (depth * blockSize) / 2,
                blockSize,
                stoneMat
            );
            group.add(frontBlock);
            
            const backBlock = createMinecraftBlock(
                x + w * blockSize - (width * blockSize) / 2,
                h * blockSize + blockSize / 2,
                z - (depth * blockSize) / 2,
                blockSize,
                stoneMat
            );
            group.add(backBlock);
        }
        
        // Side walls
        for (let d = 1; d < depth - 1; d++) {
            const leftBlock = createMinecraftBlock(
                x - (width * blockSize) / 2,
                h * blockSize + blockSize / 2,
                z + d * blockSize - (depth * blockSize) / 2,
                blockSize,
                stoneMat
            );
            group.add(leftBlock);
            
            const rightBlock = createMinecraftBlock(
                x + (width * blockSize) / 2,
                h * blockSize + blockSize / 2,
                z + d * blockSize - (depth * blockSize) / 2,
                blockSize,
                stoneMat
            );
            group.add(rightBlock);
        }
    }
    
    // Grass roof
    const grassMat = new THREE.MeshStandardMaterial({
        map: textures.grass
    });
    
    for (let w = 0; w < width; w++) {
        for (let d = 0; d < depth; d++) {
            const roofBlock = createMinecraftBlock(
                x + w * blockSize - (width * blockSize) / 2,
                height * blockSize + blockSize / 2,
                z + d * blockSize - (depth * blockSize) / 2,
                blockSize,
                grassMat
            );
            group.add(roofBlock);
        }
    }
    
    // Windows (glass blocks)
    const glassMat = new THREE.MeshStandardMaterial({
        map: textures.glass,
        transparent: true,
        opacity: 0.5
    });
    
    const windowPositions = [
        Math.floor(height * 0.3),
        Math.floor(height * 0.5),
        Math.floor(height * 0.7)
    ];
    
    windowPositions.forEach(h => {
        if (h < height) {
            // Front windows
            for (let w = 1; w < width - 1; w += 2) {
                const window = createMinecraftBlock(
                    x + w * blockSize - (width * blockSize) / 2,
                    h * blockSize + blockSize / 2,
                    z + (depth * blockSize) / 2 + 0.1,
                    blockSize * 0.9,
                    glassMat
                );
                group.add(window);
            }
        }
    });
    
    layers.surface.add(group);
    return group;
}

function createMinecraftCity() {
    const blockSize = 15;
    const streetWidth = 3;
    const gridSize = 9;

    let housingCount = 0;

    for (let i = -gridSize / 2; i < gridSize / 2; i++) {
        for (let j = -gridSize / 2; j < gridSize / 2; j++) {
            const x = i * (blockSize + streetWidth);
            const z = j * (blockSize + streetWidth);

            // Random buildings in each block
            const numBuildings = 2 + Math.floor(Math.random() * 3);
            
            for (let b = 0; b < numBuildings; b++) {
                const bx = x + (Math.random() - 0.5) * blockSize * 0.6;
                const bz = z + (Math.random() - 0.5) * blockSize * 0.6;
                const width = 3 + Math.floor(Math.random() * 3);
                const height = 5 + Math.floor(Math.random() * 8);
                const depth = 3 + Math.floor(Math.random() * 3);
                
                const building = createMinecraftBuilding(bx, bz, width, height, depth);
                
                // Add housing label to some buildings
                if (housingCount < 12 && Math.random() > 0.7) {
                    const label = createLabel('🏠 Housing', '#90EE90');
                    label.position.set(0, height + 2, 0);
                    building.add(label);
                    housingCount++;
                }
            }

            // Grass patches in block centers (green spaces)
            if (Math.random() > 0.5) {
                const grassMat = new THREE.MeshStandardMaterial({
                    map: textures.grass
                });
                const patch = createMinecraftBlock(x, 0.5, z, 4, grassMat);
                
                // Add green space label
                if (Math.random() > 0.8) {
                    const label = createLabel('🌳 Park', '#228B22');
                    label.position.set(0, 2, 0);
                    patch.add(label);
                }
                
                layers.surface.add(patch);
            }
        }
    }

    // Dirt path streets (roads)
    createStreets(gridSize, blockSize, streetWidth);
}

function createStreets(gridSize, blockSize, streetWidth) {
    const dirtMat = new THREE.MeshStandardMaterial({
        map: textures.dirt
    });
    
    textures.dirt.wrapS = THREE.RepeatWrapping;
    textures.dirt.wrapT = THREE.RepeatWrapping;

    // Horizontal streets
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
        const streetGeo = new THREE.PlaneGeometry(
            gridSize * (blockSize + streetWidth),
            streetWidth
        );
        textures.dirt.repeat.set(gridSize * 5, streetWidth);
        const street = new THREE.Mesh(streetGeo, dirtMat);
        street.rotation.x = -Math.PI / 2;
        street.position.set(0, 0.05, i * (blockSize + streetWidth));
        layers.surface.add(street);
    }

    // Vertical streets
    for (let j = -gridSize / 2; j <= gridSize / 2; j++) {
        const streetGeo = new THREE.PlaneGeometry(
            streetWidth,
            gridSize * (blockSize + streetWidth)
        );
        textures.dirt.repeat.set(streetWidth, gridSize * 5);
        const street = new THREE.Mesh(streetGeo, dirtMat);
        street.rotation.x = -Math.PI / 2;
        street.position.set(j * (blockSize + streetWidth), 0.05, 0);
        layers.surface.add(street);
    }
}

function createTransportation() {
    // METRO: Minecart rails (underground)
    const railMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
    
    // 4 metro rail lines
    const railRoutes = [
        [{x: -80, z: 0}, {x: 80, z: 0}],
        [{x: 0, z: -80}, {x: 0, z: 80}],
        [{x: -80, z: -80}, {x: 80, z: 80}],
        [{x: -80, z: 80}, {x: 80, z: -80}]
    ];

    railRoutes.forEach((route, idx) => {
        const start = route[0];
        const end = route[1];
        const distance = Math.sqrt(
            Math.pow(end.x - start.x, 2) + Math.pow(end.z - start.z, 2)
        );
        
        // Rails
        for (let i = 0; i < distance; i += 2) {
            const t = i / distance;
            const x = start.x + (end.x - start.x) * t;
            const z = start.z + (end.z - start.z) * t;
            
            const rail = createMinecraftBlock(x, -4, z, 0.5, ironMat);
            layers.transport.add(rail);
            
            // Rail ties
            const tie = createMinecraftBlock(x, -4.3, z, 1, railMat);
            layers.transport.add(tie);
        }
        
        // Add metro line label at midpoint
        if (idx === 0) {
            const label = createLabel('🚇 Metro Line', '#C0C0C0');
            label.position.set(0, -2, 0);
            const labelAnchor = new THREE.Object3D();
            labelAnchor.position.set(0, -4, 0);
            labelAnchor.add(label);
            layers.transport.add(labelAnchor);
        }
    });

    // RAILWAYS: Powered rails on surface (tram/train)
    for (let i = -80; i <= 80; i += 2) {
        const rail1 = createMinecraftBlock(i, 0.2, 20, 0.5, ironMat);
        const rail2 = createMinecraftBlock(i, 0.2, -20, 0.5, ironMat);
        layers.transport.add(rail1);
        layers.transport.add(rail2);
    }
    
    // Railway label
    const railLabel = createLabel('🚊 Tram Line', '#FFD700');
    railLabel.position.set(0, 2, 0);
    const railAnchor = new THREE.Object3D();
    railAnchor.position.set(0, 0.2, 20);
    railAnchor.add(railLabel);
    layers.transport.add(railAnchor);

    // TERMINALS: Transit stations
    const stationMat = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
    const terminalLocations = [
        {x: -60, z: 0, name: 'North Terminal'},
        {x: 60, z: 0, name: 'South Terminal'},
        {x: 0, z: -60, name: 'West Terminal'},
        {x: 0, z: 60, name: 'East Terminal'}
    ];
    
    terminalLocations.forEach(loc => {
        const group = new THREE.Group();
        
        // Station building
        for (let h = 0; h < 3; h++) {
            const station = createMinecraftBlock(0, h + 0.5, 0, 4, stationMat);
            group.add(station);
        }
        
        // Add terminal label
        const label = createLabel('🚉 ' + loc.name, '#FFD700');
        label.position.set(0, 5, 0);
        group.add(label);
        
        group.position.set(loc.x, 0, loc.z);
        layers.transport.add(group);
    });
}

function createWaterSystem() {
    // WATER SUPPLY: Water blocks (Minecraft style)
    const waterMat = new THREE.MeshStandardMaterial({
        color: 0x3F76E4,
        transparent: true,
        opacity: 0.7
    });

    // WATERWAYS: Horizontal canal
    for (let x = -80; x <= 80; x += 2) {
        for (let z = 28; z <= 32; z += 2) {
            const water = createMinecraftBlock(x, -0.5, z, 2, waterMat);
            layers.water.add(water);
        }
    }
    
    // Canal label
    const canalLabel = createLabel('💧 Water Canal', '#3F76E4');
    canalLabel.position.set(0, 2, 0);
    const canalAnchor = new THREE.Object3D();
    canalAnchor.position.set(0, -0.5, 30);
    canalAnchor.add(canalLabel);
    layers.water.add(canalAnchor);

    // WATERWAYS: Vertical canal
    for (let z = -80; z <= 80; z += 2) {
        for (let x = -32; x <= -28; x += 2) {
            const water = createMinecraftBlock(x, -0.5, z, 2, waterMat);
            layers.water.add(water);
        }
    }

    // HARVESTING: Cauldrons (rainwater collection)
    const cauldronMat = new THREE.MeshStandardMaterial({ color: 0x4A4A4A });
    for (let i = 0; i < 15; i++) {
        const x = (Math.random() - 0.5) * 140;
        const z = (Math.random() - 0.5) * 140;
        const cauldron = createMinecraftBlock(x, 0.5, z, 1, cauldronMat);
        
        if (i < 3) {
            const label = createLabel('💦 Rainwater', '#87CEEB');
            label.position.set(0, 2, 0);
            cauldron.add(label);
        }
        
        layers.water.add(cauldron);
    }

    // TREATMENT: Water treatment plants
    const treatmentMat = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
    const treatmentLocations = [
        {x: -70, z: 30, name: 'Treatment Plant A'},
        {x: 70, z: -30, name: 'Treatment Plant B'}
    ];
    
    treatmentLocations.forEach(loc => {
        const group = new THREE.Group();
        
        for (let w = 0; w < 5; w++) {
            for (let d = 0; d < 5; d++) {
                for (let h = 0; h < 4; h++) {
                    const block = createMinecraftBlock(
                        w - 2,
                        h + 0.5,
                        d - 2,
                        1,
                        treatmentMat
                    );
                    group.add(block);
                }
            }
        }
        
        // Add treatment plant label
        const label = createLabel('🏭 ' + loc.name, '#4169E1');
        label.position.set(0, 6, 0);
        group.add(label);
        
        group.position.set(loc.x, 0, loc.z);
        layers.water.add(group);
    });

    // DRAINAGE: Underground drainage pipes
    const drainMat = new THREE.MeshStandardMaterial({ color: 0x696969 });
    for (let x = -80; x <= 80; x += 15) {
        for (let z = -80; z <= 80; z += 15) {
            const drain = createMinecraftBlock(x, -2, z, 0.5, drainMat);
            layers.water.add(drain);
        }
    }
    
    // Drainage label
    const drainLabel = createLabel('🚰 Drainage Network', '#696969');
    drainLabel.position.set(0, 2, 0);
    const drainAnchor = new THREE.Object3D();
    drainAnchor.position.set(0, -2, 0);
    drainAnchor.add(drainLabel);
    layers.water.add(drainAnchor);
}

function createUtilities() {
    // ELECTRICITY: Power grid (glowing yellow lines)
    const electricMat = new THREE.MeshStandardMaterial({
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 0.5
    });

    // Power lines grid
    for (let x = -80; x <= 80; x += 20) {
        for (let z = -80; z <= 80; z += 20) {
            const powerNode = createMinecraftBlock(x, 15, z, 0.3, electricMat);
            layers.utilities.add(powerNode);
        }
    }

    // Power poles
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    for (let i = -80; i <= 80; i += 25) {
        for (let j = -80; j <= 80; j += 25) {
            for (let h = 0; h < 15; h++) {
                const pole = createMinecraftBlock(i, h + 0.5, j, 0.4, poleMat);
                layers.utilities.add(pole);
            }
        }
    }
    
    // Power grid label
    const powerLabel = createLabel('⚡ Power Grid', '#FFFF00');
    powerLabel.position.set(0, 18, 0);
    const powerAnchor = new THREE.Object3D();
    powerAnchor.position.set(0, 15, 0);
    powerAnchor.add(powerLabel);
    layers.utilities.add(powerAnchor);

    // TELECOM: Communication towers
    const telecomMat = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    const towerLocations = [
        {x: -50, z: -50, name: 'Tower NW'},
        {x: 50, z: 50, name: 'Tower SE'},
        {x: -50, z: 50, name: 'Tower NE'},
        {x: 50, z: -50, name: 'Tower SW'}
    ];
    
    towerLocations.forEach(loc => {
        const group = new THREE.Group();
        
        // Tall tower
        for (let h = 0; h < 25; h++) {
            const tower = createMinecraftBlock(0, h + 0.5, 0, 0.8, telecomMat);
            group.add(tower);
        }
        // Antenna top
        const antenna = createMinecraftBlock(0, 26, 0, 1.5, telecomMat);
        group.add(antenna);
        
        // Add telecom label
        const label = createLabel('📡 ' + loc.name, '#FF6347');
        label.position.set(0, 28, 0);
        group.add(label);
        
        group.position.set(loc.x, 0, loc.z);
        layers.utilities.add(group);
    });

    // GAS PIPELINES: Underground gas network
    const gasMat = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
    
    // Gas pipeline grid
    for (let x = -80; x <= 80; x += 12) {
        for (let z = -80; z <= 80; z += 12) {
            const pipe = createMinecraftBlock(x, -5, z, 0.4, gasMat);
            layers.utilities.add(pipe);
        }
    }
    
    // Gas pipeline label
    const gasLabel = createLabel('🔥 Gas Pipeline', '#FFA500');
    gasLabel.position.set(0, 2, 0);
    const gasAnchor = new THREE.Object3D();
    gasAnchor.position.set(0, -5, 0);
    gasAnchor.add(gasLabel);
    layers.utilities.add(gasAnchor);
}

function createSocialInfrastructure() {
    // HEALTH: Hospitals (red cross buildings)
    const hospitalMat = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    const hospitalLocations = [
        {x: -40, z: -40, name: 'General Hospital'},
        {x: 40, z: 40, name: 'City Hospital'}
    ];
    
    hospitalLocations.forEach(loc => {
        const group = new THREE.Group();
        
        // Hospital building
        for (let w = 0; w < 8; w++) {
            for (let d = 0; d < 8; d++) {
                for (let h = 0; h < 10; h++) {
                    if (w === 0 || w === 7 || d === 0 || d === 7 || h === 9) {
                        const block = createMinecraftBlock(
                            w - 4,
                            h + 0.5,
                            d - 4,
                            1,
                            hospitalMat
                        );
                        group.add(block);
                    }
                }
            }
        }
        // Red cross on top
        const cross = createMinecraftBlock(0, 11, 0, 3, hospitalMat);
        group.add(cross);
        
        // Add hospital label
        const label = createLabel('🏥 ' + loc.name, '#FF0000');
        label.position.set(0, 13, 0);
        group.add(label);
        
        group.position.set(loc.x, 0, loc.z);
        layers.social.add(group);
    });

    // EDUCATION: Schools (blue buildings)
    const schoolMat = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
    const schoolLocations = [
        {x: -50, z: 0, name: 'West School'},
        {x: 50, z: 0, name: 'East School'},
        {x: 0, z: -50, name: 'North School'},
        {x: 0, z: 50, name: 'South School'}
    ];
    
    schoolLocations.forEach(loc => {
        const group = new THREE.Group();
        
        for (let w = 0; w < 6; w++) {
            for (let d = 0; d < 6; d++) {
                for (let h = 0; h < 6; h++) {
                    if (w === 0 || w === 5 || d === 0 || d === 5 || h === 5) {
                        const block = createMinecraftBlock(
                            w - 3,
                            h + 0.5,
                            d - 3,
                            1,
                            schoolMat
                        );
                        group.add(block);
                    }
                }
            }
        }
        
        // Add school label
        const label = createLabel('🎓 ' + loc.name, '#4169E1');
        label.position.set(0, 8, 0);
        group.add(label);
        
        group.position.set(loc.x, 0, loc.z);
        layers.social.add(group);
    });

    // SECURITY: Police/Fire stations (dark blue)
    const securityMat = new THREE.MeshStandardMaterial({ color: 0x000080 });
    const securityLocations = [
        {x: -30, z: 30, name: 'Police Station'},
        {x: 30, z: -30, name: 'Fire Station'}
    ];
    
    securityLocations.forEach(loc => {
        const group = new THREE.Group();
        
        for (let w = 0; w < 5; w++) {
            for (let d = 0; d < 5; d++) {
                for (let h = 0; h < 5; h++) {
                    if (w === 0 || w === 4 || d === 0 || d === 4 || h === 4) {
                        const block = createMinecraftBlock(
                            w - 2,
                            h + 0.5,
                            d - 2,
                            1,
                            securityMat
                        );
                        group.add(block);
                    }
                }
            }
        }
        
        // Add security label
        const label = createLabel('🚓 ' + loc.name, '#000080');
        label.position.set(0, 7, 0);
        group.add(label);
        
        group.position.set(loc.x, 0, loc.z);
        layers.social.add(group);
    });
}

function createUnderground() {
    // REDSTONE CIRCUITS: Power network (electricity distribution)
    const redstoneMat = new THREE.MeshStandardMaterial({
        color: 0xFF0000,
        emissive: 0xFF0000,
        emissiveIntensity: 0.3
    });

    // Redstone grid
    for (let x = -80; x <= 80; x += 10) {
        for (let z = -80; z <= 80; z += 10) {
            const redstone = createMinecraftBlock(x, -6, z, 0.3, redstoneMat);
            layers.underground.add(redstone);
        }
    }
    
    // Redstone label
    const redstoneLabel = createLabel('⚡ Redstone Grid', '#FF0000');
    redstoneLabel.position.set(0, 2, 0);
    const redstoneAnchor = new THREE.Object3D();
    redstoneAnchor.position.set(0, -6, 0);
    redstoneAnchor.add(redstoneLabel);
    layers.underground.add(redstoneAnchor);

    // CAVE TUNNELS: Utility corridors (sanitation, cables)
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
    
    for (let i = -4; i <= 4; i++) {
        for (let j = -4; j <= 4; j++) {
            // Tunnel floor
            const tunnel = createMinecraftBlock(
                i * 20,
                -8,
                j * 20,
                3,
                stoneMat
            );
            layers.underground.add(tunnel);
        }
    }
    
    // Tunnel label
    const tunnelLabel = createLabel('🔧 Utility Tunnels', '#808080');
    tunnelLabel.position.set(0, 2, 0);
    const tunnelAnchor = new THREE.Object3D();
    tunnelAnchor.position.set(0, -8, 0);
    tunnelAnchor.add(tunnelLabel);
    layers.underground.add(tunnelAnchor);
}

function createTrees() {
    // Oak trees (Minecraft style) - GREEN SPACES
    const logMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });

    for (let i = 0; i < 80; i++) {
        const x = (Math.random() - 0.5) * 160;
        const z = (Math.random() - 0.5) * 160;
        
        // Trunk (4 blocks high)
        for (let h = 0; h < 4; h++) {
            const log = createMinecraftBlock(x, h + 0.5, z, 1, logMat);
            layers.surface.add(log);
        }
        
        // Leaves (5x5x3 cube on top)
        for (let lx = -2; lx <= 2; lx++) {
            for (let lz = -2; lz <= 2; lz++) {
                for (let ly = 0; ly < 3; ly++) {
                    if (Math.random() > 0.2) { // Some gaps for realism
                        const leaves = createMinecraftBlock(
                            x + lx,
                            4 + ly + 0.5,
                            z + lz,
                            1,
                            leavesMat
                        );
                        layers.surface.add(leaves);
                    }
                }
            }
        }
    }
}

function createClouds() {
    // Minecraft-style blocky clouds
    const cloudMat = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < 20; i++) {
        const x = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        const y = 40 + Math.random() * 20;
        
        // Cloud cluster
        for (let cx = 0; cx < 3 + Math.random() * 3; cx++) {
            for (let cz = 0; cz < 3 + Math.random() * 3; cz++) {
                if (Math.random() > 0.3) {
                    const cloud = createMinecraftBlock(
                        x + cx * 2,
                        y,
                        z + cz * 2,
                        2,
                        cloudMat
                    );
                    layers.surface.add(cloud);
                }
            }
        }
    }
}

function setupLayerToggles() {
    const buttons = {
        'btn-surface': 'surface',
        'btn-transport': 'transport',
        'btn-water': 'water',
        'btn-utilities': 'utilities',
        'btn-social': 'social',
        'btn-underground': 'underground'
    };

    Object.keys(buttons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const layerName = buttons[btnId];
        
        if (btn) {
            btn.addEventListener('click', function() {
                const layer = layers[layerName];
                if (layer) {
                    layer.visible = !layer.visible;
                    this.classList.toggle('active');
                }
            });
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

init();