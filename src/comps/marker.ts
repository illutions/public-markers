import { Comp } from 'illutions';

type MarkerClickEventType = 'M1_Click' | 'M2_Click' | 'M3_Click' | 'M4_Click';

// Share semantic button behavior across all marker components
export abstract class Marker extends Comp {
  protected abstract readonly clickEventName: MarkerClickEventType;

  private button: HTMLButtonElement | null = null;

  // Called whenever marker tracking changes the component visibility
  protected onVisibilityChanged(visible: boolean): void {
    // Mirror the computed visibility on the host element
    this.toggleAttribute('data-visible', visible);
    this.setAttribute('aria-hidden', String(!visible));
  }

  // Bind the user-authored button when the component enters the page
  connectedCallback(): void {
    if (this.button) return;

    this.button = this.querySelector<HTMLButtonElement>(':scope > button');
    if (!this.button) return;

    // Keep marker input separate from canvas controls
    this.button.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });
    this.button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.events.send({ type: this.clickEventName });
    });
  }

  // Stop following the 3D aim when the component leaves the page
  disconnectedCallback(): void {
    this.unfollow();
  }
}
