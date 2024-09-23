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