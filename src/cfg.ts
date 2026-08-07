import { cfg } from 'illutions';

// Display runtime information and editable settings
cfg.gui.infoBox.enable = true;
cfg.gui.inspector.enable = true;

// Load orbit controls
cfg.orbitCtrls.load = true;
cfg.orbitCtrls.enableZoom = false;
cfg.orbitCtrls.rotateSpeed = 0.75;
cfg.orbitCtrls.enablePan = false;
cfg.orbitCtrls.enableDamping = true;
cfg.orbitCtrls.dampingFactor = 0.05;
cfg.orbitCtrls.maxPolarAngle = 170;
cfg.orbitCtrls.maxDistance = 8;
cfg.orbitCtrls.minDistance = 0.1;

// Load the Draco-compressed 3D scene
cfg.model.file = 'scene/markers.glb';
cfg.model.compress.mesh = 'draco';

// Load renderer-specific RectAreaLight LTC data
cfg.light.rectArea = true;

// Use the EXR map for environment lighting and the background
cfg.envCtrls.enable = true;
cfg.envCtrls.map = ['scene/lonely_road_afternoon_puresky_1k.exr'];
cfg.envCtrls.dataType = 'float';
cfg.envCtrls.environmentIntensity = 0.035;
cfg.envCtrls.backgroundIntensity = 0;
cfg.envCtrls.backgroundBlurriness = 1
cfg.envCtrls.rotation.y = 100;

// Distribute marker occlusion checks over 140 milliseconds
cfg.raycast.occlInterval = 140;
cfg.raycast.occlMoveFactor = 0.01

// Configure post-processing
cfg.post.aa.mode = 'traa'
cfg.post.ssr.enable = true;
cfg.post.ssr.maxDistance = 15;
cfg.post.ssr.thickness = 0.02;
cfg.post.webgl.aa.fxaa.sharpness = 1;

export { cfg };
