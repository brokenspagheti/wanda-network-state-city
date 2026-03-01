# Layer Toggle Update Instructions

## What needs to be changed:

In `index.html`, find the `<div id="layer-toggle">` section (around line 364-370) and replace:

```html
    <div id="layer-toggle">
        <div style="font-weight: bold; margin-bottom: 8px; color: #FFD700; font-size: 9px;">LAYERS</div>
        <button class="toggle-btn active" id="btn-surface">🏙️ Surface</button>
        <button class="toggle-btn active" id="btn-transport">🚇 Transport</button>
        <button class="toggle-btn active" id="btn-water">💧 Water</button>
        <button class="toggle-btn active" id="btn-underground">🔧 Underground</button>
    </div>
```

With:

```html
    <div id="layer-toggle">
        <div style="font-weight: bold; margin-bottom: 8px; color: #FFD700; font-size: 9px;">LAYERS</div>
        <button class="toggle-btn active" id="btn-surface">🏙️ Surface</button>
        <button class="toggle-btn active" id="btn-transport">🚇 Transport</button>
        <button class="toggle-btn active" id="btn-water">💧 Water</button>
        <button class="toggle-btn active" id="btn-utilities">⚡ Utilities</button>
        <button class="toggle-btn active" id="btn-social">🏥 Social</button>
        <button class="toggle-btn active" id="btn-underground">🔧 Underground</button>
    </div>
```

## OR - Add this script before `</body>`:

```html
<script src="add-layer-buttons.js"></script>
```

This will dynamically add the missing buttons!