import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoComponent } from './photo.component';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { Photo } from 'src/app/core/models/photo.model';
import { By } from '@angular/platform-browser';
import { FavoritesComponent } from '../favorites/favorites.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let favoritesList: Photo[] = [];

  const mockFavoritesService = {
    deleteFromFavorites: jasmine.createSpy('deleteFromFavorites'),
    get favorites() {
      return () => favoritesList;
    },
  };

  beforeEach(() => {
    favoritesList = [];
    TestBed.configureTestingModule({
      imports: [
        PhotoComponent,
        RouterTestingModule.withRoutes([
          { path: 'favorites', component: FavoritesComponent },
        ]),
      ],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService },
      ],
    });
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show not found message when photo id is invalid', () => {
    component.id = 'invalid-id';
    fixture.detectChanges();

    const notFound = fixture.debugElement.query(By.css('.not-found-block'));
    expect(notFound).toBeTruthy();
    expect(notFound.nativeElement.textContent).toContain('Photo not found');

    const photo = fixture.debugElement.query(By.css('.photo-block'));
    expect(photo).toBeNull();
  });

  it('should render photo and button when photo exist', () => {
    favoritesList = [{ id: 'b4e95f75' }];
    component.id = 'b4e95f75';
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeNull();

    const notFound = fixture.debugElement.query(By.css('.not-found-block'));
    expect(notFound).toBeNull();

    const photo = fixture.debugElement.query(By.css('.photo-block'));
    expect(photo).toBeTruthy();

    const button = fixture.debugElement.query(By.css('button.remove-button'));
    expect(button).toBeTruthy();
  });

  it('should call removePhoto method when button is clicked', () => {
    const photo = { id: 'b4e95f75' };
    favoritesList = [photo];
    component.id = 'b4e95f75';
    fixture.detectChanges();
    spyOn(component as any, 'removePhoto').and.callThrough();
    const button = fixture.debugElement.query(By.css('button'));

    expect(button).toBeTruthy();
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.removePhoto).toHaveBeenCalled();
    expect(mockFavoritesService.deleteFromFavorites).toHaveBeenCalledWith(
      photo,
    );
  });
});
