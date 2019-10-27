
function buildQueryURL() {
  var queryParams = $("#search-term").val();
  console.log("queryParams: " + queryParams);
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + queryParams + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function buildQueryURL5day() {
  var queryParams = $("#search-term").val();
  console.log("queryParams: " + queryParams);
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + queryParams + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";
  console.log(queryURL);
  return queryURL;
}

function clear() {
  $("#article-section").empty();
}

function updateCurrentWeather(currentweatherdata) {

  // Log the Current Weather Data to console, where it will show up as an object
  console.log(currentweatherdata);
  console.log("----------------Current Weather--------------------");

    // Create the  list group to contain the articles and add the article content for each
    var $printTop0 = $("<div>");
    var $printTop1 = $("<div>");
    var $printTop2 = $("<div>");
    var $printTop3 = $("<div>");
    //$printTop.addClass("list-group");

    // Add the newly created element to the DOM
    $("#top").append($printTop0);
    $("#top").append($printTop1);
    $("#top").append($printTop2);
    $("#top").append($printTop3);

    // Add data to the elements
    $printTop0.append(currentweatherdata.name);
    $printTop1.append(currentweatherdata.main.temp);
    $printTop2.append(currentweatherdata.main.humidity);
    $printTop3.append(currentweatherdata.wind.speed);
    console.log("in update function" + currentweatherdata.main.temp);

}

function update5Day(data) {

  // Log the Current Weather Data to console, where it will show up as an object
  console.log(data);
  console.log("----------------5 Day--------------------");
  
  for (var i = 1; i <= 5; i++) {
    var $printrow0 = $("<div>");
    var $printrow1 = $("<div>");
    var $printrow2 = $("<div>");
    var $printrow3 = $("<img>");

   var iconid = data.list[i].weather[i].icon;
    // console.log("iconid "+data.list[i].weather[i].icon);
    // var iconurl = "http://openweathermap.org/img/wn/"+data.list[i].weather[i].icon+"@2x.png";
    $printrow3.attr("src","http://openweathermap.org/img/wn/"+iconid+"@2x.png");
    
    $("#bottom").append($printrow0);
    $("#bottom").append($printrow1);
    $("#bottom").append($printrow2);
    $("#bottom").append($printrow3);

    $printrow0.append("day "+i+" Date "+data.list[i].dt_txt);
    $printrow1.append("day "+i+" temp "+data.list[i].main.temp);
    $printrow2.append("day "+i+" humidity "+data.list[i].main.humidity);
  
    
  }

}


// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  //clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  var queryURL5day = buildQueryURL5day();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updateCurrentWeather);

  $.ajax({
    url: queryURL5day,
    method: "GET"
  }).then(update5Day);


});

//  .on("click") function associated with the clear button
//$("#clear-all").on("click", clear);

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function (response) {
//   var temp = response.main.temp;
//   var row = $("")
//   var printleft = $("#left");
//   printleft.append(temp);

//   console.log(response);
//   console.log("Temperature " + response.main.temp);
//   console.log("Humidity " + response.main.humidity);
//   console.log("Wind Speed " + response.wind.speed);
//   console.log("Icon " + response.weather[0].icon);
//   console.log(response.coord.lon);
//   console.log(response.coord.lat);
// });

// var queryURL5day = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=694e9301cf58974cd061591a93c6ebf3";

// $.ajax({
//   url: queryURL5day,
//   method: "GET"
// }).then(function (response) {

//   console.log(response.list[0].weather[0].icon);
//   console.log(response.list[0].main.temp);
//   console.log(response.list[0].main.humidity);
// });