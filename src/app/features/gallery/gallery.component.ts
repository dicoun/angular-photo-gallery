import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { GalleryService } from 'src/app/services/gallery-service/gallery.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, MatGridListModule],
})
export class GalleryComponent {
  private isLoading = signal<boolean>(false);
  private readonly galleryService = inject(GalleryService);
  private readonly favoritesService = inject(FavoritesService);

  protected photos = signal<Array<Photo>>([]);

  public ngOnInit(): void {
    this.getPhotos();
  }

  protected trackById(index: number, photo: Photo): string {
    return photo.id;
  }

  protected addToFavoritPhotos(photo: Photo): void {
    //add photo to favorites
    this.favoritesService.addToFavorites(photo);
  }

  private getPhotos(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    //get mock photos from galleryService
    this.galleryService.mockPhotos$.subscribe((photos) => {
      this.photos.update((curr) => [...curr, ...photos]);
      this.isLoading.set(false);
    });
  }
}
