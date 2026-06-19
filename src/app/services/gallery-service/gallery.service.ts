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
      mockArray.push({
        id: crypto.randomUUID(),
        url: `https://picsum.photos/200/300?random=${i}`,
      });
    }

    const mockDelay = Math.floor(Math.random() * 100) + 200;

    return of(mockArray).pipe(delay(mockDelay));
  });
}
