import { client } from "../utils/httpFactory";
import {apiConfig} from "../config/apiConfig";

export const getWeather = async (payload: any): Promise<any> => {
  const validInput = inputValidator(payload);

  if (!validInput) {
    throw Error('incorrect input')
  }

  const data = await getWeatherFromAPI(payload)
  return weatherFormatter(data)
};

export const weatherFormatter = (data) => {
  return Object.keys(data).length === 0 ? {} : {
    "lon": data.coord.lon,
    "lat": data.coord.lat,
    "main": data.weather[0].main,
    "description": data?.weather[0].description,
    "temp": data.main.temp,
    "feels_like": data.main.feels_like,
    "temp_min": data.main.temp_min,
    "temp_max": data.main.temp_max,
    "pressure": data.main.pressure,
    "humidity": data.main.humidity
  }
}

export const getWeatherFromAPI = async (postcode) => {
  const zip = [postcode, 'au'].join(',')
  const { apiKey } = apiConfig;
  const result = await client.get('/weather', {'zip': zip, 'apiId': apiKey})
  if (result.statusCode !== 200) {
    return {}
  }

  return result.data
}

export const inputValidator = (payload): boolean => {
  const postcodeRegex = /^(0[289][0-9]{2})$|^([1-9][0-9]{3})$/;
  return postcodeRegex.test(payload)
}
