import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongo";
import Quiz from "../../../models/Quiz";

// GET /api/quiz - Récupérer tous les quiz
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const quizzes = await Quiz.find({});
    return NextResponse.json(quizzes);
  } catch (error: any) {
    console.error("Erreur GET /api/quiz:", error.message);
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des quiz" },
      { status: 500 }
    );
  }
}

// POST /api/quiz - Créer un nouveau quiz
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbConnect();

    const quiz = await Quiz.create(body);
    return NextResponse.json(quiz, { status: 201 });
  } catch (error: any) {
    console.error("Erreur POST /api/quiz:", error.message);
    return NextResponse.json(
      { message: "Erreur serveur lors de la création du quiz" },
      { status: 500 }
    );
  }
}
