"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getQuestions = async () => {
    try {
        const user = auth();

        if (!user) null;

        const questions = await prisma.question.findMany();
        return questions;



    } catch (error) {
        console.log(error, "[GET_QUESTIONS_ERROR]");
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
    }

}