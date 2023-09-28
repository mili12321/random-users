export type InitUser = {
  name: string;
  email: string;
  picture: string;
};

export interface User extends InitUser {
  id: string;
}
