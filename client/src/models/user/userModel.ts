export interface UserState {
  fullName: string;
  email: string;
  password: string;
  isAgree: boolean;
  experienceOfWork: Record<string, any>;
  isCandidate: boolean;
  CV: string;
}