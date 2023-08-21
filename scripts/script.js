var cityInput = document.getElementById("searchCity");

var backgroundsList = [
  "day1.jpg",
  "day2.jpg",
  "day3.jpg",
  "day4.jpg",
  "day5.jpg",
  "cloudy1.jpg",
  "cloudy2.jpg",
  "cloudy3.jpg",
  "cloudy4.jpg",
  "cloudy5.jpg",
  
];

var randomBackground = backgroundsList[Math.floor(Math.random() * backgroundsList.length)];

document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)) , url('media/" + randomBackground + "')";

cityInput.addEventListener("keyup", function(event)
{
  if(event.key === "Enter")
  {
		loader();
		function loader()
		{

			document.getElementById("locationName").innerHTML = "";
			document.getElementById("temperatureValue").innerHTML = "";
			document.getElementById("weatherType").innerHTML = "";

			const img1 = document.createElement("img");
			const img2 = document.createElement("img");
			const img3 = document.createElement("img");

			img1.id = "loader1";
			img2.id = "loader2";
			img3.id = "loader3";

			img1.src = "icons/loader.gif";
			img2.src = "icons/loader.gif";
			img3.src = "icons/loader.gif";

			const parentElement1 = document.getElementById("locationName");
			const parentElement2 = document.getElementById("temperatureValue");
			const parentElement3 = document.getElementById("weatherType");

			parentElement1.appendChild(img1);
			parentElement2.appendChild(img2);
			parentElement3.appendChild(img3);

			
		}

    var cityInputValue = cityInput.value;

    var apiKey = "b1fd6e14799699504191b6bdbcadfc35"; 
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if(cityInputValue != "")
    {
      async function getWeather()
      {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if(data.message != "city not found" && data.cod != "404")
        {
          var location = data.name;
          var temperature = data.main.temp;
          var weatherType = data.weather[0].description;
         
          var maxTemp = data.main.temp_max;
          var minTemp = data.main.temp_min;
          
        
          document.getElementById("locationName").innerHTML = location;
          document.getElementById("temperatureValue").innerHTML = temperature + "<sup>o</sup>C";
          document.getElementById("weatherType").innerHTML = weatherType;
         
          document.getElementById("maxTemperatureAdditionalValue").innerHTML = maxTemp+ "<sup>o</sup>C";
          document.getElementById("minTemperatureAdditionalValue").innerHTML = minTemp + "<sup>o</sup>C";
         
        
        }
        else
				{
					document.getElementById("locationName").innerHTML = "City Not Found";
					document.getElementById("temperatureValue").innerHTML = "";
					document.getElementById("weatherType").innerHTML = "";
				}
      }

      getWeather();
    }
    else document.getElementById("locationName").innerHTML = "Enter a city name...";
  }
});