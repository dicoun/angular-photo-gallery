import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  private readonly options: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 1, //element is entirely within window (root is window by default)
  };

  @Output() infiniteScrollLoad = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      //emit when the element intersectes window border (is entirely within window)
      if (entry.isIntersecting) {
        this.infiniteScrollLoad.emit();
      }
    }, this.options);

    //begin to track the element
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    //unsubscribe from tracking when the element is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
