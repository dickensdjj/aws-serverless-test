import { getWeatherFromAPI, inputValidator, weatherFormatter} from "../../../services";
import { client } from "../../../utils/httpFactory";
import resetAllMocks = jest.resetAllMocks;

jest.mock("../../../utils/httpFactory", () => ({
  client: {
    get: jest.fn()
  }
}))


describe('Weather API', () => {
  beforeEach(() => {
    resetAllMocks()
  })

  const testPayload = {
    "coord": {
      "lon": 150.8667,
      "lat": -33.7167
    },
    "weather": [{
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }],
    "base": "stations",
    "main": {
      "temp": 290.27,
      "feels_like": 290.23,
      "temp_min": 288.57,
      "temp_max": 291.11,
      "pressure": 1028,
      "humidity": 84
    },
    "visibility": 10000,
    "wind": {
      "speed": 3.09,
      "deg": 210
    },
    "clouds": {
      "all": 88
    },
    "dt": 1653353485,
    "sys": {
      "type": 2,
      "id": 2004875,
      "country": "AU",
      "sunrise": 1653338846,
      "sunset": 1653375571
    },
    "timezone": 36000,
    "id": 0,
    "name": "Schofields",
    "cod": 200
  }
  const testFormattedPayload = {
    "lon": 150.8667,
    "lat": -33.7167,
    "main": "Clouds",
    "description": "overcast clouds",
    "temp": 290.27,
    "feels_like": 290.23,
    "temp_min": 288.57,
    "temp_max": 291.11,
    "pressure": 1028,
    "humidity": 84
  }

  describe('inputValidator', () => {
    it('should return false if the postcode is not 4 digit', () => {
      const result = inputValidator('12345');
      expect(result).toBe(false);
    })

    it('should return true if the postcode is formatted correctly', () => {
      const result = inputValidator('3000');
      expect(result).toBe(true);
    })
  })

  describe('result formatter', () => {
    it('should return correct format', () => {
      expect(weatherFormatter(testPayload)).toEqual(testFormattedPayload);
    })
  })

  describe('get weather from API', () => {
    it('should return data if client response is 200', async () => {
      (client.get as jest.Mock).mockResolvedValue({statusCode: 200, data: {test: 123}})
      const result = await getWeatherFromAPI('3000')
      expect(result).toEqual({test: 123});
    })

    it('should return empty if client response is not 200', async () => {
      (client.get as jest.Mock).mockResolvedValue({statusCode: 400, data: {test: 123}})
      const result = await getWeatherFromAPI('3000')
      expect(result).toEqual({});
    })
  })
})
