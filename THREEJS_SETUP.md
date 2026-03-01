# Three.js Setup Guide

## Current Setup: CDN (Recommended)

The project currently uses **CDN-hosted Three.js** via import maps:

```html
<script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
    }
</script>
```

### Advantages of CDN:
- ✅ No installation needed
- ✅ Faster loading (cached by browsers)
- ✅ Smaller repository size
- ✅ Works immediately on GitHub Pages
- ✅ Easy version management

---

## Option 1: Keep Using CDN (Current - No Changes Needed)

**This is already working!** The project loads Three.js from jsDelivr CDN.

**Files loaded:**
- `three@0.160.0/build/three.module.js` - Core Three.js library
- `three@0.160.0/examples/jsm/controls/OrbitControls.js` - Camera controls
- `three@0.160.0/examples/jsm/renderers/CSS2DRenderer.js` - Label renderer

---

## Option 2: Install Three.js Locally (If You Want Offline Support)

### Step 1: Download Three.js

```bash
# Using npm
npm install three@0.160.0

# Or download manually from:
# https://github.com/mrdoob/three.js/releases/tag/r160
```

### Step 2: Add to Repository

Create this folder structure:
```
wanda-network-state-city/
├── libs/
│   └── three/
│       ├── three.module.js
│       └── examples/
│           └── jsm/
│               ├── controls/
│               │   └── OrbitControls.js
│               └── renderers/
│                   └── CSS2DRenderer.js
├── index.html
└── script.js
```

### Step 3: Update Import Map

Change the import map in `index.html`:

```html
<script type="importmap">
    {
        "imports": {
            "three": "./libs/three/three.module.js",
            "three/addons/": "./libs/three/examples/jsm/"
        }
    }
</script>
```

### Step 4: No Changes to script.js

The imports in `script.js` stay the same:
```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
```

---

## Option 3: Use Different CDN

### Unpkg CDN:
```html
<script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
        }
    }
</script>
```

### Skypack CDN:
```html
<script type="importmap">
    {
        "imports": {
            "three": "https://cdn.skypack.dev/three@0.160.0",
            "three/addons/": "https://cdn.skypack.dev/three@0.160.0/examples/jsm/"
        }
    }
</script>
```

---

## Troubleshooting

### If Three.js doesn't load:

1. **Check browser console** (F12) for errors
2. **Verify CDN is accessible** - Try opening the CDN URL directly
3. **Check import map syntax** - Must be valid JSON
4. **Ensure script.js is type="module"** - Required for ES6 imports

### Browser Compatibility:

Import maps require modern browsers:
- ✅ Chrome 89+
- ✅ Edge 89+
- ✅ Safari 16.4+
- ✅ Firefox 108+

For older browsers, use a bundler like Vite or Webpack.

---

## Recommended: Stick with CDN

**For this project, the CDN approach is best because:**
- Works perfectly on GitHub Pages
- No build process needed
- Fast and reliable
- Easy to update versions
- Smaller repository size

**Current setup is production-ready!** 🚀

---

## Version Information

**Current Version:** Three.js r160 (0.160.0)
**Release Date:** December 2023
**Stability:** Stable release

To upgrade to a newer version, just change the version number in the CDN URL:
```
https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js
```

Check latest versions at: https://github.com/mrdoob/three.js/releases
