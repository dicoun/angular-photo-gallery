import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Photo } from 'src/app/core/models/photo.model';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatGridListModule, RouterModule],
})
export class FavoritesComponent {
  private readonly favoritesService = inject(FavoritesService);
  protected readonly favoritePhotos = this.favoritesService.favorites;

  protected trackById(_: number, photo: Photo): string {
    return photo.id;
  }
}
