export type Posts = {
  _id?: string;
  username: string;
  email?: string;
  bio?: string;
  postId?: number;
  userId?: number;
  isLiked?: boolean;
  likes: number;
};
