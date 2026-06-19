import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { GalleryService } from 'src/app/services/gallery-service/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, MatGridListModule],
})
export class GalleryComponent {
  private isLoading = signal<boolean>(false);
  private galleryService = inject(GalleryService);

  protected photos = signal<Array<Photo>>([]);

  public ngOnInit(): void {
    this.getPhotos();
  }

  protected trackById(index: number, photo: Photo): string {
    return photo.id;
  }

  protected addToFavoritPhotos(photo: Photo): void {
    //add photo to favorites
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
