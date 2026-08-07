import { CanvasTexture, Object3D, Sprite, SpriteMaterial } from 'three';

// Draw a fixed-size sprite for each 3D marker aim
export class Ring extends Sprite {
  public constructor(target: Object3D) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext('2d');
    if (!context) {
      super();
      return;
    }

    // Draw a translucent ring and center point on the sprite texture
    context.fillStyle = '#00000066';
    context.strokeStyle = '#b8b3b3cc';
    context.lineWidth = 0.5;
    context.beginPath();
    context.arc(32, 32, 7, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.fillStyle = '#b8b3b3';
    context.beginPath();
    context.arc(32, 32, 2.5, 0, Math.PI * 2);
    context.fill();

    // Keep the sprite size stable as the camera moves
    super(new SpriteMaterial({
      map: new CanvasTexture(canvas),
      transparent: true,
      alphaTest: 0.01,
      depthTest: true,
      depthWrite: false,
      sizeAttenuation: false,
    }));

    // Place the sprite at its target without making it interactive
    target.updateWorldMatrix(true, false);
    target.getWorldPosition(this.position);

    this.name = `${target.name}Ring`;
    this.scale.set(0.035, 0.035, 1);
    this.renderOrder = 1;
    this.raycast = () => { };
  }
}
