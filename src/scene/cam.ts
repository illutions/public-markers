import { PerspCam3D } from 'illutions';
import type { MyApp } from '../index';

export class Cam extends PerspCam3D {
  declare public comps: MyApp['comps'];

  // Called once after the GLTF model has been loaded and traversed
  protected override onReady(): void {
    this.targetTo(this.comps.scene.m0Aim.obj);
  }
}
