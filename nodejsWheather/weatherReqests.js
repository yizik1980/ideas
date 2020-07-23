var querystring = require("querystring");
var http = require("http");

// http://dataservice.accuweather.com/currentconditions/v1/213181?apikey=dLttwuf2Wx4wXPGtKrOFVjrjWNBBlI0e&language=he
// http://dataservice.accuweather.com/locations/v1/cities/search?apikey=dLttwuf2Wx4wXPGtKrOFVjrjWNBBlI0e&q=%D7%97%D7%99%D7%A4%D7%94&language
// http://dataservice.accuweather.com/forecasts/v1/daily/5day/213181?apikey=dLttwuf2Wx4wXPGtKrOFVjrjWNBBlI0e&language=he

const wheatherParams = {
  url: "dataservice.accuweather.com",
  production: false,
  currentCondition: "/currentconditions/v1/",
  fiveDaysUrl: "/forecasts/v1/daily/5day/",
  whetherLocation: "/locations/v1/cities/search",
  AutoCompleteService: "/locations/v1/cities/autocomplete",
  apiKeyCode: "**********",
  he: "language=he",
};
class WheatherRequests {
  options;
  queryStr;
  constructor() {}
  init() {
    this.queryStr = {
      apikey: wheatherParams.apiKeyCode,
      language: "he",
    };
    this.options = {
      host: wheatherParams.url,
      port: 80,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  sendRequest(callBack) {
    var httpReq = http.get(this.options, function (response) {
      response.setEncoding("utf8");
      response.on("data", callBack);
    });
    httpReq.end();
  }
  getLocation(callBack, qp = "") {
    this.init();
    this.queryStr.q = qp;
    const query = querystring.stringify(this.queryStr);
    this.options.path = wheatherParams.AutoCompleteService + "?" + query;
    this.sendRequest(callBack);
  }
  getCurrentWeather(callBack, keyCode = "") {
    this.init();
    const query = querystring.stringify(this.queryStr);
    this.options.path = wheatherParams.currentCondition + keyCode + "?" + query;
    this.sendRequest(callBack);
  }
  getForcastWeather(callBack, keyCode = "") {
    this.init();
    const query = querystring.stringify(this.queryStr);
    this.options.path = wheatherParams.fiveDaysUrl + keyCode + "?" + query;
    this.sendRequest(callBack);
  }
}

module.exports = WheatherRequests;
