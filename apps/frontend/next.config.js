// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'localhost'],
  },
  i18n: {
    locales: ['en-US', 'he'],
    defaultLocale: 'en-US',
  },
};

module.exports = withNx(nextConfig);
