/* eslint-disable no-useless-computed-key */

import axios, {Axios} from "axios";
import applyCaseConverter from "axios-case-converter";


function createClient(): Axios {
  const client = axios.create({
    baseURL: process.env.REDMINE_URL ?? "",
    timeout: 5000,
    headers: {
      ["X-Redmine-API-Key"]: process.env.REDMINE_KEY ?? ""
    }
  });
  const enhancedClient = applyCaseConverter(client);
  return enhancedClient;
}

export const client = createClient();