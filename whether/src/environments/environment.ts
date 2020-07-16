// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// http://dataservice.accuweather.com/currentconditions/v1/213181?apikey=dLttwuf2Wx4wXPGtKrOFVjrjWNBBlI0e&language=he
// http://dataservice.accuweather.com/locations/v1/cities/search?apikey=dLttwuf2Wx4wXPGtKrOFVjrjWNBBlI0e&q=%D7%97%D7%99%D7%A4%D7%94&language
export const environment = {
  url: 'http://dataservice.accuweather.com',
  production: false,
  whetherUrl: '/forecasts/v1/daily/5day/',
  whetherLocation: '/locations/v1/cities/search?q=',
  AutoCompleteService: '/locations/v1/cities/autocomplete?language=he&q=',
  apiKeyCode: 'apikey=OmxkJGEwNHNmANC0KoXQKHGz18vffwgJ'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
