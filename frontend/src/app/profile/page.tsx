import { getServerSession } from "next-auth";
import { FC } from "react";

const Profile: FC<{}> = async () => {
  const session = await getServerSession();
  return (
    <>
      <p>need login to view this</p>
      <p>{JSON.stringify(session)}</p>
    </>
  );
}

export default Profile;