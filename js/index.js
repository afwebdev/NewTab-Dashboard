document.addEventListener('DOMContentLoaded', function (event) {

      const bgGenerate = () => {
         var request = new XMLHttpRequest();
         request.open("GET", "./backgrounds.json", false);
         request.send(null);
         var jsonObject = JSON.parse(request.responseText);
 
         let bgArray = [];
         for (const val in jsonObject) {
             bgArray.push(jsonObject[val].url);
         }
 
         let randomBG = Math.floor(Math.random() * Math.floor(bgArray.length));
         return bgArray[randomBG];
     };
 
     //Gives back a random image.
 
     const background = document.querySelector('#bg');
     background.style.setProperty("background-image", `url("${bgGenerate()}")`);
 
 
 
     //Time/Date Magic.
     //Start a new interval, updating every 1000ms (1s), run
     setInterval(function () {
         refreshClock();
     }, 1000);
 
     function refreshClock() {
         let d = new Date();
         document.getElementById("time").innerText = d.toLocaleTimeString([], {
             hour: '2-digit',
             minute: '2-digit'
         });
     }
 
     var dateOptions = {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'
     };
 
     const dateTime = new Date();
     const date = document.getElementById('date');
     date.innerText = dateTime.toLocaleDateString('en-US', dateOptions);
 
 
 
     //  Weather

      
     //used as a callback to getWeather function. 
     //This function will be used to write to the DOM.
     const writeWeather = (data) => {
        //Do DOM Stuff here
        let newData = data[0];

        let current = newData.current;
        let feelsLike = newData.feelsLike;
        let icon = newData.icon;
        let iconHTML = `<img src="http://${icon}" alt="weatherIcon">`

        document.getElementById('temp').innerText = `${current} °c`;
        document.getElementById('feelsLike').innerText = `${feelsLike} °c`;
        document.getElementById('weatherImg').innerHTML = iconHTML;

    };

     const getWeather = (callback) => {
 
         const weatherArray = [];
         const weatherURL = 'http://api.apixu.com/v1/current.json?key=';
         const weatherKey = "45639ca029744489ae4221129192004";
         const searchTerm = 'Georgetown Canada';
 
         //returns a response of a readable stream,
         return fetch(`${weatherURL}${weatherKey}&q=${searchTerm}`)
             //read that readable stream using .json, which will deliver a promise.
             .then(response => response.json())
             //read the promise now with another .then call, and do work.
             .then(data => {
                 //Success, lets init some variables
                 const curTemp = data.current.temp_c;
                 const feelsLike = data.current.feelslike_c;
                 const curWeatherIcon = data.current.condition.icon.substring(2);
 
                 weatherArray.push({
                     current: curTemp,
                     feelsLike: feelsLike,
                     icon: curWeatherIcon
                 });
                 
                 callback(weatherArray); 
             })
             .catch(error => console.log('ERROR! **** INFO! \n\n', error));
 
     };
 
    getWeather(writeWeather);
     
     
 });