export const environment = {
  production: true,
  photoApi: {
    baseUrl: 'https://picsum.photos',
    thumbnailWidth: 200,
    thumbnailHeight: 300,
    fullWidth: 1200,
    fullHeight: 800,
  },
  gallery: {
    pageSize: 9,
    mockDelayMinMs: 0, // remove the delay in production
    mockDelayMaxMs: 0, // remove the delay in production
  },
};
