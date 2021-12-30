const locations = require('../dist/cloudflare-edge-locations.json');

class CloudFlareEdgeLocations {
  constructor() {}

  getLocationCount () {
    return Object.getOwnPropertyNames(locations).length;
  }

  getLocations () {
    return locations;
  }

  lookup (code) {
    if (locations.hasOwnProperty(code.toUpperCase())) {
      return locations[code.toUpperCase()];
    } else {
      return false;
    }
  }
}

module.exports = CloudFlareEdgeLocations;
