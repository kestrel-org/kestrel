import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective implements OnChanges {
  @Input() appLoader = true;
  @Input() loaderSource = 'assets/images/loader.gif';

  el: ElementRef;
  baseDisplay: string;
  isInit = true;

  constructor(el: ElementRef) {
    this.el = el;
  }

  loadLoader() {
    if (this.appLoader) {
      this.el.nativeElement.style.display = 'none';
      const img = document.createElement('img');
      img.src = this.loaderSource;
      this.el.nativeElement.parentNode.append(img);
      this.isInit = false;
    } else if (!this.isInit) {
      this.el.nativeElement.style.display = this.baseDisplay;
      this.el.nativeElement.parentNode.removeChild(this.el.nativeElement.parentNode.lastElementChild);
    }
  }

  ngOnChanges() {
    if (this.isInit) {
      this.baseDisplay = this.el.nativeElement.style.display;
    }
    this.loadLoader();
  }
}
