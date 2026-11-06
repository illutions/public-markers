import { setCfg, degToRad } from 'illutions';

export const cfg = setCfg({
  // Display runtime information and editable settings
  gui: {
    infoBox: {
      enable: true,
    },
    inspector: {
      enable: true,
    },
  },

  // Load the Draco-compressed 3D scene progressively from low to high quality
  model: {
    file: ['scene/markers-low.glb', 'scene/markers-med.glb', 'scene/markers-high.glb'],
    compress: {
      mesh: 'draco',
    },
  },

  // Load renderer-specific RectAreaLight LTC data
  light: {
    rectArea: true,
  },

  // Use the EXR map for environment lighting and the background
  envCtrls: {
    enable: true,
    map: ['scene/lonely_road_afternoon_puresky_256.exr'],
    dataType: 'float',
    environmentIntensity: 0.035,
    backgroundIntensity: 0,
    rotation: {
      y: degToRad(100),
    },
  },

  // Load orbit controls
  orbitCtrls: {
    load: true,
    enableZoom: false,
    rotateSpeed: 0.75,
    enablePan: false,
    enableDamping: true,
    dampingFactor: 0.05,
    maxPolarAngle: degToRad(170),
    maxDistance: 8,
    minDistance: 0.1,
  },

  // Distribute marker occlusion checks
  raycast: {
    occludeeInterval: 140,
    occlusionMoveFactor: 0.01,
  },

  render: {
    // Configure renderer profiles
    profile: {
      webgpu: {
        msaa: 'render',
        aa: 'traa',
        ssl: 'gtao',
        ssr: true,
      },
      webgl: {
        msaa: 'post',
        aa: 'fxaa',
        ssl: 'ssao',
        ssr: true,
      },
    },
    // Enable adaptive graphics
    adaptiveGfx: true,
  },

  // Configure post-processing
  post: {
    ssr: {
      maxDistance: 15,
      thickness: 0.02,
    },
    webgl: {
      aa: {
        fxaa: {
          sharpness: 1,
        },
      },
    },
  },

  // Log all messages to the console.
  debug: {
    log: 'all',
  },
});
