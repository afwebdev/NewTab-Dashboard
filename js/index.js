document.addEventListener('DOMContentLoaded', function (event) {

    const bgGenerate = () => {
        var request = new XMLHttpRequest();
        request.open("GET", "./backgrounds.json", false)
        request.send(null);
        var my_JSON_object = JSON.parse(request.responseText)

        let bgArray = [];
        for (const val in my_JSON_object) {
            bgArray.push(my_JSON_object[val].url)
        }

        let randomBG = Math.floor(Math.random() * Math.floor(bgArray.length));
        return bgArray[randomBG];
    };

    //Gives back a random image.

    const background = document.querySelector('#bg');
    background.style.setProperty("background-image", `url("${bgGenerate()}")`);



    //Time/Date Magic.
    //Start a new interval, updating ever 1000ms (1s), run myTimer
    setInterval(function () {
        myTimer();
    }, 1000);

    function myTimer() {
        let d = new Date();
        document.getElementById("time").innerHTML = d.toLocaleTimeString([], {
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
    const getWeather = () => {
        let test;
        let weatherArray = [];
        let weatherURL = 'http://api.apixu.com/v1/current.json?key=';
        let weatherKey = "45639ca029744489ae4221129192004";
        let searchTerm = 'L7G6C8';


        //returns a response of a readable stream,
        fetch(`${weatherURL}${weatherKey}&q=${searchTerm}`)
            //read that readable stream using .json, which will deliver a promise.
            .then(response => {
                return response.json()
            })
            
            //read the promise now with another .then call, and do work.
            .then(data => {
                //Success, lets init some variables
                console.log(data)

                const curTemp = data.current.temp_c;
                const feelsLike = data.current.feelslike_c;
                const curWeatherIcon = data.current.condition.icon.substring(2);
                
                weatherArray.push({
                    current: curTemp,
                    feelsLike: feelsLike,
                    icon: curWeatherIcon
                });
                return weatherArray;

            })
            .then(weather => weather)

            .catch(error => console.log('ERROR! **** INFO! \n\n', error));
    };


    //  WHY DONT U WORK :(
    const fetchWeather = getWeather();// fetchWeather is not what I'm expecting, what am I doing wrong??
    console.dir(fetchWeather); // Returns undefined.
    console.log(getWeather())




    //  THIS TESTING STUFF WORKS, WHY DOESNT ABOVE?! GRR
    const arrObj = [];
    arrObj.push({
        test: 'test1',
        test2: 'test2'
    });

    console.log(arrObj);
    console.log(arrObj[0]); //Returns exactly what I am expecting to get from fetchWeather

});