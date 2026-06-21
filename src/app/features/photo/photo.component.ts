import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Photo } from 'src/app/core/models/photo.model';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
})
export class PhotoComponent {
  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);
  private readonly signalId = signal<string | undefined>(undefined);

  @Input({ required: true }) set id(id: string) {
    this.signalId.set(id);
  }

  protected readonly currentPhoto = computed<Photo | undefined>(() => {
    const photoId = this.signalId();
    if (!photoId) return;

    return this.favoritesService.favorites().find((p) => p.id === photoId);
  });

  public removePhoto(): void {
    const photo = this.currentPhoto();
    if (!photo) return;

    //remove photo from favorites
    this.favoritesService.deleteFromFavorites(photo);
    this.router.navigate(['/favorites']);
  }
}
