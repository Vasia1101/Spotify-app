module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost:3000',
      'amazonaws.com',
      'res.cloudinary.com',
      'links.papareact.com',
      'i.scdn.co',
      'mosaic.scdn.co',
      'newjams-images.scdn.co',
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2628000,
  },
}
