export interface Achievement {
  achievementId: number;
  title: string;
  description: string;
  dateAchieved: Date | null;
}

export interface UserProfile {
  userId: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  achievements: Achievement[];
}
