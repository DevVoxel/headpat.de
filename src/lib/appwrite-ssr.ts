// src/lib/server/appwrite.js
import { Client, Account } from "node-appwrite";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";

// The name of your cookie that will store the session
export const SESSION_COOKIE = "my-custom-session";

// Admin client, used to create new accounts
export function createAdminClient() {
  console.log(
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  );
  console.log(process.env.APPWRITE_API_KEY);
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_API_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Set the API key here!

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Session client, used to make requests on behalf of the logged in user
export function createSessionClient(request: any) {
  console.log(
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  );
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_API_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  // Get the session cookie from the request and set the session
  const cookies = parseCookie(request.headers.get("cookie") ?? "");
  const session = cookies.get(SESSION_COOKIE);
  if (session) {
    client.setSession(session);
  }

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser(account: any) {
  try {
    return await account.get();
  } catch {}
}
