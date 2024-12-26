export interface ResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
}

export interface ForgotPasswordRequest {
  email: string;
}
