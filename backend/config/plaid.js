import { config } from "../config/config.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments[config.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": config.PLAID_CLIENT_ID,
      "PLAID-SECRET": config.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

export const client = new PlaidApi(configuration);
