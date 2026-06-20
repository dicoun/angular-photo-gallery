import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import { Photo } from 'src/app/core/models/photo.model';

describe('GalleryService', () => {
  let service: GalleryService;
  let allPhotos: Photo[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleryService],
    });
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate certain photos', fakeAsync(() => {
    service.mockPhotos$.subscribe((photos) => {
      allPhotos = photos;
    });
    tick(300);
    expect(allPhotos.length).toBe(9);

    const firstPhoto = allPhotos[0];
    expect(firstPhoto.id).toBeTruthy();
    expect(firstPhoto.url).toContain('https://picsum.photos/id');
  }));

  it('should be delay befor emit photos', fakeAsync(() => {
    let isEmited = false;
    service.mockPhotos$.subscribe(() => {
      isEmited = true;
    });
    tick(150);
    expect(isEmited).toBeFalse();

    tick(150);
    expect(isEmited).toBeTrue();
  }));
});
