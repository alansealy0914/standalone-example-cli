import { Component, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
    selector: 'app-about',
    template: `
    <h2 class="title">About</h2>
    <ng-container #container></ng-container>
  `,
    standalone: true
})
export class AboutComponent {
  title = 'Standalone Demo';

  @ViewChild('container', {read: ViewContainerRef})
  viewContainer!: ViewContainerRef;

  async ngOnInit() {
    const esm = await import('./lazy/lazy.component');
    const ref = this.viewContainer.createComponent(esm.LazyComponent)
    ref.instance.title = `Lazy Sub Component !!`;
  }
}

export default AboutComponent;
