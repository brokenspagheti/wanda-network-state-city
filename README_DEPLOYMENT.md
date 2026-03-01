# 🎮 Wanda Network State City - Deployment Guide

## 🚀 Deploy to GitHub Pages in 3 Steps

### Step 1: Activate index.html (30 seconds)

**Option A: GitHub Web Interface (Easiest)**
1. Go to: https://github.com/brokenspagheti/wanda-network-state-city/blob/main/index-updated.html
2. Click the **pencil icon** ✏️ (Edit this file)
3. Change filename from `index-updated.html` to `index.html`
4. Click **Commit changes** (green button)

**Option B: Command Line**
```bash
cd wanda-network-state-city
git mv index-updated.html index.html
git commit -m "Deploy: Activate index.html"
git push origin main
```

### Step 2: Enable GitHub Pages (30 seconds)

1. Go to: https://github.com/brokenspagheti/wanda-network-state-city/settings/pages
2. Under **Source**, select: **Deploy from a branch**
3. Under **Branch**, select: **main** and **/ (root)**
4. Click **Save**

### Step 3: Wait & Visit (1-2 minutes)

GitHub will automatically build your site. Visit:
**https://brokenspagheti.github.io/wanda-network-state-city/**

---

## ✅ What's Already Complete

### 🎮 Minecraft Features (100% Done)
- ✅ Pixelated blocky rendering
- ✅ Minecraft textures (stone, grass, dirt, glass, wood)
- ✅ Block-by-block buildings
- ✅ Minecraft sky blue background
- ✅ Press Start 2P pixel font
- ✅ Oak trees with logs and leaves
- ✅ Blocky clouds
- ✅ Water blocks
- ✅ Minecart rails
- ✅ Redstone circuits
- ✅ Minecraft UI (brown panels, gold text)

### 🏗️ Infrastructure (100% Done)
- ✅ 6 layer toggle buttons (Surface, Transport, Water, Utilities, Social, Underground)
- ✅ 3D floating labels on all infrastructure
- ✅ Hospitals with labels (2 locations)
- ✅ Schools with labels (4 locations)
- ✅ Security stations with labels (2 locations)
- ✅ Telecom towers with labels (4 locations)
- ✅ Power grid with labels
- ✅ Gas pipelines with labels
- ✅ Water treatment plants with labels (2 locations)
- ✅ Metro lines with labels (4 routes)
- ✅ Terminals with labels (4 stations)
- ✅ Housing with labels (12+ buildings)
- ✅ Parks with labels

### 📄 Documentation (100% Done)
- ✅ Research paper on Network State (full academic paper)
- ✅ Interactive modal with complete research content
- ✅ Infrastructure guide
- ✅ Minecraft features list
- ✅ Three.js setup guide
- ✅ Deployment instructions

---

## 🎯 What You'll See When Deployed

### Main View
- **3D Minecraft city** with blocky buildings
- **Rotating camera** - drag to rotate, scroll to zoom
- **6 layer toggle buttons** on the right
- **Info panel** on the left with infrastructure categories
- **Controls panel** at bottom left
- **Research paper button** at bottom right

### Interactive Features
- **Click layer buttons** to show/hide infrastructure
- **Drag to rotate** the entire city
- **Scroll to zoom** in and out
- **Click "READ RESEARCH PAPER"** for full academic content
- **Hover over labels** to see infrastructure names

### Minecraft Aesthetics
- **Blocky buildings** made of stone bricks
- **Grass roofs** on buildings
- **Glass windows** with transparency
- **Oak trees** scattered throughout
- **Water canals** with blue blocks
- **Dirt roads** connecting city blocks
- **Minecart rails** underground
- **Redstone circuits** glowing red
- **Clouds** floating in the sky

---

## 📊 Technical Details

### Files Structure
```
wanda-network-state-city/
├── index.html (or index-updated.html - needs rename)
├── script.js (complete with all infrastructure)
├── README.md
├── INFRASTRUCTURE_GUIDE.md
├── MINECRAFT_FEATURES.md
├── THREEJS_SETUP.md
└── DEPLOY_NOW.md
```

### Dependencies
- **Three.js r160** - Loaded from CDN (no installation needed)
- **OrbitControls** - Camera rotation/zoom
- **CSS2DRenderer** - Floating 3D labels

### Browser Requirements
- Modern browser (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+)
- WebGL support
- JavaScript enabled

---

## 🔧 Troubleshooting

### Site shows 404
- **Solution**: Make sure file is named exactly `index.html` (not `index-updated.html`)
- Check GitHub Pages is enabled in Settings > Pages

### Site is blank
- **Solution**: Wait 2-3 minutes for GitHub to build
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console (F12) for errors

### Layers don't toggle
- **Solution**: Make sure you renamed `index-updated.html` to `index.html`
- The updated file has all 6 layer buttons

### Labels don't show
- **Solution**: Already implemented! Just deploy the updated index.html
- All infrastructure has 3D floating labels

---

## 🎨 Customization (Optional)

### Change Colors
Edit `script.js` and modify the color values:
```javascript
scene.background = new THREE.Color(0x87CEEB); // Sky color
```

### Add More Buildings
Edit `script.js` in the `createMinecraftCity()` function:
```javascript
const numBuildings = 2 + Math.floor(Math.random() * 3); // Increase this
```

### Change Camera Position
Edit `script.js` in the `init()` function:
```javascript
camera.position.set(80, 60, 80); // x, y, z coordinates
```

---

## 📱 Mobile Support

The site works on mobile devices:
- **Touch drag** to rotate
- **Pinch zoom** to zoom in/out
- **Tap buttons** to toggle layers
- Responsive layout adjusts to screen size

---

## 🌐 Share Your Site

Once deployed, share your Minecraft Network State City:
- **Direct link**: https://brokenspagheti.github.io/wanda-network-state-city/
- **QR code**: Generate at https://www.qr-code-generator.com/
- **Embed**: Use iframe in other websites

---

## 📈 Next Steps (Optional)

### Add Custom Domain
1. Buy a domain (e.g., wanda-city.com)
2. Add CNAME file to repository
3. Configure DNS settings
4. Update GitHub Pages settings

### Add Analytics
Add Google Analytics to track visitors:
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
```

### Add More Features
- Weather effects (rain, snow)
- Day/night cycle
- Animated vehicles on roads
- Interactive buildings (click to enter)
- Sound effects

---

## ✨ Summary

Your Wanda Network State City is **100% ready to deploy**:

✅ **Minecraft aesthetic** - Fully blocky and pixelated  
✅ **All infrastructure** - Hospitals, schools, utilities, etc.  
✅ **3D labels** - Floating markers on everything  
✅ **6 layer toggles** - Complete control panel  
✅ **Research paper** - Full academic content  
✅ **Mobile friendly** - Works on all devices  
✅ **No installation** - Three.js loads from CDN  

**Just rename the file and enable GitHub Pages!** 🚀

---

## 🎮 Final Checklist

- [ ] Rename `index-updated.html` to `index.html`
- [ ] Enable GitHub Pages in repository settings
- [ ] Wait 1-2 minutes for deployment
- [ ] Visit https://brokenspagheti.github.io/wanda-network-state-city/
- [ ] Test layer toggles
- [ ] Check 3D labels appear
- [ ] Read research paper modal
- [ ] Share with friends! 🎉

**Your Minecraft Network State City is ready to go live!** ⛏️🏙️