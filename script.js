const search_icon = document.querySelector('.search-icon')
const search_input = document.getElementById('search-input');
const weather_img = document.getElementById('weather-img');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const show_error = document.getElementById('show_error');
const weather = document.getElementById('weather');
const weatherIcon = document.querySelector(".weather-icon");

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "a6e663644f242e52a7d032c1656f2499";

async function getWeather(city) {
      try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (response.status === 404) {
                  show_error.style.display = "block";
                  weather.style.display = "none";
                  return;
              }
              const data = await response.json();

              city.innerText = data.name;
              temp.innerText = Math.round(data.main.temp) + "°C";
              humidity.innerText = data.main.humidity;
              wind.innerText = data.wind.speed + " Km/Hrs";
      
              if(data.weather[0].main === "Clear"){
                  weather_img.src = '/public/sun.png';
                  document.body.style.backgroundColor = '#f98306';
              }
              else if(data.weather[0].main === "Clouds"){
                  weather_img.src = '/public/clouds.png';
                  document.body.style.backgroundColor = '#49e119';
              }
              else if(data.weather[0].main === "Rain"){
                  weather_img.src = '/public/rain.png'; 
                  document.body.style.backgroundColor = '#49e119';
              }
              else if(data.weather[0].main === "Drizzle"){
                  weather_img.src = '/public/drizzle.png';
                  document.body.style.backgroundColor = '#9d0df5';
              }
              else if(data.weather[0].main === "Mist"){
                  weather_img.src = '/public/mist.png';
                  document.body.style.backgroundColor = '#9d0df5';
            }
            show_error.style.display = "none";
            weather.style.display = "block";
      }
      catch(error){
            console.error("Error fetching weather data:", error);
          alert("An error occurred while fetching the weather data. Please try again.");
      }

}

search_icon.addEventListener('click', ()=>{
      const city = search_input.value.trim();
      if(city === ''){
            alert("Please enter city name");
            return
      }
      getWeather(city);    
})
search_input.addEventListener('keypress', (event)=>{
if(event.key == 'Enter'){
    const city = search_input.value.trim();
    if(city === ''){
          alert("Please enter city name");
          return
    }
    getWeather(city); 
}
})