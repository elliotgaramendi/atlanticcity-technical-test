import { pokeApiBaseUrl } from "@atlanticcity/config";
import axios from "axios";

export const pokeApiClient = axios.create({
  baseURL: pokeApiBaseUrl
});
