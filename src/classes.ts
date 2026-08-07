import { Mesh3D, Obj3D } from 'illutions';

import { M1 } from './comps/m1';
import { M2 } from './comps/m2';
import { M3 } from './comps/m3';
import { M4 } from './comps/m4';
import { Aim } from './objs/aim';
import { Area } from './objs/area';
import { Camera } from './objs/camera';

export const classes = {
  // Register customized web components
  comps: {
    M1,
    M2,
    M3,
    M4,
  },
  // Register the customized 3D objects
  objs3D: {
    Area,
    Camera,
    WatchLP: Mesh3D,
    M1Aim: Aim,
    M1Cam: Obj3D,
    M2Aim: Aim,
    M2Cam: Obj3D,
    M3Aim: Aim,
    M3Cam: Obj3D,
    M4Aim: Aim,
    M4Cam: Obj3D,
  },
};
