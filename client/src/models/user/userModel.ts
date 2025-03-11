export interface UserState {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isHiring: boolean;
  isCandidate: boolean;
  experienceOfWork: Record<string, any>;
  CV: string;
}