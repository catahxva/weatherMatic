# WeatherMatic 

WeatherMatic is a personal project, more precisely a weather web app which can be used to search for different locations around the world and visualize weather related data about that certain location. 

## Key features 

- Usage of a Third Party API: using the One Call API 3.0 of OpenWeather for getting reliable data
- Implementation of the Geolocation Web API: you can allow the web app to access your current location via the Geolocation Web API to see the current weather data
- Searching Functionality: you can search for any location (cities, towns etc) around the globe and select locations to visualize data
- Recent Searches: every time you search for a location using the search bar inside the web app your query is going to be saved inside the local storage and your latest 5 queries are going to be displayed back to you  
- Data Visualization: once you allow the web app to access your location or once you manually select a location you can visualize weather related data like the current temperature, the humidity, the wind speeds and a 24 hour forecast and a 8 day forecast
- Bookmarks: you can bookmark locations for faster access at any time

## Technologies Used

- HTML5
- SCSS
- JavaScript
 
## Architecture

Implemented the MVC architecture where I have used a model to manage the business logic of the application, multiple views to build up the user interface and a controller to create a bridge in between the model and the views

## Demo 

Live version on Netlify: https://weathermatic.netlify.app/
