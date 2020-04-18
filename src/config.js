const dev = {
  api: {
    URL: ''
  },
  country: {
    api: `https://restcountries.eu/rest/v2/name`
  },
  WEATHER_STOCK: {
    key: '7cbd566edb997cac3e402bd865e620e0',
    api: `http://api.weatherstack.com/current?access_key=7cbd566edb997cac3e402bd865e620e0`
  }
};

const prod = {
  api: {
    URL: ''
  }
};

let config;
switch (process.env.REACT_APP_STAGE) {
  case 'dev':
    config = dev;
    break;
  case 'prod':
    config = prod;
    break;
  default:
    config = dev;
    break;
}

export default {
  ...config
};
