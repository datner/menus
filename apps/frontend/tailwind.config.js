const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'pages/**/!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, 'components/**/!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, 'admin/**/!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../../libs/ui/**/!(*.stories|*.spec).{ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
