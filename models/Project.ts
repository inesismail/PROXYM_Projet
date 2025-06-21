import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "La difficulté est requise"],
    },
    duration: {
      type: String,
      required: [true, "La durée est requise"],
    },
    technologies: {
      type: [String],
      required: [true, "Les technologies sont requises"],
    },
    objectives: {
      type: [String],
      required: [true, "Les objectifs sont requis"],
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    resources: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Vérifier si le modèle existe déjà pour éviter les erreurs de redéfinition
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
