import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const STORAGE_KEY = 'favorites_photos';
  const photo1 = { id: 'b4e95f75' };
  const photo2 = { id: '5bef952d' };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [FavoritesService],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(FavoritesService);
    expect(service).toBeTruthy();
  });

  it('should get initial data from localStorage', () => {
    const initial = [photo1];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    service = TestBed.inject(FavoritesService);

    expect(service.favorites()).toEqual(initial);
  });

  it('should add photo to favorites', () => {
    const service = TestBed.inject(FavoritesService);

    expect(service.addToFavorites(photo1)).toBeTrue();
    expect(service.favorites()).toEqual([photo1]);
  });

  it('should not dublicate photo to favorites', () => {
    const service = TestBed.inject(FavoritesService);

    expect(service.addToFavorites(photo1)).toBeTrue();
    expect(service.addToFavorites(photo1)).toBeFalse();

    expect(service.favorites().length).toBe(1);
    expect(service.favorites()).toEqual([photo1]);
  });

  it('should remove photo from favorites', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([photo1, photo2]));
    const service = TestBed.inject(FavoritesService);
    service.deleteFromFavorites(photo1);

    expect(service.favorites()).toEqual([photo2]);
  });
});
