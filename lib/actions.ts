"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getQuestions = async () => {
    try {

        const user = auth();

        if (!user) null;

        const questions = await prisma.question.findMany();
        console.log(questions, "[GET_QUESTIONS]");



    } catch (error) {
        console.log(error, "[GET_QUESTIONS_ERROR]");
    }
}