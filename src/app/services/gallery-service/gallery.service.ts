import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Photo } from 'src/app/core/models/photo.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  public mockPhotos$: Observable<Array<Photo>> = defer(() => {
    const { pageSize, mockDelayMinMs, mockDelayMaxMs } = environment.gallery;
    //create mock delay of 200–300ms
    const mockDelay =
      Math.floor(Math.random() * (mockDelayMaxMs - mockDelayMinMs + 1)) +
      mockDelayMinMs;
    //generate a mock array of photos to emulate server responce
    const mockArray: Photo[] = Array.from({ length: pageSize }, () => ({
      id: crypto.randomUUID(),
    }));
    //emulate asynchronous server responce with latency
    return of(mockArray).pipe(delay(mockDelay));
  });
}
