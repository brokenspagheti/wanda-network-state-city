# ⛏️ Wanda - Minecraft Network State City

A fully interactive **Minecraft-style** 3D visualization of Wanda, a network state city inspired by Barcelona's urban planning. Built with Three.js, featuring blocky voxel architecture, complete infrastructure systems, and **integrated academic research paper** on Network State governance.

![Minecraft](https://img.shields.io/badge/Style-Minecraft-green)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-blue)
![Research](https://img.shields.io/badge/Research-Integrated-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Live Demo

**🌐 Visit the Live 3D City:**  
### **https://brokenspagheti.github.io/wanda-network-state-city/**

> **Note:** If you see this README instead of the 3D city, wait 1-2 minutes for GitHub Pages to rebuild, then refresh your browser (Ctrl+Shift+R or Cmd+Shift+R).

---

## 📄 Research Paper Integration

### **"The Network State: A New Model of Governance in the Digital Age"**
*by Nikhil | Department of Computer Science and Engineering*

This project uniquely combines **visual city planning** with **academic research** on network states. Click the **"📄 READ RESEARCH PAPER"** button in the live demo to access the full research paper, which explores:

- **Digital Governance Models** - How network states challenge traditional nation-states
- **Blockchain & DAOs** - Decentralized coordination mechanisms
- **Cryptographic Identity** - Trust systems without centralized authority
- **Case Studies** - Real-world examples like Estonia's e-Residency
- **Future Implications** - Impact on citizenship, governance, and global politics

The research paper is fully integrated into the website with a beautiful modal reader featuring:
- ✅ Full academic content with proper formatting
- ✅ Sections: Abstract, Introduction, Literature Review, Methodology, Advantages/Challenges, Case Examples, Conclusion
- ✅ References to Balaji Srinivasan, Satoshi Nakamoto, Vitalik Buterin
- ✅ Minecraft-themed UI design
- ✅ Smooth reading experience

---

## 🧱 Minecraft Architecture

### Block-by-Block Construction
- **Stone Brick Buildings** - Authentic Minecraft block textures
- **Grass Block Roofs** - Green sustainable tops on every building
- **Glass Windows** - Transparent block windows
- **Oak Wood Details** - Plank textures for accents
- **Voxel-Perfect** - True blocky Minecraft aesthetic

### Procedural Textures
- **Stone Bricks** - Randomized gray patterns (16x16 pixels)
- **Grass Blocks** - Green with dirt variations
- **Dirt Paths** - Brown street textures
- **Oak Planks** - Wood grain patterns
- **Glass** - Semi-transparent blocks

---

## 🏗️ City Layout

### Barcelona Grid System
- **9x9 Superblocks** - Eixample-inspired layout
- **Dirt Path Streets** - Minecraft path blocks
- **Grass Patches** - Parks in block centers
- **200+ Buildings** - Randomly generated heights (5-13 blocks)
- **Blocky Clouds** - Floating white blocks in sky

---

## 🚇 Transportation (Minecart System)

### Underground Rails
- **4 Minecart Lines** - Complete rail network
- **Iron Rails** - Authentic rail block textures
- **Wooden Ties** - Oak plank rail supports
- **Underground Tunnels** - At Y=-4 level

### Surface Transport
- **Powered Rails** - Surface tram system
- **Dirt Paths** - Walkable streets
- **Rail Stations** - Access points throughout city

---

## 💧 Water System

### Water Blocks
- **Flowing Canals** - Minecraft water blocks (#3F76E4)
- **Horizontal Canal** - Main east-west waterway
- **Vertical Canal** - North-south water channel
- **Cauldrons** - Water collection points (10 locations)
- **Transparent Water** - Classic Minecraft blue

---

## 🔧 Underground Infrastructure

### Redstone Network
- **Redstone Circuits** - Glowing red power grid (#FF0000)
- **Power Distribution** - 10-block spacing grid
- **Emissive Blocks** - Lit redstone texture

### Cave Systems
- **Stone Tunnels** - Utility corridors at Y=-8
- **Grid Layout** - 20-block spacing
- **Service Access** - Throughout underground
- **Bedrock Layer** - Bottom foundation at Y=-15

---

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
- **Day Lighting** - Bright ambient + directional sun

---

## 🎮 Interactive Controls

### Layer Toggle System (6 Layers!)
Click buttons to show/hide infrastructure layers:

- 🏙️ **Surface** - Buildings, trees, clouds, streets
- 🚇 **Transport** - Minecart rails, powered rails
- 💧 **Water** - Canals, water blocks, cauldrons
- ⚡ **Utilities** - Power grid, telecom, gas pipelines
- 🏥 **Social** - Hospitals, schools, security, housing
- 🔧 **Underground** - Redstone, caves, tunnels, bedrock

### Research Paper Access
- **📄 READ RESEARCH PAPER** button - Opens full academic paper
- **Modal Reader** - Beautiful reading interface
- **Smooth Scrolling** - Easy navigation through sections
- **Close Button** - Return to city visualization

### Camera Controls
- **🖱️ Drag** - Rotate camera around city
- **🔍 Scroll** - Zoom in/out (20-200 units)
- **Damping** - Smooth camera movement

---

## 🎨 Minecraft Aesthetic

### Visual Style
- **Pixelated Textures** - 16x16 block textures
- **No Anti-aliasing** - Sharp blocky edges
- **Nearest Filter** - Crisp pixel-perfect rendering
- **Voxel Grid** - Everything aligned to 1-unit blocks
- **Press Start 2P Font** - Retro pixel font for UI

### Color Palette
- **Stone Gray** - #7a7a7a (buildings)
- **Grass Green** - #5a8c3a (roofs, parks)
- **Dirt Brown** - #8b6914 (streets)
- **Water Blue** - #3F76E4 (canals)
- **Sky Blue** - #87CEEB (background)
- **Redstone Red** - #FF0000 (power grid)
- **Gold** - #FFD700 (UI accents)

### UI Design
- **Wooden Panels** - Brown UI backgrounds (#8B4513)
- **Pixel Borders** - 4px solid borders
- **Shadow Effects** - 8px offset shadows
- **Active States** - Green highlight (#228B22)

---

## 🛠️ Technical Implementation

### Three.js Features
- **BoxGeometry** - All blocks are perfect cubes
- **CanvasTexture** - Procedural texture generation
- **NearestFilter** - Pixelated texture rendering
- **Group Hierarchy** - Organized layer system
- **Shadow Mapping** - Soft shadows (2048x2048)
- **OrbitControls** - Smooth camera interaction

### Performance Optimizations
- **Efficient Rendering** - Grouped objects by layer
- **Layer Culling** - Toggle visibility to reduce draw calls
- **Fog Distance** - Render optimization (50-200 units)
- **Shared Materials** - Reused textures across blocks

---

## 📦 Local Development

If you want to run the project locally:

```bash
# Clone repository
git clone https://github.com/brokenspagheti/wanda-network-state-city.git
cd wanda-network-state-city

# Serve locally (choose one)
python -m http.server 8000
# or
npx serve
# or
php -S localhost:8000

# Open browser
open http://localhost:8000
```

### File Structure
```
wanda-network-state-city/
├── index.html          # Main HTML with UI and research modal
├── script.js           # Three.js 3D city generation
├── .nojekyll          # GitHub Pages configuration
└── README.md          # This file
```

---

## 🎯 Network State Concept

### Digital Governance Visualization
Wanda represents the physical manifestation of network state principles:

1. **Decentralized Layout** - No single center, distributed governance
2. **Connected Districts** - Rail network integration (like digital networks)
3. **Sustainable Design** - Green roofs, water management
4. **Community Blocks** - Superblock organization (like DAOs)
5. **Voluntary Participation** - Open, accessible city design

### Research Integration
The integrated research paper provides theoretical foundation for the city's design:

- **Why network states?** - Addresses governance inefficiency
- **How they work** - Blockchain, cryptography, DAOs
- **Real examples** - Estonia, MakerDAO, Aragon
- **Future vision** - Redefined citizenship, global governance

---

## 📊 City Statistics

- **Blocks Placed:** 10,000+ individual blocks
- **Buildings:** 200+ stone brick structures
- **Trees:** 80 oak trees (320+ blocks each)
- **Rails:** 4 complete minecart lines
- **Water Blocks:** 500+ flowing water
- **Redstone:** 200+ powered blocks
- **Clouds:** 20 cloud formations
- **Total Area:** 200x200 blocks
- **Height Range:** Y=-15 (bedrock) to Y=60 (clouds)

---

## 🎮 Minecraft Features

### Authentic Elements
✅ Block-by-block construction  
✅ Procedural 16x16 textures  
✅ Minecart rails & powered rails  
✅ Water physics (visual)  
✅ Redstone circuits (glowing)  
✅ Oak trees (logs + leaves)  
✅ Grass blocks  
✅ Stone bricks  
✅ Glass windows  
✅ Cauldrons  
✅ Bedrock layer  
✅ Blocky clouds  

---

## 📄 License

MIT License - Build, modify, share freely!

---

## 🙏 Credits

- **Minecraft** - Mojang Studios (visual inspiration)
- **Three.js** - 3D graphics library
- **Barcelona** - Urban planning model (Eixample)
- **Balaji Srinivasan** - Network State concept
- **Press Start 2P** - Google Fonts (pixel font)
- **Nikhil** - Research paper author

---

## 📧 Links

- **🌐 Live Demo:** https://brokenspagheti.github.io/wanda-network-state-city/
- **📂 Repository:** https://github.com/brokenspagheti/wanda-network-state-city
- **🐛 Issues:** [Report bugs or request features](https://github.com/brokenspagheti/wanda-network-state-city/issues)

---

⛏️ **Built block-by-block for the future of decentralized cities**

*Combining Minecraft aesthetics with academic research on digital governance*

*Not affiliated with Mojang Studios or Minecraft*