import { Directive, ElementRef, inject, output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutside {
  private elementRef = inject(ElementRef);

  clickOutside = output<void>();

  constructor() {
    this.handleClickOutside();
  }

  private handleClickOutside(): void {
    fromEvent<MouseEvent>(document, 'click').subscribe(event => {
      const targetElement = event.target as HTMLElement;
      if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
        this.clickOutside.emit();
      }
    })
  }
}
