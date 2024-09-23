"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getQuestions = async (category: string) => {
    console.log(category, "[GET_QUESTIONS]");
    try {
        const user = auth();

        if (!user) null;

        const questions = await prisma.question.findMany({
            where: category === "all" ? {} : { category }
        });
        return questions;



    } catch (error) {
        console.log(error, "[GET_QUESTIONS_ERROR]");
    }
}

export const getComments = async (questionId: number | null) => {
    try {
        const user = auth();

        if (!user) null;

        if (!questionId) {
            return { message: "Question ID not found", status: "error" }
        }

        const comments = await prisma.comment.findMany({
            where: {
                questionId
            }
        });
        return comments;



    } catch (error) {
        console.log(error, "[GET_COMMENTS_ERROR]");
        
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

    } catch (error) {
        console.log(error, "[CREATE_QUESTION_ERROR]");
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

    } catch (error) {
        console.log(error, "[CREATE_QUESTION_ERROR]");
    } finally {
        revalidatePath("/");
    }

}