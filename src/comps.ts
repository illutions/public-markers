import { setComps, Collid3D, Obj3D } from 'illutions';

import { M1 } from './web/m1';
import { M2 } from './web/m2';
import { M3 } from './web/m3';
import { M4 } from './web/m4';
import { Aim } from './scene/aim';
import { Area } from './scene/area';
import { Cam } from './scene/cam';

// Register customized asset components
export const comps = setComps({
  scene: {
    area: {
      class: Area,
      params: { gltf: true }
    },
    cam: {
      class: Cam,
      params: { name: 'Camera', gltf: true }
    },
    m0Aim: {
      class: Obj3D,
      params: { gltf: true }
    },
    m0Cam: {
      class: Obj3D,
      params: { gltf: true }
    },
    m1Aim: {
      class: Aim,
      params: { gltf: true }
    },
    m1Cam: {
      class: Obj3D,
      params: { gltf: true }
    },
    m2Aim: {
      class: Aim,
      params: { gltf: true }
    },
    m2Cam: {
      class: Obj3D,
      params: { gltf: true }
    },
    m3Aim: {
      class: Aim,
      params: { gltf: true }
    },
    m3Cam: {
      class: Obj3D,
      params: { gltf: true }
    },
    m4Aim: {
      class: Aim,
      params: { gltf: true }
    },
    m4Cam: {
      class: Obj3D,
      params: { gltf: true }
    },
    watchLP: {
      class: Collid3D,
      params: { gltf: true, hidden: true, occluder: true }
    },
  },
  web: {
    m1: M1,
    m2: M2,
    m3: M3,
    m4: M4,
  },
});
