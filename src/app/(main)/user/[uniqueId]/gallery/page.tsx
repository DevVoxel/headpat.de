import Client from "./page.client";
import { getUserDataById } from "utils/actions/user-actions";

export const runtime = "edge";

export default async function FetchGallery() {
  const userDataSelf = await getUserDataById(true);

  return (
    <>
      <Client userDataSelf={userDataSelf} />
    </>
  );
}
