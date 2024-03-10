import { getUserDataById } from "../../../../../utils/actions/user-actions";
import FrontPage from "../../../../../components/account/frontpage/main";

export const metadata = {
  title: "Account",
};

export const runtime = "edge";

export default async function AccountPage() {
  const userDataSelf = await getUserDataById(true);
  const userId = userDataSelf.$id;

  return (
    <>
      <FrontPage userDataSelf={userDataSelf} userId={userId} />
    </>
  );
}
