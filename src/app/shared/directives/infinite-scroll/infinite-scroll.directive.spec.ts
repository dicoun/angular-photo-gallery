import { Component } from '@angular/core';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appInfiniteScroll (infiniteScrollLoad)="onLoad()"></div>`,
  standalone: true,
  imports: [InfiniteScrollDirective],
})
class TestComponent {
  onLoad() {}
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let observerCallback: Function;
  let mockDisconnect: jasmine.Spy;

  beforeEach(() => {
    mockDisconnect = jasmine.createSpy('disconnect');
    spyOn(window, 'IntersectionObserver').and.callFake(function (
      callback: IntersectionObserverCallback,
    ) {
      observerCallback = callback;
      return {
        observe: jasmine.createSpy('observe'),
        disconnect: mockDisconnect,
      } as unknown as IntersectionObserver;
    });

    TestBed.configureTestingModule({
      imports: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const element = fixture.debugElement.query(
      By.directive(InfiniteScrollDirective),
    );
    expect(element).toBeTruthy();
  });

  it('should emit when element is entirely within window', () => {
    spyOn(component, 'onLoad');
    const entry = { isIntersecting: true } as IntersectionObserverEntry;
    if (observerCallback) {
      observerCallback([entry]);
    }

    expect(component.onLoad).toHaveBeenCalled();
  });

  it('should disconnect observer when element is destroyed', () => {
    fixture.destroy();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
