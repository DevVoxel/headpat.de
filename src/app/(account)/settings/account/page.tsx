import Client from "./page.client";
import { Suspense } from "react";
import Loading from "../../../loading";
import { getUserDataById, getUserSelf } from "utils/actions/user-actions";

export const metadata = {
  title: "Account Settings",
};

export const runtime = "edge";

export default async function AccountSettings() {
  const userDataSelf = await getUserDataById();
  const userSelf = await getUserSelf();
  const userId = userDataSelf.$id;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Client
          userDataSelf={userDataSelf}
          userSelf={userSelf}
          userId={userId}
        />
      </Suspense>
    </>
  );
}
