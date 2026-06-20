import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { GalleryService } from 'src/app/services/gallery-service/gallery.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollDirective } from 'src/app/shared/directives/infinite-scroll/infinite-scroll.directive';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    InfiniteScrollDirective,
  ],
})
export class GalleryComponent implements OnInit {
  private readonly galleryService = inject(GalleryService);
  private readonly favoritesService = inject(FavoritesService);

  public readonly isLoading = signal<boolean>(false);
  public readonly photos = signal<Array<Photo>>([]);

  public ngOnInit(): void {
    this.getPhotos();
  }

  protected trackById(_: number, photo: Photo): string {
    return photo.id;
  }

  public addToFavoritesPhotos(photo: Photo): void {
    //add photo to favorites
    this.favoritesService.addToFavorites(photo);
  }

  public getPhotos(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    //get mock photos from galleryService
    this.galleryService.mockPhotos$.subscribe({
      next: (photos) => {
        this.photos.update((curr) => [...curr, ...photos]);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
