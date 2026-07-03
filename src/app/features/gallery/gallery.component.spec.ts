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
import { MatSnackBar } from '@angular/material/snack-bar';
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

  const mockSnackBar = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(() => {
    mockFavoritesService.addToFavorites.calls.reset();
    mockSnackBar.open.calls.reset();

    TestBed.configureTestingModule({
      imports: [GalleryComponent, InfiniteScrollDirective],
      providers: [
        { provide: GalleryService, useValue: mockGalleryService },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: MatSnackBar, useValue: mockSnackBar },
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

  it('should show snackbar and animation when photo is added to favorites', fakeAsync(() => {
    mockFavoritesService.addToFavorites.and.returnValue(true);
    component.photos.set(data);
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockFavoritesService.addToFavorites).toHaveBeenCalledWith(data[0]);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Added to favorites',
      'Close',
      { duration: 2000 },
    );
    expect(img.nativeElement.classList.contains('photo-added')).toBeTrue();

    tick(400);
    fixture.detectChanges();
    expect(img.nativeElement.classList.contains('photo-added')).toBeFalse();
  }));

  it('should show snackbar without animation when photo is already in favorites', () => {
    mockFavoritesService.addToFavorites.and.returnValue(false);
    component.photos.set(data);
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Already in favorites',
      'Close',
      { duration: 2000 },
    );
    expect(img.nativeElement.classList.contains('photo-added')).toBeFalse();
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
