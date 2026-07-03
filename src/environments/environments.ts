export const environment = {
  production: false,
  photoApi: {
    baseUrl: 'https://picsum.photos',
    //  for gallery component
    thumbnailWidth: 200,
    thumbnailHeight: 300,
    // for photo component
    fullWidth: 1200,
    fullHeight: 800,
  },
  gallery: {
    pageSize: 9, // how many photos per one request
    mockDelayMinMs: 200, // min delay mock API
    mockDelayMaxMs: 300, // max delay mock API
  },
};
