import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let layers = {
    surface: new THREE.Group(),
    transport: new THREE.Group(),
    water: new THREE.Group(),
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

    // Build Minecraft city
    createGround();
    createMinecraftCity();
    createTransportation();
    createWaterSystem();
    createUnderground();
    createTrees();
    createClouds();

    // Setup layer toggles with proper event listeners
    setupLayerToggles();

    window.addEventListener('resize', onWindowResize, false);
    animate();
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

    // Oak Planks texture
    const plankCanvas = document.createElement('canvas');
    plankCanvas.width = 16;
    plankCanvas.height = 16;
    const pCtx = plankCanvas.getContext('2d');
    pCtx.fillStyle = '#9c7f4a';
    pCtx.fillRect(0, 0, 16, 16);
    for (let i = 0; i < 16; i += 4) {
        pCtx.fillStyle = '#8c6f3a';
        pCtx.fillRect(i, 0, 1, 16);
    }
    textures.planks = new THREE.CanvasTexture(plankCanvas);
    textures.planks.magFilter = THREE.NearestFilter;
    textures.planks.minFilter = THREE.NearestFilter;

    // Glass texture
    const glassCanvas = document.createElement('canvas');
    glassCanvas.width = 16;
    glassCanvas.height = 16;
    const glCtx = glassCanvas.getContext('2d');
    glCtx.fillStyle = 'rgba(200, 230, 255, 0.3)';
    glCtx.fillRect(0, 0, 16, 16);
    textures.glass = new THREE.CanvasTexture(glassCanvas);
    textures.glass.magFilter = THREE.NearestFilter;
    textures.glass.minFilter = THREE.NearestFilter;
}

function createGround() {
    // Grass ground
    const groundSize = 200;
    const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize);
    const groundMat = new THREE.MeshStandardMaterial({
        map: textures.grass,
        side: THREE.DoubleSide
    });
    textures.grass.wrapS = THREE.RepeatWrapping;
    textures.grass.wrapT = THREE.RepeatWrapping;
    textures.grass.repeat.set(groundSize / 4, groundSize / 4);
    
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    layers.surface.add(ground);

    // Bedrock layer (bottom)
    const bedrockGeo = new THREE.BoxGeometry(groundSize, 1, groundSize);
    const bedrockMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const bedrock = new THREE.Mesh(bedrockGeo, bedrockMat);
    bedrock.position.y = -15;
    layers.underground.add(bedrock);
}

function createMinecraftBlock(x, y, z, size, material) {
    const geo = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createMinecraftBuilding(x, z, width, height, depth) {
    const group = new THREE.Group();
    
    // Stone brick material
    const stoneMat = new THREE.MeshStandardMaterial({
        map: textures.stoneBrick
    });
    
    // Build block by block (Minecraft style)
    const blockSize = 1;
    
    // Walls
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
                
                createMinecraftBuilding(bx, bz, width, height, depth);
            }

            // Grass patches in block centers
            if (Math.random() > 0.5) {
                const grassMat = new THREE.MeshStandardMaterial({
                    map: textures.grass
                });
                const patch = createMinecraftBlock(x, 0.5, z, 4, grassMat);
                layers.surface.add(patch);
            }
        }
    }

    // Dirt path streets
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
    // Minecart rails (underground)
    const railMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
    
    // 4 rail lines
    const railRoutes = [
        [{x: -80, z: 0}, {x: 80, z: 0}],
        [{x: 0, z: -80}, {x: 0, z: 80}],
        [{x: -80, z: -80}, {x: 80, z: 80}],
        [{x: -80, z: 80}, {x: 80, z: -80}]
    ];

    railRoutes.forEach(route => {
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
    });

    // Powered rails on surface (tram)
    for (let i = -80; i <= 80; i += 2) {
        const rail1 = createMinecraftBlock(i, 0.2, 20, 0.5, ironMat);
        const rail2 = createMinecraftBlock(i, 0.2, -20, 0.5, ironMat);
        layers.transport.add(rail1);
        layers.transport.add(rail2);
    }
}

function createWaterSystem() {
    // Water blocks (Minecraft style)
    const waterMat = new THREE.MeshStandardMaterial({
        color: 0x3F76E4,
        transparent: true,
        opacity: 0.7
    });

    // Horizontal canal
    for (let x = -80; x <= 80; x += 2) {
        for (let z = 28; z <= 32; z += 2) {
            const water = createMinecraftBlock(x, -0.5, z, 2, waterMat);
            layers.water.add(water);
        }
    }

    // Vertical canal
    for (let z = -80; z <= 80; z += 2) {
        for (let x = -32; x <= -28; x += 2) {
            const water = createMinecraftBlock(x, -0.5, z, 2, waterMat);
            layers.water.add(water);
        }
    }

    // Cauldrons (water collection)
    const cauldronMat = new THREE.MeshStandardMaterial({ color: 0x4A4A4A });
    for (let i = 0; i < 10; i++) {
        const x = (Math.random() - 0.5) * 140;
        const z = (Math.random() - 0.5) * 140;
        const cauldron = createMinecraftBlock(x, 0.5, z, 1, cauldronMat);
        layers.water.add(cauldron);
    }
}

function createUnderground() {
    // Redstone circuits (power network)
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

    // Cave tunnels (stone)
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
}

function createTrees() {
    // Oak trees (Minecraft style)
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
        'btn-underground': 'underground'
    };

    Object.keys(buttons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const layerName = buttons[btnId];
        
        btn.addEventListener('click', function() {
            const layer = layers[layerName];
            if (layer) {
                layer.visible = !layer.visible;
                this.classList.toggle('active');
            }
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();