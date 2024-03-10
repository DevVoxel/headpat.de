import { getUserDataById } from "../../../../../utils/actions/user-actions";
import Socials from "../../../../../components/account/socials/main";

export const metadata = {
  title: "Socials",
};

export const runtime = "edge";

export default async function SocialSettings() {
  const userDataSelf = await getUserDataById(true);
  const userId = userDataSelf.id;

  return (
    <>
      <Socials userDataSelf={userDataSelf} userId={userId} />
    </>
  );
}
