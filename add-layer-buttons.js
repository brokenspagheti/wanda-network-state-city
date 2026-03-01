// Add missing layer toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    const layerToggle = document.getElementById('layer-toggle');
    const undergroundBtn = document.getElementById('btn-underground');
    
    // Create Utilities button
    const utilitiesBtn = document.createElement('button');
    utilitiesBtn.className = 'toggle-btn active';
    utilitiesBtn.id = 'btn-utilities';
    utilitiesBtn.textContent = '⚡ Utilities';
    
    // Create Social button
    const socialBtn = document.createElement('button');
    socialBtn.className = 'toggle-btn active';
    socialBtn.id = 'btn-social';
    socialBtn.textContent = '🏥 Social';
    
    // Insert before underground button
    layerToggle.insertBefore(utilitiesBtn, undergroundBtn);
    layerToggle.insertBefore(socialBtn, undergroundBtn);
    
    console.log('✅ Layer buttons added successfully!');
});