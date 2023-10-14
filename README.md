# Decentralized Exchange & ERC-20 Token



![dex](https://github.com/BianLee/Decentralized-Exchange-Model-ERC-20-Token/assets/62369269/81ef12f9-3760-482f-9f64-2cc979b7d177)


## Overview
A decentralized exchange (DEX) that allows users to trade a custom ERC-20 Token against Ethereum using MetaMask wallet. Implemented Constant Product Market formula used in Automated Market Making (AMM) systems, and deployed on Ethereum blockchain (mainnet). 

## Flow
`components/homepage.js` is the parent component, and defines the process of looking up a user input city and adding it to an array if found. The function `handleCityAdded` is passed down to the child component `CityInput`, for the child component to use it by calling `onCityAdded` (reference name of the same function at the child level). The `HomePage` has a second child component `USMap` and passes down cities array as its prop, for the child to use the data to render on screen.

Using the `useState` hook, the code keeps track of all the cities in an array strucutre. The `handleCityAdded` function adds a city to a list if the city's coordinates are found in a dataset (fetched from `data.json`). It checks if the city's latitude and longitude are not both equal to 0 and if the city is found with valid coordinates, it creates a city object with the name and coordinates and adds it to the list of cities.

```
function test() {
    const handleCityAdded = (city) => {
    if (getCityCoordinates(city)[0] != 0 && getCityCoordinates(city)[1] != 0) {
      const newCity = { name: city, coordinates: getCityCoordinates(city) };
      setCities((prevCities) => [...prevCities, newCity]);
      console.log(newCity);
    }
  };
}
```

The city coordinates are stored in the following JSON format:
```
 {
    "city": "San Francisco",
    "growth_from_2000_to_2013": "7.7%",
    "latitude": 37.7749295,
    "longitude": -122.4194155,
    "population": "837442",
    "rank": "14",
    "state": "California"
  },
```

The `getCityCoordinates` function takes a city name as input and attempts to find its latitude and longitude in the citiesData dataset, which is in JSON format. If found, it sets latitude and longitude based on the city's data. It also sets a flag, indicating a valid city was found `(setNewCityFound(true))`. It returns an array [longitude, latitude]. If the city isn't found, it returns [0, 0] as default coordinates (a condition checked in `handleCityAdded`).

```
const getCityCoordinates = (cityName) => {
    const city = citiesData.find((city) => city.city === cityName);
    
    if (city) {
      //  const { latitude, longitude } = city.coordinates;
      const latitude = city.latitude;
      const longitude = city.longitude;
      console.log(latitude);
      setNewCityFound(true);
      return [longitude, latitude];
    } else {
      return [0, 0];
    }
};
```

`usmap.js` is where the actual rendering of SVG occurs. It imports necessary libraries, including React, D3.js, and svg-pan-zoom and initializes state variables for tracking the hovered state and city. Using `useEffect` hook, it loads U.S. state data, and  a map with state outlines, and plots cities as blue circles on the map. Hovering over a state or city updates the hover state/city in the component's state. `svg-pan-zoom` allows for panning and zooming of the map, while still making sure the rendered SVG stays within the boundaries of the `<div>` box.



