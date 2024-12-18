export interface Challenge {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
}
export interface CompleteChallengeType {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  place: string;
  difficultyLevel: number;
  suitableFor: string[];
  challengeType: string[];
}

export interface CompletedChallengeData {
  challengeId: string;
  imageUrl: string;
  experience: string;
  difficulty: number;
}

export interface CompletedChallenge {
  id: string;
  challengeId: string;
  image: string;
  experience: string;
  difficulty: number;
  createdAt: Date;
  user: {
    username: string;
    profilePicture: string | null;
  };
  comments: {
    id: string;
    content: string;
    createdAt: Date;
    user: {
      username: string;
      profilePicture: string | null;
    };
  }[];
}

export interface CompletedTask {
  id: string;
  userId: string;
  challengeId: string;
  image: string | null;
  experience: string;
  difficulty: number;
  createdAt: Date;
  updatedAt: Date;
  challenge: {
    title: string;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  profilePicture: string | null;
  // bio: string | null;
  city: string | null;
  createdAt: Date;
  completedTasksCount: number;
  recentCompletedTasks: {
    id: string;
    createdAt: Date;
    difficulty: number;
    challenge: {
      title: string;
    };
  }[];
}
export interface SkippedTask {
  id: string;
  userId: string;
  challengeId: string;
  createdAt: Date;
  challenge: {
    title: string;
    description: string;
    difficultyLevel: number;
    estimatedTime: number;
  };
}
