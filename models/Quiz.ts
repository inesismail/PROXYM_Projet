import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswer: {
        type: Number,
        required: true,
      },
    },
  ],
  timeLimit: {
    type: Number, // en minutes
    default: 30,
  },
  passingScore: {
    type: Number,
    default: 70, // pourcentage minimum pour réussir
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["facile", "moyen", "difficile"],
    default: "moyen",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
<<<<<<< HEAD
=======
  score: {
    type: Number,
    default: null,
  },
  completed: {
    type: Boolean,
    default: false,
  },
>>>>>>> d887048 (second commit)
});

// Mettre à jour le champ updatedAt avant chaque sauvegarde
quizSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
