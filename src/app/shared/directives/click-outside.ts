import { DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';
import { fromEvent } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutside {
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  clickOutside = output<void>();

  constructor() {
    this.handleClickOutside();
  }

  private handleClickOutside(): void {
    fromEvent<MouseEvent>(document, 'click')
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(event => {
      const targetElement = event.target as HTMLElement;
      if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
        this.clickOutside.emit();
      }
    })
  }
}
