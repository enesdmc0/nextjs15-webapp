import { Comment as PrismaComment, User } from "@prisma/client";

export interface CommentWithUser extends PrismaComment {
  user: {
    name: string;
    image: string;
  };
}

export interface Question {
    id: number
    text: string;
    option1: string;
    option2: string;
    category: string;
}


export interface Comment {
    id: number
    text: string;
    createdAt: string;
    updatedAt: string;
    userId: 1,
    questionId: 2
}

export interface TotalAnswers {
    length: number;
    option1Length: number;
    option2Length: number;
  }