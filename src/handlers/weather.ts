import {returnError, returnResponse} from "./return";
import {getWeather} from "../services";

export const myhandler = async () => {
  // this is my code, this is my destiny\
  try {
    const data = await getWeather('3135');

    return returnResponse(data);
  } catch (e) {
    return returnError({message: e.message})
  }
}

export const handler = myhandler;
