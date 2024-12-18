import { NextApiRequest, NextApiResponse } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { searchUserByExternalId } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userExists = await searchUserByExternalId(user.id);
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(userExists);
}
