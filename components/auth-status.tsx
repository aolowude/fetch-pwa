import { getServerSession } from "next-auth/next";
import SignOut from "components/sign-out";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div className=" w-full flex justify-center items-center">
      {session && <SignOut />}
    </div>
  );
}
