# 🏙️ Wanda Network State City - Infrastructure Guide

## Complete Infrastructure with 3D Locators

### 💧 WATER INFRASTRUCTURE
**All visible with labels in 3D scene:**
- 💧 **Water Canals** - Horizontal and vertical waterways with blue water blocks
- 🏭 **Treatment Plants** - Treatment Plant A (NW) and Treatment Plant B (SE) with labels
- 💦 **Rainwater Harvesting** - Cauldrons scattered across the city with labels
- 🚰 **Drainage Network** - Underground drainage pipes with marker labels

### 🚇 TRANSPORT INFRASTRUCTURE  
**All visible with labels in 3D scene:**
- 🚇 **Metro Lines** - 4 underground rail lines with "Metro Line" labels
- 🚊 **Tram Lines** - Surface railway with "Tram Line" labels
- 🚉 **Terminals** - 4 transit stations (North, South, East, West) with labels
- 🛣️ **Roads** - Dirt path street network throughout the city

### 🏙️ SURFACE INFRASTRUCTURE
**All visible with labels in 3D scene:**
- 🏠 **Housing** - Residential buildings with "Housing" labels (12+ locations)
- 🌳 **Parks** - Green spaces with "Park" labels scattered throughout
- 🏢 **Buildings** - Minecraft-style stone brick buildings across the grid
- 🌲 **Trees** - 80+ oak trees for green coverage

### ⚡ UTILITIES INFRASTRUCTURE
**All visible with labels in 3D scene:**
- ⚡ **Power Grid** - Glowing yellow power lines with "Power Grid" label
- 🔌 **Power Poles** - Wooden poles supporting the electrical network
- 📡 **Telecom Towers** - 4 communication towers (NW, SE, NE, SW) with labels
- 🔥 **Gas Pipelines** - Underground gas network with "Gas Pipeline" label

### 🏥 SOCIAL INFRASTRUCTURE
**All visible with labels in 3D scene:**
- 🏥 **Hospitals** - General Hospital & City Hospital with red cross and labels
- 🎓 **Schools** - 4 schools (West, East, North, South) with blue buildings and labels
- 🚓 **Security** - Police Station & Fire Station with dark blue buildings and labels
- 🏠 **Housing** - Integrated into surface layer with dedicated labels

### 🔧 UNDERGROUND INFRASTRUCTURE
**All visible with labels in 3D scene:**
- ⚡ **Redstone Grid** - Underground power distribution with "Redstone Grid" label
- 🔧 **Utility Tunnels** - Cave tunnels for sanitation and cables with labels
- 🚇 **Metro Rails** - Underground minecart rail system
- 🚰 **Drainage** - Underground drainage pipes

## Layer Toggle System

### 6 Interactive Layers:
1. **🏙️ Surface** - Buildings, roads, trees, parks, housing
2. **🚇 Transport** - Metro, tram, terminals, railways
3. **💧 Water** - Canals, treatment plants, drainage, harvesting
4. **⚡ Utilities** - Power grid, telecom, gas pipelines
5. **🏥 Social** - Hospitals, schools, security, housing
6. **🔧 Underground** - Redstone grid, utility tunnels, metro rails

### How to Use:
- Click any layer button to toggle visibility
- Green button = Layer visible
- Brown button = Layer hidden
- All layers start visible by default
- Mix and match to see different infrastructure combinations

## 3D Locator Labels

Every major infrastructure element has a floating 3D label that shows:
- **Icon** - Visual identifier (🏥, 🎓, 📡, etc.)
- **Name** - Specific location name
- **Color** - Category-coded colors
- **Position** - Floats above the infrastructure

### Label Colors:
- 🏥 Red - Hospitals
- 🎓 Blue - Schools  
- 🚓 Dark Blue - Security
- 📡 Orange/Red - Telecom
- ⚡ Yellow - Power
- 💧 Blue - Water
- 🚇 Silver/Gold - Transport
- 🌳 Green - Parks

## Controls

- **🖱️ Drag** - Rotate the camera around the city
- **🔍 Scroll** - Zoom in and out
- **👆 Click Layers** - Toggle infrastructure visibility

## Technical Details

- **3D Engine**: Three.js with OrbitControls
- **Label System**: CSS2DRenderer for floating labels
- **Textures**: Procedural Minecraft-style textures
- **Lighting**: Ambient + Directional shadow-casting sun
- **Grid**: 9x9 city blocks with street network
- **Scale**: 300x300 unit world space

## Infrastructure Count

- **Hospitals**: 2 major facilities
- **Schools**: 4 educational institutions
- **Security**: 2 stations (police + fire)
- **Terminals**: 4 transit hubs
- **Telecom Towers**: 4 communication towers
- **Treatment Plants**: 2 water facilities
- **Housing**: 12+ labeled residential buildings
- **Parks**: Multiple green spaces
- **Trees**: 80+ oak trees
- **Metro Lines**: 4 underground rail routes
- **Power Poles**: Grid of electrical infrastructure

---

**🎮 Explore the complete Network State infrastructure in 3D!**

All infrastructure is fully labeled and toggleable for easy exploration and understanding of the city's systems.