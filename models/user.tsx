// interfaces/index.ts
export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  groups: string[];  // Assuming groups are represented by their IDs or names
  friends: string[]; // Assuming friends are represented by their IDs or names
}
