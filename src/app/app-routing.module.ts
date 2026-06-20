import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/gallery/gallery.component').then(
        (m) => m.GalleryComponent,
      ),
    pathMatch: 'full',
    title: 'Photo Gallery',
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites.component').then(
        (m) => m.FavoritesComponent,
      ),
    title: 'Favorites',
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./features/photo/photo.component').then((m) => m.PhotoComponent),
    title: 'Photo View',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
