import { Injectable } from '@angular/core';
import { Observable, of, delay, defer } from 'rxjs';
import { Photo } from 'src/app/core/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  public readonly mockPhotos$: Observable<Array<Photo>> = defer(() => {
    const mockArray: Array<Photo> = [];
    for (let i = 0; i < 9; i++) {
      const id = Math.floor(Math.random() * 500) + 1;
      mockArray.push({
        id: crypto.randomUUID(),
        url: `https://picsum.photos/id/${id}/200/300`,
      });
    }

    const mockDelay = Math.floor(Math.random() * 100) + 200;

    return of(mockArray).pipe(delay(mockDelay));
  });
}
