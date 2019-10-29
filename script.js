
function buildQueryURL() {
  var queryParams = $("#search-term").val();
  console.log("queryParams: " + queryParams);
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryParams + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function buildQueryURL2(city) {
  var queryParams = city;
  console.log("queryParams: " + queryParams);
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryParams + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function buildQueryURL5day() {
  var queryParams = $("#search-term").val();
  console.log("queryParams: " + queryParams);
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryParams + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function buildQueryURL5day2(city) {
  var queryParams = city;
  console.log("queryParams: " + queryParams);
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryParams + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function buildQueryURLUV(lat, lon) {
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function updateCurrentWeather(currentweatherdata) {

  // Log the Current Weather Data to console, where it will show up as an object
  console.log(currentweatherdata);
  console.log("----------------Current Weather--------------------");

  // Add data to the elements
  $("#city").html("<h2>" + currentweatherdata.name + " " + moment().format('L') + "</h2>");
  $("#weather").html(currentweatherdata.weather.main);
  $("#temp").html(currentweatherdata.main.temp + " °F");
  $("#humidity").html(currentweatherdata.main.humidity + " %");
  $("#wind").html(currentweatherdata.wind.speed + " MPH");
  
  var lat = currentweatherdata.coord.lat;
  var lon = currentweatherdata.coord.lon;
  var queryURLUV = buildQueryURLUV(lat, lon);
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the update5Day function
  $.ajax({
    url: queryURLUV,
    method: "GET"
  }).then(updateUV);

}

function updateUV(uvdata) {

  // Log the Current Weather Data to console, where it will show up as an object
  console.log(uvdata);
  console.log("----------------Current UV--------------------");

  // Add data to the elements
  $("#uv").html(uvdata.value);


}

function update5Day(data) {

  // Log the Current Weather Data to console, where it will show up as an object
  console.log(data);
  console.log("----------------5 Day--------------------");

    $(".fiveDay").empty();

    for (var i = 1; i <= 5; i++) {
      var date = moment().add(i + 1, 'days').format("M/D/YYYY");

      $("<div>", {

        html: "<h6>" + date + "</h6>" + "<br>" +
          "Temp : " + data.list[i].main.temp + " °F" + "<br>" +
          "Humidity : " + data.list[i].main.humidity + " %",

        id: "fiveBox",
        appendTo: ".fiveDay"
      });
    }

  //}
}


// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  //Grab Search Data
  var searchVal = $("#search-term").val();
  // Empty the region associated with the articles
  //clear();
  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  var queryURL5day = buildQueryURL5day();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updateCurrentWeather function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updateCurrentWeather);
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the update5Day function
  $.ajax({
    url: queryURL5day,
    method: "GET"
  }).then(update5Day);

  //APPEND CLICKED SEARCHES BELOW
  $("<button class='searchbutton'>" + searchVal + "</button>").appendTo(".searches");
  $("<br>").appendTo(".searches");

  //get value of search history button clicked and build new query and call functions again
  $(".searchbutton").on("click", function (event) {
    var buttoncity = $(this).text();
    var queryURL2 = buildQueryURL2(buttoncity);
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(updateCurrentWeather);
    var queryURL5day2 = buildQueryURL5day2(buttoncity);
    $.ajax({
      url: queryURL5day2,
      method: "GET"
    }).then(update5Day);
  })

});



