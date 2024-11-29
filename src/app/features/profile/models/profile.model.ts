export interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  dateAchieved: Date | null; // `null` if not yet achieved
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  achievements: Achievement[];
}
