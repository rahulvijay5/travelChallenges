import { db } from "@/lib/db";
import { getServerUser } from "./challenges";
import { UserProfile } from "@/lib/types";

export const searchUserByExternalId = async (kindeId: string) => {
  try {
    console.log("KindeID: ", kindeId);
    const user = await db.user.findUnique({
      where: {
        externalId: kindeId,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error searching for user:", error);
    throw error;
  }
};

export async function updateUserSettings(data: {
  username: string;
  // bio?: string;
  email: string;
  // notifications: boolean;
}) {
  const user = await getServerUser();

  await db.user.update({
    where: { id: user.id },
    data: {
      username: data.username,
      // bio: data.bio,
      email: data.email,
      // notificationsEnabled: data.notifications,
    },
  });
}

export async function getUserProfile(): Promise<UserProfile> {
  const user = await getServerUser();

  const userWithProfile = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      username: true,
      email: true,
      profilePicture: true,
      // bio: true,
      city: true,
      createdAt: true,
      completedTasks: {
        select: {
          id: true,
          createdAt: true,
          difficulty: true,
          challenge: {
            select: {
              title: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 6,
      },
    },
  });

  if (!userWithProfile) {
    throw new Error("User profile not found");
  }

  return {
    ...userWithProfile,
    completedTasksCount: await db.completedTask.count({
      where: { userId: user.id },
    }),
    recentCompletedTasks: userWithProfile.completedTasks,
  };
}
