import { UserRole } from "../enums";

export interface CurrentUser {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}
