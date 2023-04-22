
const apiKey = "32e5a541c218a981c1667cb741124856";
const weatherInfoElm = document.querySelector('.js-weather-info');
const searchBoxElm = document.querySelector('.js-search');
const searchBtnElm = document.querySelector('.js-search-btn');
const cityElm = document.querySelector('.js-city');
const tempElm = document.querySelector('.js-temp');
const feelLike = document.querySelector('.js-feelLike');
const highLowElm = document.querySelector('.js-high-low');
const weatherImg = document.querySelector('.js-weather-img');
const invalidElm = document.querySelector('.js-invalid');
const weatherDescElm = document.querySelector('.js-weather-desc');
const additionalInfo = document.querySelector('.js-additional');
const humidityElm = document.querySelector('.js-humidity');
const windSpeedElm = document.querySelector('.js-windSpeed');
const DayNightInfo = document.querySelector('.js-sun');
const sunriseElm = document.querySelector('.js-sunrise');
const sunsetElm = document.querySelector('.js-sunset');
const visibilityElm = document.querySelector('.js-vi');
const pressureElm = document.querySelector('.js-pressure');



// Function to fetch weather data based on the ZipCode provided.
async function checkWeather(zipCode)
{
const response = await fetch("https://api.openweathermap.org/data/2.5/weather?zip="+ zipCode +",us&units=imperial&appid="+ apiKey);
let data = await response.json();
console.log(data);
     if(response.status === 200)
     { 
            invalidElm.style.display = "none";  
            weatherInfoElm.style.display = "block";
            additionalInfo.style.display = "block";
            DayNightInfo.style.display = "block";
            dateTime.innerText = `${month} ${date}, ${timeNew}`;
            cityElm.innerText =  data.name;
            tempElm.innerText = `${Math.round(data.main.temp)}°F`;
            feelLike.innerText = `Feels like ${Math.round(data.main.feels_like)}°F`;
            highLowElm.innerText = `High ${Math.round(data.main.temp_max)}°F ↑ 
              Low ${Math.round(data.main.temp_min)}°F ↓ `;
            let weatherImgTemp = data.weather[0].main;
            weatherDescElm.innerText = (data.weather[0].description).toUpperCase() ;
            let weatherCondition = determineWeather(weatherImgTemp);
            weatherImg.src = weatherCondition;
            humidityElm.innerText = `Humidity:${data.main.humidity}inHg`;
            windSpeedElm.innerText = `Visibility:${(data.visibility)/1000} mi`;
            let tempVisibility = (data.main.pressure)*0.03;
            visibilityElm.innerText = `Pressure:${Math.round(tempVisibility)} %`;
            pressureElm.innerText = `Wind Speed:${data.wind.speed} mph`;
            let sunrise = calculateSunrise(data.sys.sunrise);
            sunriseElm.innerText = `Sunrise : ${sunrise}`;
            let sunset = calculateSunrise(data.sys.sunset);
            sunsetElm.innerText = `Sunset : ${sunset}`;
            searchBoxElm.value ='';
      }
      else if(response.status === 404 || response.status ===400)
      {     console.log("invalid");
            weatherInfoElm.style.display = "none";
            additionalInfo.style.display = "none";
            DayNightInfo.style.display = "none";
            invalidElm.style.display = "block";
            searchBoxElm.value ='';
      }  
}


// Function to fetch weather data based on the city provided.
async function checkWeatherCity(city)
{
const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid="+ apiKey);
let data = await response.json();
console.log(data);
     if(response.status === 200)
     { 
            invalidElm.style.display = "none";  
            weatherInfoElm.style.display = "block";
            additionalInfo.style.display = "block";
            DayNightInfo.style.display = "block";
            dateTime.innerText = `${month} ${date}, ${timeNew}`;
            cityElm.innerText =  data.name;
            tempElm.innerText = `${Math.round(data.main.temp)}°F`;
            feelLike.innerText = `Feels like ${Math.round(data.main.feels_like)}°F`;
            highLowElm.innerText = `High ${Math.round(data.main.temp_max)}°F ↑ 
              Low ${Math.round(data.main.temp_min)}°F ↓ `;
            let weatherImgTemp = data.weather[0].main;
            weatherDescElm.innerText = (data.weather[0].description).toUpperCase() ;
            let weatherCondition = determineWeather(weatherImgTemp);
            weatherImg.src = weatherCondition;
            humidityElm.innerText = `Humidity:${data.main.humidity}inHg`;
            windSpeedElm.innerText = `Visibility:${(data.visibility)/1000} mi`;
            let tempVisibility = (data.main.pressure)*0.03;
            visibilityElm.innerText = `Pressure:${Math.round(tempVisibility)} %`;
            pressureElm.innerText = `Wind Speed:${data.wind.speed} mph`;
            let sunrise = calculateSunrise1(data.sys.sunrise);
            sunriseElm.innerText = `Sunrise : ${sunrise}`;
            let sunset = calculateSunrise1(data.sys.sunset);
            sunsetElm.innerText = `Sunset : ${sunset}`;
            searchBoxElm.value ='';
      }
      else if(response.status === 404 || response.status ===400)
      {     console.log("invalid");
            weatherInfoElm.style.display = "none";
            additionalInfo.style.display = "none";
            DayNightInfo.style.display = "none";
            invalidElm.style.display = "block";
            searchBoxElm.value ='';
      }  
}

function determineWeather(weather){
      if(weather === 'Clear'){
        return "Images/clear.png";
      } else if(weather === 'Clouds'){
        return "Images/clouds.png";
      }else if(weather === 'Drizzle'){
        return "Images/drizzle.png";
      }else if(weather ==='Thunderstorm' || weather === 'Rain'){
        return "Images/rain.png";
      }else if(weather === 'Snow'){
        return "Images/snow.png";
      }else if(weather === 'Mist'){
        return "Images/mist.png";
      }else if(weather === 'Tornado'){
        return "Images/tornado.jpg";
      }else{
        return "Images/sand.png";
  }
}


// Displaying current Date and Time.

let currentDate = new Date();
let date = currentDate.getDate();
const monthTemp = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
let month = monthTemp[currentDate.getMonth()];
//let time = currentDate.getHours() + ":" + currentDate.getMinutes();
let timeNew = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
const dateTime = document.querySelector('.js-dateTime');

dateTime.innerText = `${month} ${date}, time`;

// Calculating Sunrise and Sunset times (UTC Time)

function calculateSunrise1(input){
  let date = new Date(input*1000);
  let time = (date.toUTCString());
  let sunrise = `${date.getUTCHours()}:${date.getUTCMinutes()} Coordinated Universal Time(UTC)`;
  return time;

}

// Calculating Sunrise and Sunset times for Zipcodes (US Time)

function calculateSunrise(input){
  let date = new Date(input*1000);
  let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return time;

}





//Calling function based on the input , check whether it is zip code or city.

 searchBtnElm.addEventListener(
  'click', () => {
        let input = searchBoxElm.value;
      if (!isNaN(input)){
        checkWeather(input);
      }else {
        checkWeatherCity(input);
      }
    }
 );


