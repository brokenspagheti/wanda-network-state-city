# ⛏️ Wanda - Minecraft Network State City

A fully interactive **Minecraft-style** 3D visualization of Wanda, a network state city inspired by Barcelona's urban planning. Built with Three.js, featuring blocky voxel architecture, complete infrastructure systems, and integrated research paper display.

![Minecraft](https://img.shields.io/badge/Style-Minecraft-green)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Live Demo

**⛏️ Play Now:** https://brokenspagheti.github.io/wanda-network-state-city/

## 🧱 Minecraft Architecture

### Block-by-Block Construction
- **Stone Brick Buildings** - Authentic Minecraft block textures
- **Grass Block Roofs** - Green sustainable tops on every building
- **Glass Windows** - Transparent block windows
- **Oak Wood Details** - Plank textures for accents
- **Voxel-Perfect** - True blocky Minecraft aesthetic

### Procedural Textures
- **Stone Bricks** - Randomized gray patterns
- **Grass Blocks** - Green with dirt variations
- **Dirt Paths** - Brown street textures
- **Oak Planks** - Wood grain patterns
- **Glass** - Semi-transparent blocks

## 🏗️ City Layout

### Barcelona Grid System
- **9x9 Superblocks** - Eixample-inspired layout
- **Dirt Path Streets** - Minecraft path blocks
- **Grass Patches** - Parks in block centers
- **200+ Buildings** - Randomly generated heights
- **Blocky Clouds** - Floating white blocks in sky

## 🚇 Transportation (Minecart System)

### Underground Rails
- **4 Minecart Lines** - Red, Blue, Green, Yellow routes
- **Iron Rails** - Authentic rail block textures
- **Wooden Ties** - Oak plank rail supports
- **Underground Tunnels** - At Y=-4 level

### Surface Transport
- **Powered Rails** - Surface tram system
- **Dirt Paths** - Walkable streets
- **Rail Stations** - Access points throughout city

## 💧 Water System

### Water Blocks
- **Flowing Canals** - Minecraft water blocks
- **Horizontal Canal** - Main east-west waterway
- **Vertical Canal** - North-south water channel
- **Cauldrons** - Water collection points (10 locations)
- **Transparent Water** - Classic Minecraft blue

## 🔧 Underground Infrastructure

### Redstone Network
- **Redstone Circuits** - Glowing red power grid
- **Power Distribution** - 10-block spacing grid
- **Emissive Blocks** - Lit redstone texture

### Cave Systems
- **Stone Tunnels** - Utility corridors at Y=-8
- **Grid Layout** - 20-block spacing
- **Service Access** - Throughout underground

## 🌳 Nature & Environment

### Oak Trees (80+ Trees)
- **4-Block Trunks** - Oak log blocks
- **Leaf Canopy** - 5x5x3 leaf block clusters
- **Random Gaps** - Natural-looking foliage
- **Park Distribution** - Throughout city

### Sky & Atmosphere
- **Minecraft Sky Blue** (#87CEEB)
- **Blocky Clouds** - White wool-style blocks
- **Fog Effects** - Distance rendering
- **Day Lighting** - Bright ambient + sun

## 📄 Research Paper Integration

### Upload Your Paper
- **File Upload** - Support for PDF, TXT, MD formats
- **Live Preview** - First 500 characters displayed
- **Full View** - Opens in new window
- **Network State Focus** - Integrated with city concept

### How to Add Your Paper
1. Click **"📤 UPLOAD PAPER"** button
2. Select your research paper file
3. Paper preview appears in panel
4. Click **"Read Full Paper →"** to view complete document

## 🎮 Interactive Controls

### Layer Toggle System (FIXED!)
Click buttons to show/hide layers:
- **🏙️ Surface** - Buildings, trees, clouds, streets
- **🚇 Transport** - Minecart rails, powered rails
- **💧 Water** - Canals, water blocks, cauldrons
- **🔧 Underground** - Redstone, caves, tunnels

### Camera Controls
- **🖱️ Drag** - Rotate camera around city
- **🔍 Scroll** - Zoom in/out
- **Damping** - Smooth camera movement

## 🎨 Minecraft Aesthetic

### Visual Style
- **Pixelated Textures** - 16x16 block textures
- **No Anti-aliasing** - Sharp blocky edges
- **Nearest Filter** - Crisp pixel-perfect rendering
- **Voxel Grid** - Everything aligned to 1-unit blocks

### Color Palette
- **Stone Gray** - #7a7a7a (buildings)
- **Grass Green** - #5a8c3a (roofs, parks)
- **Dirt Brown** - #8b6914 (streets)
- **Water Blue** - #3F76E4 (canals)
- **Sky Blue** - #87CEEB (background)
- **Redstone Red** - #FF0000 (power grid)

### UI Design
- **Press Start 2P Font** - Retro pixel font
- **Wooden Panels** - Brown UI backgrounds
- **Pixel Borders** - Blocky button styles
- **Shadow Effects** - 8px offset shadows

## 🛠️ Technical Implementation

### Three.js Features
- **BoxGeometry** - All blocks are cubes
- **CanvasTexture** - Procedural texture generation
- **NearestFilter** - Pixelated texture rendering
- **Group Hierarchy** - Organized layer system
- **Shadow Mapping** - Soft shadows enabled

### Performance
- **Efficient Rendering** - Grouped objects
- **Layer Culling** - Toggle visibility
- **Fog Distance** - Render optimization
- **Shadow Maps** - 2048x2048 resolution

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/brokenspagheti/wanda-network-state-city.git
cd wanda-network-state-city

# Serve locally
python -m http.server 8000
# or
npx serve

# Open browser
open http://localhost:8000
```

## 🎯 Network State Concept

### Digital Governance
- **Decentralized Layout** - No single center
- **Connected Districts** - Rail network integration
- **Sustainable Design** - Green roofs, water management
- **Community Blocks** - Superblock organization

### Research Integration
- Upload your network state research
- Visual representation of concepts
- Interactive exploration
- Educational tool

## 🚀 Future Features

- [ ] Animated minecarts on rails
- [ ] Day/night cycle
- [ ] Villager NPCs
- [ ] Mob spawning
- [ ] Block breaking/placing
- [ ] Inventory system
- [ ] Multiplayer support
- [ ] VR mode

## 🤝 Contributing

Want to add features? Ideas:
1. **More block types** - Add new Minecraft blocks
2. **Biomes** - Different terrain types
3. **Structures** - Villages, temples, etc.
4. **Mobs** - Animated creatures
5. **Sounds** - Minecraft audio effects

```bash
git checkout -b feature/new-blocks
git commit -m 'Add new block types'
git push origin feature/new-blocks
```

## 📊 City Statistics

- **Blocks Placed:** 10,000+ individual blocks
- **Buildings:** 200+ stone brick structures
- **Trees:** 80 oak trees (320+ blocks each)
- **Rails:** 4 complete minecart lines
- **Water Blocks:** 500+ flowing water
- **Redstone:** 200+ powered blocks
- **Clouds:** 20 cloud formations
- **Total Area:** 200x200 blocks

## 🎮 Minecraft Features

### Authentic Elements
- ✅ Block-by-block construction
- ✅ Procedural textures
- ✅ Minecart rails
- ✅ Water physics (visual)
- ✅ Redstone circuits
- ✅ Oak trees
- ✅ Grass blocks
- ✅ Stone bricks
- ✅ Glass windows
- ✅ Cauldrons

## 📄 License

MIT License - Build, modify, share freely!

## 🙏 Credits

- **Minecraft** - Mojang Studios (inspiration)
- **Three.js** - 3D graphics library
- **Barcelona** - Urban planning model
- **Network State** - Governance concept
- **Press Start 2P** - Google Fonts

## 📧 Links

- **Live Demo:** https://brokenspagheti.github.io/wanda-network-state-city/
- **Repository:** https://github.com/brokenspagheti/wanda-network-state-city
- **Issues:** Report bugs or request features

---

**⛏️ Built block-by-block for the future of decentralized cities**

*Not affiliated with Mojang Studios or Minecraft*