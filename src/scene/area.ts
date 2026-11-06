import type { Object3D } from 'three';
import { RectAreaLight } from 'three';
import { Obj3D } from 'illutions';

export class Area extends Obj3D {
  // Called once when this object is encountered while traversing the GLTF model
  public override onCreate(obj: Object3D): void {
    // Replace the placeholder with a renderer-compatible area light
    obj.updateWorldMatrix(true, false);

    const areaLight = new RectAreaLight(0xffffff, 1, 10, 10);
    obj.getWorldPosition(areaLight.position);
    obj.getWorldQuaternion(areaLight.quaternion);
    areaLight.name = 'AreaRect';

    this.obj = areaLight;
    this.scene.obj.add(areaLight);
  }
}
