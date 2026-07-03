import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleryService } from 'src/app/services/gallery-service/gallery.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollDirective } from 'src/app/shared/directives/infinite-scroll/infinite-scroll.directive';
import { buildThumbnailUrl } from 'src/app/core/utils/photo-url.util';
import { take } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    InfiniteScrollDirective,
  ],
})
export class GalleryComponent implements OnInit, OnDestroy {
  private readonly galleryService = inject(GalleryService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly animationTimeouts = new Set<ReturnType<typeof setTimeout>>();

  public readonly isLoading = signal<boolean>(false);
  public readonly photos = signal<Array<Photo>>([]);
  private readonly justAddedIds = signal<ReadonlySet<string>>(new Set());

  public ngOnInit(): void {
    this.getPhotos();
  }

  public ngOnDestroy(): void {
    this.animationTimeouts.forEach(clearTimeout);
  }

  protected trackById(_: number, photo: Photo): string {
    return photo.id;
  }

  protected getThumbnailUrl(id: string): string {
    return buildThumbnailUrl(id);
  }

  protected isJustAdded(id: string): boolean {
    return this.justAddedIds().has(id);
  }

  public addToFavoritesPhotos(photo: Photo): void {
    const added = this.favoritesService.addToFavorites(photo);

    this.snackBar.open(
      added ? 'Added to favorites' : 'Already in favorites',
      'Close',
      { duration: 2000 },
    );

    if (!added) return;

    this.justAddedIds.update((ids) => new Set(ids).add(photo.id));
    const timeoutId = setTimeout(() => {
      this.animationTimeouts.delete(timeoutId);
      this.justAddedIds.update((ids) => {
        const next = new Set(ids);
        next.delete(photo.id);
        return next;
      });
    }, 400);
    this.animationTimeouts.add(timeoutId);
  }

  public getPhotos(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    //get mock photos from galleryService
    this.galleryService.mockPhotos$
      //unsubscribe when get first value
      .pipe(take(1))
      .subscribe({
        next: (photos) => {
          this.photos.update((curr) => [...curr, ...photos]);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }
}
