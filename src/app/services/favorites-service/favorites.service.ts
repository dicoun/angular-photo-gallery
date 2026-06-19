import { effect, Injectable, signal } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites_photos';
  private favoritesState = signal<Photo[]>(this.loadFromLocalStorage());

  public readonly favorites = this.favoritesState.asReadonly();

  public constructor() {
    //save array of favorites photos to local storage when favoritesState signal is changed
    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.favoritesState()),
      );
    });
  }
  //add photo to favorites when user clicks on the photo in gallery
  public addToFavorites(photo: Photo): void {
    const isInFavorites = this.favoritesState().some((p) => p.id === photo.id);
    if (isInFavorites) return;

    this.favoritesState.update((photos) => [photo, ...photos]);
  }
  //remove photo from favorites when user clicks on Remove from favorites button
  public deleteFromFavorites(photo: Photo): void {
    const isInFavorites = this.favoritesState().some((p) => p.id === photo.id);
    if (!isInFavorites) return;

    this.favoritesState.update((photos) =>
      photos.filter((p) => p.id !== photo.id),
    );
  }
  //get array of favorites photos from local storage when service is created (page is reloaded)
  private loadFromLocalStorage(): Photo[] {
    const photos = localStorage.getItem(this.STORAGE_KEY);
    return photos ? JSON.parse(photos) : [];
  }
}
