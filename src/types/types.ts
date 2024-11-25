import { Conversation } from "../hooks/useGetAllConversation";

export type UserType = {
  uid: number | string;
  email: string;
  username: string;
  bio: string;
  profilePicUrl: string;
  conversations: [];
  createdAt: Date;
  onlineStatus: boolean;
  password: string;
};

export interface User {
  uid: number | string;
  email: string;
  username: string;
  profilePicUrl: string;
  createdAt: Date;
  onlineStatus: boolean;
  password: string;
  item: Conversation;
}
