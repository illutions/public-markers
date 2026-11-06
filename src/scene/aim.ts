import { Object3D } from 'three';
import { Obj3D } from 'illutions';

import { Ring } from './ring';

export class Aim extends Obj3D {
  // Called once when this object is encountered while traversing the GLTF model
  public override onCreate(obj: Object3D): void {
    super.onCreate(obj);

    // Add a visual ring sprite at the marker aim
    const ring = new Ring(obj);
    this.scene.obj.add(ring);
  }
}
