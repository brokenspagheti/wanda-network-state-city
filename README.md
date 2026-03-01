# 🌐 Wanda - Network State City

A comprehensive 3D visualization of **Wanda**, a futuristic network state city inspired by Barcelona's urban planning. Built with Three.js, featuring brutalist sustainable architecture, complete transportation networks, water systems, and underground infrastructure.

![Three.js](https://img.shields.io/badge/Three.js-0.160.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-live-success)

## 🎯 Live Demo

**🌐 Visit:** https://brokenspagheti.github.io/wanda-network-state-city/

## 🏗️ Architecture & Design

### Brutalist Sustainable Buildings
- **Concrete structures** with exposed panels and raw materials
- **Green roofs** on every building for urban cooling
- **Solar panels** for renewable energy generation
- **Small brutalist windows** characteristic of the architectural style
- **Mixed-use buildings** combining residential, commercial, and office spaces

### Barcelona-Inspired Grid System
- **Eixample superblock layout** - 9x9 grid of city blocks
- **Chamfered corners** allowing better traffic flow and visibility
- **Pocket parks** in the center of each superblock
- **Wide avenues** separating superblocks
- **Pedestrian-priority interiors** within each block

## 🚇 Transportation Infrastructure

### Metro System (Underground)
- **4 metro lines** in different colors (Red, Blue, Green, Yellow)
- **20+ metro stations** distributed across the city
- **Underground tunnels** at -5m depth
- **Station entrances** visible at surface level
- **Interconnected network** covering all major districts

### Surface Transportation
- **Tram lines** on main avenues with dedicated tracks
- **Protected bike lanes** (green-marked) on major streets
- **Pedestrian zones** in superblock interiors
- **Street markings** and traffic infrastructure
- **Car-free zones** promoting sustainable mobility

## 💧 Water Management System

### Canal Network
- **Main canals** running through the city (horizontal & vertical)
- **4m wide waterways** for drainage and aesthetics
- **Interconnected system** linking all districts

### Water Infrastructure
- **2 water treatment plants** (NW and SE corners)
- **Pipe networks** connecting treatment facilities
- **8 decorative fountains** in public spaces
- **Rainwater collection** via green infrastructure
- **Sustainable water recycling** systems

## 🔧 Underground Infrastructure

### Utility Systems
- **Multi-level utility tunnels** at -8m depth
- **Grid network** of service corridors
- **Power, water, and data** distribution
- **Maintenance access points** throughout the city

### Parking & Storage
- **3 underground parking levels** (-4m, -8m, -12m)
- **Distributed parking zones** under each superblock
- **Service corridors** for deliveries and maintenance
- **Vehicle-free surface** promoting walkability

## 🌳 Green Spaces & Sustainability

### Parks & Nature
- **Central park** (20m radius) - city's green lung
- **Pocket parks** in each superblock interior
- **50+ trees** in central park
- **Street trees** lining all major avenues
- **Green roofs** on all buildings

### Sustainable Features
- **Solar panels** on every building
- **Rainwater harvesting** systems
- **Green infrastructure** for natural cooling
- **Pedestrian-first design** reducing emissions
- **Integrated nature** throughout urban fabric

## 🏛️ City Districts

### Governance Quarter
- **Central tower** (40m height) with antenna
- **DAO operations center**
- **Digital democracy hub**
- **Public administration**

### Innovation Hub
- **Tech campus buildings**
- **Startup incubation spaces**
- **Research facilities**
- **Co-working zones**

### Residential Superblocks
- **Mixed-use buildings**
- **Community spaces**
- **Local services**
- **Car-free interiors**

### Cultural District
- **Arts venues**
- **Community centers**
- **Public spaces**
- **Event facilities**

## 🎮 Interactive Features

### Layer Toggle System
- **🏙️ Surface Layer** - Buildings, streets, parks
- **🚇 Transport Layer** - Metro, trams, bike lanes
- **💧 Water Layer** - Canals, treatment plants, fountains
- **🔧 Underground Layer** - Utilities, parking, tunnels

### Camera Controls
- **🖱️ Drag** - Rotate camera around city
- **🔍 Scroll** - Zoom in/out
- **👆 Click layers** - Toggle infrastructure visibility

### Animations
- **Pulsing fountains** - Dynamic water effects
- **Building micro-movements** - Subtle life simulation
- **Lighting effects** - Day/night atmosphere

## 🛠️ Technical Stack

- **Three.js 0.160.0** - 3D graphics engine
- **OrbitControls** - Camera interaction
- **ES6 Modules** - Modern JavaScript
- **WebGL** - Hardware-accelerated rendering
- **Responsive Design** - All screen sizes

## 📦 Installation & Setup

### Quick Start
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
├── index.html          # UI and layer controls
├── script.js           # 3D city generation logic
└── README.md          # Documentation
```

## 🎨 Design Philosophy

### Network State Principles
1. **Decentralization** - Distributed governance and services
2. **Sustainability** - Green infrastructure and renewable energy
3. **Connectivity** - Integrated transport and digital networks
4. **Community** - Human-scale superblocks
5. **Innovation** - Tech-forward urban planning

### Barcelona Influence
- **Superblock system** - Eixample district inspiration
- **Chamfered corners** - Improved visibility and flow
- **Mixed-use density** - Vibrant urban life
- **Public spaces** - Parks and plazas throughout
- **Walkability** - Pedestrian-priority design

### Brutalist Aesthetics
- **Honest materials** - Exposed concrete
- **Functional design** - Form follows function
- **Geometric clarity** - Strong shapes and lines
- **Sustainable integration** - Green roofs and solar
- **Urban density** - Efficient land use

## 🚀 Future Enhancements

- [ ] Dynamic day/night cycle
- [ ] Animated vehicles on streets
- [ ] Weather effects (rain, fog)
- [ ] Building interiors
- [ ] Population simulation
- [ ] Energy flow visualization
- [ ] Real-time data integration
- [ ] VR/AR support

## 🤝 Contributing

Contributions welcome! Areas for improvement:

1. **Performance optimization** - LOD systems
2. **More infrastructure** - Waste, energy grids
3. **Better textures** - PBR materials
4. **Sound design** - Ambient city sounds
5. **Mobile optimization** - Touch controls

### How to Contribute
```bash
# Fork and create branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m 'Add amazing feature'

# Push and create PR
git push origin feature/amazing-feature
```

## 📊 City Statistics

- **Grid Size:** 9x9 superblocks
- **Buildings:** 200+ brutalist structures
- **Metro Stations:** 20 stations, 4 lines
- **Parks:** 1 central + 40+ pocket parks
- **Trees:** 100+ street and park trees
- **Underground Levels:** 3 parking + utility tunnels
- **Water Features:** 2 treatment plants, 8 fountains
- **Total Area:** 200m x 200m

## 📄 License

MIT License - Free to use, modify, and distribute.

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **Barcelona** - Urban planning inspiration
- **Brutalism** - Architectural style
- **Network State** - Governance concept
- **Bhindi AI** - Development assistance

## 📧 Contact & Links

- **Live Site:** https://brokenspagheti.github.io/wanda-network-state-city/
- **Repository:** https://github.com/brokenspagheti/wanda-network-state-city
- **Issues:** https://github.com/brokenspagheti/wanda-network-state-city/issues

---

**Built with ❤️ for sustainable, connected, decentralized cities of the future**