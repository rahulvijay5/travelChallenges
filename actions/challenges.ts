"use server";

import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { searchUserByExternalId } from "./user";
import {
  Challenge,
  CompleteChallengeType,
  CompletedChallenge,
  CompletedChallengeData,
} from "@/lib/types";

interface ChallengeData {
  title: string;
  description: string;
  estimatedTime: string;
  difficultyLevel: number;
  place: string;
  suitableFor: string[];
  challengeType: string[];
}

export async function createChallenge(data: ChallengeData) {
  try {
    const challenge = await db.challenge.create({
      data: {
        title: data.title,
        description: data.description,
        estimatedTime: parseInt(data.estimatedTime),
        difficultyLevel: data.difficultyLevel,
        place: data.place,
        suitableFor: data.suitableFor,
        challengeType: data.challengeType,
      },
    });
    return { success: true, challenge };
  } catch (error) {
    console.error("Failed to create challenge:", error);
    return { success: false, error: "Failed to create challenge" };
  }
}

export async function getRandomChallenge() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get the count of challenges
  const challengeCount = await db.challenge.count({
    where: {
      NOT: {
        completedTasks: {
          some: {
            userId: user.id,
          },
        },
      },
    },
  });

  // If there are no challenges, return null
  if (challengeCount === 0) {
    return null;
  }

  // Generate a random skip value
  const randomSkip = Math.floor(Math.random() * challengeCount);

  // Fetch a random challenge
  const challenge = await db.challenge.findFirst({
    where: {
      NOT: {
        completedTasks: {
          some: {
            userId: user.id,
          },
        },
      },
    },
    skip: randomSkip,
  });

  return challenge;
}

export async function skipChallenge(challengeId: string) {
  const { getUser } = getKindeServerSession();
  const Kindeuser = await getUser();
  const user = await searchUserByExternalId(Kindeuser.id);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const userRecord = await db.user.findUnique({
    where: { id: user.id },
    select: { skipCount: true, lastSkipDate: true },
  });

  if (!userRecord) {
    throw new Error("User not found");
  }

  if (userRecord.lastSkipDate && userRecord.lastSkipDate > oneMonthAgo) {
    if (userRecord.skipCount >= 1) {
      return {
        success: false,
        message: "You've already used your skip for this month.",
      };
    }
  } else {
    // Reset skip count if it's been more than a month
    await db.user.update({
      where: { id: user.id },
      data: { skipCount: 0 },
    });
  }

  // Increment skip count and update last skip date
  await db.user.update({
    where: { id: user.id },
    data: {
      skipCount: { increment: 1 },
      lastSkipDate: new Date(),
    },
  });

  revalidatePath("/challenge");
  return { success: true };
}

export async function markChallengeCompleted(
  challengeId: string,
  experience: string,
  imageurl: string,
  difficulty: number
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    await db.completedTask.create({
      data: {
        userId: user.id,
        image: imageurl,
        challengeId: challengeId,
        experience: experience,
        difficulty: difficulty,
      },
    });

    await db.userCurrentChallenge.delete({
      where: { userId: user.id },
    });

    revalidatePath("/challenge");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit completed challenge:", error);
    return { success: false, message: "Failed to submit completed challenge" };
  }
}

// New function to get the current challenge for a user
export async function getCurrentChallenge() {
  const { getUser } = getKindeServerSession();
  const Kindeuser = await getUser();
  const user = await searchUserByExternalId(Kindeuser.id);
  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentChallenge = await db.userCurrentChallenge.findUnique({
    where: { userId: user.id },
    include: { challenge: true },
  });

  return currentChallenge?.challenge || null;
}

// New function to set the current challenge for a user
export async function setCurrentChallenge(challengeId: string) {
  const { getUser } = getKindeServerSession();
  const Kindeuser = await getUser();
  const user = await searchUserByExternalId(Kindeuser.id);
  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.userCurrentChallenge.upsert({
    where: { userId: user.id },
    update: { challengeId: challengeId },
    create: { userId: user.id, challengeId: challengeId },
  });

  revalidatePath("/challenge");
}

export async function getServerUser() {
  const { getUser } = getKindeServerSession();
  const Kindeuser = await getUser();
  const user = await searchUserByExternalId(Kindeuser.id);
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user;
}

export async function submitCompletedChallenge(data: CompletedChallengeData) {
  const user = await getServerUser();
  try {
    await db.completedTask.create({
      data: {
        userId: user.id,
        challengeId: data.challengeId,
        image: data.imageUrl,
        experience: data.experience,
        difficulty: data.difficulty,
      },
    });

    // Remove the current challenge for the user
    await db.userCurrentChallenge.delete({
      where: { userId: user.id },
    });

    revalidatePath("/challenge");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit completed challenge:", error);
    return { success: false, message: "Failed to submit completed challenge" };
  }
}

// interface CompletedChallengeData {
//   challengeId: string;
//   imageName: string;
//   experience: string;
//   difficulty: number;
// }

// export async function submitCompletedChallenge(data: CompletedChallengeData) {
//   const user = await getorcreateuser();

//   try {
//     await db.completedTask.create({
//       data: {
//         userId: user.id,
//         challengeId: data.challengeId,
//         image: data.imageName,
//         experience: data.experience,
//         difficulty: data.difficulty,
//       },
//     });

//     // Remove the current challenge for the user
//     await db.userCurrentChallenge.delete({
//       where: { userId: user.id },
//     });

//     revalidatePath("/challenge");
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to submit completed challenge:", error);
//     return { success: false, message: "Failed to submit completed challenge" };
//   }
// }

export async function getCompletedChallenges(
  challengeId: string
): Promise<CompletedChallenge[]> {
  const completedChallenges = await db.completedTask.findMany({
    where: { challengeId },
    select: {
      id: true,
      challengeId: true,
      image: true,
      experience: true,
      difficulty: true,
      createdAt: true,
      user: {
        select: {
          username: true,
          profilePicture: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return completedChallenges as CompletedChallenge[];
}

export async function getChallenge(
  challengeId: string
): Promise<CompleteChallengeType> {
  const Challenge = await db.challenge.findUnique({
    where: { id: challengeId },
  });

  return Challenge as CompleteChallengeType;
}

export async function submitComment(completedTaskId: string, content: string) {
  const user = await getServerUser();

  try {
    await db.comment.create({
      data: {
        userId: user.id,
        completedTaskId,
        content,
      },
    });

    revalidatePath(`/challenge/completed/${completedTaskId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to submit comment:", error);
    return { success: false, message: "Failed to submit comment" };
  }
}

export async function getCompletedTasksForUser() {
  const user = await getServerUser();

  const completedTasks = await db.completedTask.findMany({
    where: { userId: user.id },
    include: {
      challenge: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return completedTasks;
}

// export async function getSkippedTasksForUser(): Promise<SkippedTask[]> {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     throw new Error("User not authenticated");
//   }

//   const skippedTasks = await db.skippedTask.findMany({
//     where: { userId: user.id },
//     include: {
//       challenge: {
//         select: {
//           title: true,
//           description: true,
//           difficultyLevel: true,
//           estimatedTime: true,
//         },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   });

//   return skippedTasks;
// }
