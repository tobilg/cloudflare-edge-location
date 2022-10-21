const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const utf8 = require('utf8');
const airportOverridesData = require('./lib/airportOverrides');

// Load large airport data
const largeAirportData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'large-airports.json'), 'utf8'));
// Load all airport data
const allAirportData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'airport-codes.json'), 'utf8'));
// Load countries data
const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'country-codes.json'), 'utf8'));

const writeCSV = locations => {
  const csvPath = path.join(__dirname, 'dist', 'cloudflare-edge-locations.csv');
  const data = locations.map(e => {
    return `${getCode(e.code)},${e.city},${e.country},${e.countryCode},${e.latitude},${e.longitude}`;
  });
  // Add header
  data.unshift('code,city,country,country_code,latitude,longitude');
  fs.writeFileSync(csvPath, data.join(os.EOL), 'utf8');
}

let invalidCounter = 1;
const getCode = (airportCode) => {
  let code;
  if (airportCode) {
    code = airportCode;
  } else {
    code = `INV${invalidCounter}`;
    invalidCounter++;
  }
  return code;
}

const writeJSON = locations => {
  const jsonPath = path.join(__dirname, 'dist', 'cloudflare-edge-locations.json');
  const data = {};
  locations.forEach(location => {
    data[getCode(location.code)] = {
      city: location.city,
      country: location.country,
      countryCode: location.countryCode,
      latitude: location.latitude,
      longitude: location.longitude,
    }
  });
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

const lookupCountry = (countryCode) => {
  const foundCountry = countriesData.filter(country => country.Code === countryCode);
  if (foundCountry.length === 1) {
    return foundCountry[0].Name;
  } else {
    return '';
  }
}

const lookupAirport = (city, dataSource = largeAirportData) => {
  const matches = [];
  let match = null;
  // Search for matches
  dataSource.forEach(entry => {
    if (entry.municipality && entry.municipality.toLowerCase() === city.toLowerCase()) {
      matches.push(entry);
    }
  });
  if (matches.length > 1) { // Handle multiple matches
    const tempMatches = [];
    matches.forEach(m => {
      if (m.name.toLowerCase().indexOf('international') !== -1) {
        tempMatches.push(m);
      }
    });
    if (tempMatches.length > 0) { // Multiple matches, take first one, kind of random selection
      match = tempMatches[0];
    } else { // no "international" tempMatches, fallback to first el of unfiltered matches
      match = matches[0];
    }
  } else { // Single match
    match = matches[0];
  }
  return match;
}

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', consoleObj => console.log(consoleObj.text()));

  const response = await page.goto('https://www.cloudflare.com/network/', { waitUntil: 'networkidle2' })

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`)
  }

  const data = await page.evaluate(() => {
    const cities = [];
    //                                   //html/body/div[1]/div[1]/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div[1]/div
    const rawCities = document.evaluate('//html/body/div[1]/div[1]/div/div[1]/div[1]/div/div/div/div/div[2]/div[*]/div[*]/div/div/div/div[*]/div/div[*]/div', document);
  
    // First iterator
    let citiesIterator = rawCities.iterateNext();

    // Iterate over entries
    while (citiesIterator) {
      cities.push(citiesIterator.textContent); 
      citiesIterator = rawCities.iterateNext();
    }

    console.log(JSON.stringify(cities))

    const cleanedCities = cities.map((city) => {
      const temp = city.split(', ');
      const c = {};
      if (temp.length === 2) {
        c.city = temp[0];
        c.countryCode = temp[1];
      } else if (temp.length === 1) {
        c.city = temp[0];
      }
      c.city = c.city.replace('Frankfurt', 'Frankfurt am Main');
      c.city = c.city.replace('Chișinău', 'Chisinau');
      c.city = c.city.replace('Zürich', 'Zurich');
      c.city = c.city.replace('Luxembourg City', 'Luxembourg');
      c.city = c.city.replace('Ekaterinburg', 'Yekaterinburg');
      c.city = c.city.replace('Bhubaneshwar', 'Bhubaneswar');
      c.city = c.city.replace('Basra', 'Basrah');
      return c;
    });

    return cleanedCities;
  });

  await page.close();
  await browser.close();

  const withAirports = data.map((city) => {
    const location = {
      ...city
    };
    const airport = lookupAirport(utf8.encode(location.city));
    if (airportOverridesData.hasOwnProperty(location.city.toLowerCase())) {
      const overrideData = airportOverridesData[location.city.toLowerCase()];
      location.code = overrideData.code;
      location.countryCode = overrideData.countryCode;
      location.country = lookupCountry(overrideData.countryCode);
      location.latitude = overrideData.latitude;
      location.longitude = overrideData.longitude;
    } else if (airport) {
      location.code = airport.iata_code;
      location.countryCode = airport.iso_country;
      location.country = lookupCountry(airport.iso_country);
      const coordinate = airport.coordinates.split(', ');
      location.latitude = parseFloat(coordinate[1]);
      location.longitude = parseFloat(coordinate[0]);
    } else {
      // Run a second pass with all airports if not found before. Increases data quality
      const smallAirport = lookupAirport(utf8.encode(location.city), allAirportData);
      if (smallAirport) {
        location.code = smallAirport.iata_code;
        location.countryCode = smallAirport.iso_country;
        location.country = lookupCountry(smallAirport.iso_country);
        const coordinate = smallAirport.coordinates.split(', ');
        location.latitude = parseFloat(coordinate[1]);
        location.longitude = parseFloat(coordinate[0]);
      }
    }
    return location;
  });

  writeJSON(withAirports);

  invalidCounter = 1;

  writeCSV(withAirports);
}

run();
