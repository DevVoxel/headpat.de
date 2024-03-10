import {
  Client,
  Databases,
  Account,
  Functions,
  Storage,
  Teams,
} from "node-appwrite";

export const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_API_URL}/v1`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)
  .setKey(process.env.APPWRITE_API_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

export { ID } from "appwrite";
