const path = require('path');

// See: https://webpack.js.org/guides/author-libraries/

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    globalObject: 'this',
    library: 'cloudFlareEdgeLocations',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'umd'),
    filename: 'cloudflare-edge-locations.min.js'
  }
};
