import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { of } from 'rxjs';
import { InfiniteScrollDirective } from 'src/app/shared/directives/infinite-scroll/infinite-scroll.directive';
import { GalleryService } from 'src/app/services/gallery-service/gallery.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { buildThumbnailUrl } from 'src/app/core/utils/photo-url.util';
import { By } from '@angular/platform-browser';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  const data = [{ id: 'b4e95f75' }, { id: '5bef952d' }];

  const mockGalleryService = {
    mockPhotos$: of(data),
  };

  const mockFavoritesService = {
    addToFavorites: jasmine.createSpy('addToFavorites'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GalleryComponent, InfiniteScrollDirective],
      providers: [
        { provide: GalleryService, useValue: mockGalleryService },
        { provide: FavoritesService, useValue: mockFavoritesService },
      ],
    });
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create list of photos', () => {
    component.photos.set(data);
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('img'));

    expect(images.length).toBe(2);
    expect(images[0].nativeElement.src).toContain(
      buildThumbnailUrl('b4e95f75'),
    );
  });

  it('should call addToFavorites method when click on the photo', () => {
    component.photos.set(data);
    fixture.detectChanges();
    spyOn(component, 'addToFavoritesPhotos').and.callThrough();
    const img = fixture.debugElement.query(By.css('img'));

    expect(img).toBeTruthy();

    img.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.addToFavoritesPhotos).toHaveBeenCalledWith(data[0]);
    expect(component.addToFavoritesPhotos).toHaveBeenCalledTimes(1);
  });

  it('should call getPhotos when infinite scroll emit', fakeAsync(() => {
    spyOn(component, 'getPhotos').and.callThrough();
    fixture.detectChanges();

    const spinnerBlock = fixture.debugElement.query(
      By.directive(InfiniteScrollDirective),
    );
    spinnerBlock.triggerEventHandler('infiniteScrollLoad', null);
    tick(500);

    expect(component.getPhotos).toHaveBeenCalled();
  }));

  it('should show spinner when loading is in process', () => {
    component.isLoading.set(true);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));

    expect(spinner).toBeTruthy();
  });
});
