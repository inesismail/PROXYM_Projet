"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Clock, Play } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

// Define the QuizType interface based on your data structure
interface QuizType {
  _id: string;
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  timeLimit: number;
  passingScore: number;
  category: string;
  difficulty: "facile" | "moyen" | "difficile";
  completed?: boolean; // Optional field
  score?: number; // Optional field
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
<<<<<<< HEAD
=======
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
>>>>>>> d887048 (second commit)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch quizzes from the API
  const fetchQuizzes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/quiz");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des quiz");
      }
      const data: QuizType[] = await response.json();
      console.log("API Data:", data); // Debug: Log API response
      setQuizzes(data);
    } catch (err: any) {
      console.error("Fetch Error:", err); // Debug: Log error
      setError(
        err.message || "Erreur inconnue lors de la récupération des quiz"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load quizzes on component mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Get color based on difficulty
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-800 border-green-200";
      case "moyen":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "difficile":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Start a quiz
  const startQuiz = (quiz: QuizType) => {
    if (quiz.questions?.length > 0) {
      setActiveQuiz(quiz);
      setCurrentQuestionIndex(0);
      setSelectedAnswer("");
<<<<<<< HEAD
=======
      setUserAnswers([]);
      setScore(null);
>>>>>>> d887048 (second commit)
    } else {
      setError("Ce quiz n'a pas de questions valides.");
    }
  };

  // Go to the next question
  const handleNextQuestion = () => {
<<<<<<< HEAD
    if (activeQuiz && currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else if (activeQuiz) {
      alert("Quiz terminé !");
      setActiveQuiz(null);
=======
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const selectedIndex = currentQ.options.findIndex(
      (opt) => opt === selectedAnswer
    );
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedIndex;
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(
        typeof updatedAnswers[currentQuestionIndex + 1] === "number"
          ? currentQ.options[updatedAnswers[currentQuestionIndex + 1]]
          : ""
      );
    } else {
      let correct = 0;
      activeQuiz.questions.forEach((q, idx) => {
        if (updatedAnswers[idx] === q.correctAnswer) correct++;
      });
      const result = Math.round((correct / activeQuiz.questions.length) * 100);
      setScore(result);
      // Sauvegarder le score dans la base de données
      saveQuizScore(activeQuiz._id, result);
>>>>>>> d887048 (second commit)
    }
  };

  // Go to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
<<<<<<< HEAD
      setSelectedAnswer("");
=======
      if (
        typeof userAnswers[currentQuestionIndex - 1] === "number" &&
        activeQuiz
      ) {
        setSelectedAnswer(
          activeQuiz.questions[currentQuestionIndex - 1].options[
            userAnswers[currentQuestionIndex - 1]
          ]
        );
      } else {
        setSelectedAnswer("");
      }
    }
  };

  // Fonction pour sauvegarder le score dans la base de données
  const saveQuizScore = async (quizId: string, score: number) => {
    try {
      await fetch(`/api/quiz/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
          score: score,
        }),
      });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde du score:", err);
>>>>>>> d887048 (second commit)
    }
  };

  // Loading or error states
  if (isLoading) {
    return <div className="text-center">Chargement des quiz...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Erreur : {error}</div>;
  }

  // Active quiz view
<<<<<<< HEAD
  if (activeQuiz && activeQuiz.questions?.[currentQuestionIndex]) {
=======
  if (
    activeQuiz &&
    activeQuiz.questions?.[currentQuestionIndex] &&
    score === null
  ) {
>>>>>>> d887048 (second commit)
    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeQuiz.title || "Quiz sans titre"}
            </h1>
            <p className="text-slate-600">
              Question {currentQuestionIndex + 1} of{" "}
              {activeQuiz.questions.length}
            </p>
          </div>
          <Button variant="outline" onClick={() => setActiveQuiz(null)}>
            Quitter le quiz
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {currentQuestion.question || "Question indisponible"}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="h-4 w-4" />
                <span>{activeQuiz.timeLimit - 5 || 0} min restantes</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
            >
              {(currentQuestion.options?.length > 0
                ? currentQuestion.options
                : ["Aucune option disponible"]
              ).map((option: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-slate-50"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Précédent
              </Button>
              <Button disabled={!selectedAnswer} onClick={handleNextQuestion}>
                {currentQuestionIndex === activeQuiz.questions.length - 1
                  ? "Terminer"
                  : "Suivant"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

<<<<<<< HEAD
=======
  // Affichage du score à la fin du quiz
  if (activeQuiz && score !== null) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Quiz terminé !</h1>
        <p className="text-lg">
          Votre score : <span className="font-bold">{score}%</span>
        </p>
        <Button onClick={() => setActiveQuiz(null)}>
          Retour à la liste des quiz
        </Button>
      </div>
    );
  }

>>>>>>> d887048 (second commit)
  // Quiz list view
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quizzes</h1>
        <p className="text-slate-600 mt-2">
          Testez vos connaissances et suivez votre progression
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.length > 0 ? (
          quizzes.map((quiz: QuizType) => (
            <Card key={quiz._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {quiz.title || "Quiz sans titre"}
                    </CardTitle>
                    <CardDescription>
                      {quiz.description || "Aucune description"}
                    </CardDescription>
                  </div>
                  {quiz.completed && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty || "Inconnu"}
                    </Badge>
                    {quiz.completed && (
                      <span className="text-sm font-medium text-green-600">
                        Score: {(quiz.score ?? quiz.passingScore) || 0}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{quiz.questions?.length || 0} questions</span>
                    <span>⏱️ {quiz.timeLimit || 0} min</span>
                  </div>

                  <Button
                    className="w-full"
                    variant={quiz.completed ? "outline" : "default"}
                    onClick={() => startQuiz(quiz)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {quiz.completed ? "Reprendre le quiz" : "Démarrer le quiz"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-slate-600">Aucun quiz disponible.</p>
        )}
      </div>
    </div>
  );
}
