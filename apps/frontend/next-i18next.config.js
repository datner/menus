const { join } = require('path');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
module.exports = {
  i18n: {
    locales: ['en', 'he', 'he-IL'],
    defaultLocale: 'en',
    localePath: join(__dirname, 'public/locales'),
  },
};
