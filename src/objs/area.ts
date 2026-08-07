import type { Object3D } from 'three';
import { RectAreaLight } from 'three';
import { Obj3D } from 'illutions';

export class Area extends Obj3D {
  // Called once when this object is encountered while traversing the GLTF model
  public override onTraverse(objGltf: Object3D): void {
    // Replace the Blender placeholder with a renderer-compatible area light
    objGltf.updateWorldMatrix(true, false);

    const areaLight = new RectAreaLight(0xffffff, 1, 10, 10);
    objGltf.getWorldPosition(areaLight.position);
    objGltf.getWorldQuaternion(areaLight.quaternion);
    areaLight.name = 'AreaRect';

    this.obj = areaLight;
    this.scene.add(areaLight);
  }
}
