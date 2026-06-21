import { Injectable } from '@angular/core';
import { Observable, of, delay, defer } from 'rxjs';
import { Photo } from 'src/app/core/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  public mockPhotos$: Observable<Array<Photo>> = defer(() => {
    //generate a mock array of photos to emulate server responce
    const mockArray: Array<Photo> = [];
    for (let i = 0; i < 9; i++) {
      const id = Math.floor(Math.random() * 500) + 1;
      mockArray.push({
        id: crypto.randomUUID(),
        url: `https://picsum.photos/id/${id}/200/300`,
      });
    }
    //create mock delay of 200–300ms
    const mockDelay = Math.floor(Math.random() * 100) + 200;
    //emulate asynchronous server responce with latency
    return of(mockArray).pipe(delay(mockDelay));
  });
}
