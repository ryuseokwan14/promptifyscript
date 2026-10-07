export interface LoginInput {
  identifier: string;
  password: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetCreatorInput {
  email?: string;
  newPassword: string;
}

export interface AuthSession {
  identifier: string;
  role: "SUPERADMIN" | "CREATOR";
}
