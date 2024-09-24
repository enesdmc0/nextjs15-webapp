"use server"

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Answer, Comment, Question } from "@prisma/client";

export const getQuestions = async (category: string): Promise<Question[]> => {

    try {
        return await prisma.question.findMany({
            where: category === "all" ? {} : { category }
        });

    } catch (error: any) {
        console.log(error, "[GET_QUESTIONS_ERROR]");
        return []

    }
}

export const getComments = async (questionId: number): Promise<Comment[]> => {
    try {
        
        if (!questionId) {
            console.log("Question ID not found", "[GET_COMMENTS_ERROR]");
            return [];
        }

        const comments = await prisma.comment.findMany({
            where: {
                questionId
            }
        });
        return comments;

    } catch (error: any) {
        console.log(error, "[GET_COMMENTS_ERROR]");
        return []
    }
}

export const getAnswers = async (): Promise<Answer[]> => {
    try {
        const current = await currentUser();
        if (!current) {
            console.log("Current User not found", "[GET_ANSWERS_ERROR]");
            return [];
        }

        const user = await prisma.user.findUnique({
            where: {
                email: current.emailAddresses[0].emailAddress
            }
        });

        if (!user || !user.id) {
            console.log("Supabase User not found", "[GET_ANSWERS_ERROR]");
            return [];
        }

        return await prisma.answer.findMany({
            where: {
                userId: user.id
            }
        });
    } catch (error: any) {
        console.log(error, "[GET_ANSWERS_ERROR]");
        return [];
    }
}

export const createQuestion = async (previousState: unknown, formData: FormData) => {
    const question = formData.get("question");
    const option1 = formData.get("option1");
    const option2 = formData.get("option2");
    const category = formData.get("category");

    if (!question || !option1 || !option2 || !category) {
        return { message: "Please fill all fields", status: "error" }
    }

    try {

        const current = await currentUser();
        if (!current) {
            return { message: "Current User not found", status: "error" }
        }

        const user = await prisma.user.findUnique({
            where: {
                email: current?.emailAddresses[0]?.emailAddress
            }
        });

        if (!user || !user.id) {
            return { message: "Supabase User not found", status: "error" }
        }

        const createdQuestion = await prisma.question.create({
            data: {
                text: question.toString(),
                option1: option1.toString(),
                option2: option2.toString(),
                category: category.toString(),
                userId: user?.id
            }
        });

        return { message: "Question created", status: "success", question: createdQuestion };

    } catch (error: any) {
        console.log(error, "[CREATE_QUESTION_ERROR]");
        return { status: "error", message: error.message };
    } finally {
        revalidatePath("/");
    }

}

export const createComment = async (previousState: unknown, formData: FormData) => {
    const comment = formData.get("comment") as string;
    const questionId = formData.get("questionId") as string;


    if (!comment) {
        return { message: "Please fill comment field ", status: "error" }
    }

    try {

        const current = await currentUser();
        if (!current) {
            return { message: "Current User not found", status: "error" }
        }

        const user = await prisma.user.findUnique({
            where: {
                email: current?.emailAddresses[0]?.emailAddress
            }
        });

        if (!user || !user.id) {
            return { message: "Supabase User not found", status: "error" }
        }

        const createdQuestion = await prisma.comment.create({
            data: {
                text: comment,
                userId: user?.id,
                questionId: parseInt(questionId)
            }
        });

        return { message: "Question created", status: "success", question: createdQuestion };

    } catch (error: any) {
        console.log(error, "[CREATE_QUESTION_ERROR]");
        return { status: "error", message: error.message };
    } finally {
        revalidatePath("/");
    }

}

export const createAnswer = async (previousState: unknown, formData: FormData) => {
    const option = formData.get("option");
    const questionId = formData.get("questionId");

    if (!option || !questionId) {
        return { message: "Please fill all fields", status: "error" }
    }

    try {

        const current = await currentUser();
        if (!current) {
            return { message: "Current User not found", status: "error" }
        }

        const user = await prisma.user.findUnique({
            where: {
                email: current?.emailAddresses[0]?.emailAddress
            }
        });

        if (!user || !user.id) {
            return { message: "Supabase User not found", status: "error" }
        }


        const userAnswer = await checkUserQuestionAnswerUnique(user?.id, Number(questionId));

        if (userAnswer) {
            return { message: "You already answered this question", status: "error" }
        }

        const createdAnswer = await prisma.answer.create({
            data: {
                option: Number(option),
                questionId: Number(questionId),
                userId: user?.id
            }
        });

        return { message: "Answer created", status: "success", answer: createdAnswer };

    } catch (error: any) {
        console.log(error, "[CREATE_ANSWER_ERROR]");
        return { status: "error", message: error.message };
    } finally {
        revalidatePath("/");
    }

}
export const checkUserQuestionAnswerUnique = async (userId: number, questionId: number) => {
    const userAnswer = await prisma.answer.findFirst({
        where: {
            userId,
            questionId
        }
    });

    return userAnswer;
}

