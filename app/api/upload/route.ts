import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";

import User from "../../../models/User"; // Modèle User pour Mongoose
import dbConnect from "../../../lib/mongo"; // Fichier pour la connexion MongoDB
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Désactiver bodyParser pour gérer FormData
  },
};

// Répertoire pour stocker les fichiers uploadés
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Créer le répertoire s'il n'existe pas
async function ensureUploadDir(): Promise<NextResponse | void> {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (err: any) {
    console.error(
      "Erreur lors de la création du répertoire uploads:",
      err.message
    );
    return NextResponse.json(
      { message: "Erreur serveur: impossible de créer le répertoire uploads" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Récupérer les données du FormData
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;
    const email = formData.get("email") as string | null;

    if (!file || !email) {
      return NextResponse.json(
        { message: "Fichier ou email manquant" },
        { status: 400 }
      );
    }

    // Valider le type de fichier (PDF uniquement)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { message: "Seuls les fichiers PDF sont autorisés" },
        { status: 400 }
      );
    }

    // Valider la taille du fichier (5 Mo max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Le fichier ne doit pas dépasser 5 Mo" },
        { status: 400 }
      );
    }

    // Vérifier la création du répertoire
    const dirError = await ensureUploadDir();
    if (dirError) return dirError;

    // Générer un nom de fichier unique et sécurisé
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9\-_]/g, "_");
    const timestamp = Date.now();
    const fileName = `cv-${timestamp}-${sanitizedEmail}.pdf`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Sauvegarder le fichier
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
    } catch (writeErr: any) {
      console.error("Erreur lors de l'écriture du fichier:", writeErr.message);
      return NextResponse.json(
        { message: "Erreur serveur: échec de la sauvegarde du fichier" },
        { status: 500 }
      );
    }

    // Générer l'URL publique du fichier
    const fileUrl = `/uploads/${fileName}`;

    // Connexion à la base de données
    await dbConnect();

    // Mettre à jour l'utilisateur avec l'URL du CV
    const user = await User.findOneAndUpdate(
      { email },
      { cvUrl: fileUrl },
      { new: true } // Retourne le document mis à jour
    );

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Retourner la réponse au frontend
    return NextResponse.json({
      message: "CV uploadé et enregistré avec succès",
      url: fileUrl,
    });
  } catch (error: any) {
    console.error("Erreur POST /api/upload:", error.message);
    return NextResponse.json(
      { message: "Erreur serveur lors de l'upload" },
      { status: 500 }
    );
  }
}
