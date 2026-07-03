import { environment } from 'src/environments/environments';

export function buildPhotoUrl(
  id: string,
  width: number,
  height: number,
): string {
  const { baseUrl } = environment.photoApi;
  return `${baseUrl}/seed/${id}/${width}/${height}`;
}

export function buildThumbnailUrl(id: string): string {
  const { thumbnailWidth, thumbnailHeight } = environment.photoApi;
  return buildPhotoUrl(id, thumbnailWidth, thumbnailHeight);
}

export function buildFullSizeUrl(id: string): string {
  const { fullWidth, fullHeight } = environment.photoApi;
  return buildPhotoUrl(id, fullWidth, fullHeight);
}
