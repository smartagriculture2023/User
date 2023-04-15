let weather = {
    apiKey: "653e6f7d25316504975a746ea7dfb9c6",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".citys").innerText = "Weather in " + name;
      document.querySelector(".icons").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".descriptions").innerText = description;
      document.querySelector(".temps").innerText = temp + "°C";
      localStorage.setItem("tems",temp);
      document.querySelector(".humiditys").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".winds").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      // document.body.style.backgroundImage =
      //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(localStorage.getItem("loc"));
    },
  };
  
  document.addEventListener("load", function () {
    weather.search();
  });
  
  // document
  //   .querySelector(".search-bar")
  //   .addEventListener("keyup", function (event) {
  //     if (event.key == "Enter") {
  //       weather.search();
  //     }
  //   });
  
  weather.fetchWeather(localStorage.getItem("loc"));