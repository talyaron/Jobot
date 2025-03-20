export interface headerButton{
    label : string,
    path : string
}

export const navButtons: headerButton[] = [
    { label: "התחברות", path: "/login" },
    { label: "הרשמה", path: "/register" },
  ];