let geoApiKey = "";
let weatherApiKey = "";

export const setGeoApiKey = (key) => {
    geoApiKey = key;
};

export const setWeatherApiKey = (key) => {
    weatherApiKey = key;
};

export const geoApiOptions = () => ({
    method: "GET",
    headers: {
        "X-RapidAPI-Key": geoApiKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
});

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";