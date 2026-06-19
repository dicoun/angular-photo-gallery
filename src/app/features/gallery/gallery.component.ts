import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, MatGridListModule],
})
export class GalleryComponent {
  protected photos = signal<Array<Photo>>([
    {
      id: 'url_1',
      url: 'Test_url_1',
    },
    {
      id: 'url_2',
      url: 'Test_url_2',
    },
    {
      id: 'url_3',
      url: 'Test_url_3',
    },
  ]);

  private isLoading = signal<boolean>(false);

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
    //get photos from service
  }
}
