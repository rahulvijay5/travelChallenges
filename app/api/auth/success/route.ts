import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("User data not found");
    }

    const {
      email,
      given_name,
      family_name,
      picture,
      id,
    }: {
      email: string | null;
      given_name: string | null;
      family_name: string | null;
      picture: string | null;
      id: string;
    } = user;

    const { username, city, preferences, challengeTypes } = await req.json();

    const dp =
      picture ||
      `https://api.dicebear.com/9.x/adventurer-neutral/png?seed=${given_name}`;

    const userData = {
      externalId: id,
      username,
      city,
      given_name: given_name ?? undefined,
      email: email!,
      family_name: family_name ?? undefined,
      profilePicture: dp,
      preferences,
      challengeTypes,
    };

    if (await db.user.findUnique({ where: { externalId: id } })) {
      await db.user.update({
        where: { externalId: id },
        data: userData,
      });
    } else {
      await db.user.create({
        data: userData,
      });
    }

    return NextResponse.json({ message: "User created/updated successfully" });
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return NextResponse.json(
      { error: "Error creating or updating user" },
      { status: 500 }
    );
  }
};
