import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective implements OnChanges {
  @Input() appLoader = true;
  @Input() loaderSource = 'assets/images/loader.gif';

  el: ElementRef;
  baseDisplay: string;
  loaderActive = false;

  uuid = uuidv4();

  constructor(el: ElementRef) {
    this.el = el;
  }

  toggleLoader() {
    if (this.appLoader) {
      this.el.nativeElement.style.display = 'none';
      const img = document.createElement('img');
      img.id = 'preloader_' + this.uuid;
      img.src = this.loaderSource;
      this.el.nativeElement.parentNode.append(img);
      this.loaderActive = true;
    } else if (this.loaderActive) {
      this.el.nativeElement.style.display = this.baseDisplay;
      const img = document.getElementById('preloader_' + this.uuid);
      img.remove();
    }
  }

  ngOnChanges() {
    if (!this.loaderActive) {
      this.baseDisplay = this.el.nativeElement.style.display;
    }
    this.toggleLoader();
  }
}
