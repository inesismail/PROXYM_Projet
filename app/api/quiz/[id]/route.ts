import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongo";
import Quiz from "../../../../models/Quiz";

<<<<<<< HEAD

=======
>>>>>>> d887048 (second commit)
// GET /api/quiz/[id] - Récupérer un quiz spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const quiz = await Quiz.findById(params.id);

    if (!quiz) {
      return NextResponse.json({ message: "Quiz non trouvé" }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error: any) {
    console.error("Erreur GET /api/quiz/[id]:", error.message);
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération du quiz" },
      { status: 500 }
    );
  }
}

// PUT /api/quiz/[id] - Mettre à jour un quiz
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await dbConnect();

    const quiz = await Quiz.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return NextResponse.json({ message: "Quiz non trouvé" }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error: any) {
    console.error("Erreur PUT /api/quiz/[id]:", error.message);
    return NextResponse.json(
      { message: "Erreur serveur lors de la mise à jour du quiz" },
      { status: 500 }
    );
  }
}

// DELETE /api/quiz/[id] - Supprimer un quiz
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const quiz = await Quiz.findByIdAndDelete(params.id);

    if (!quiz) {
      return NextResponse.json({ message: "Quiz non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quiz supprimé avec succès" });
  } catch (error: any) {
    console.error("Erreur DELETE /api/quiz/[id]:", error.message);
    return NextResponse.json(
      { message: "Erreur serveur lors de la suppression du quiz" },
      { status: 500 }
    );
  }
}
