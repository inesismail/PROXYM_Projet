"use client";

import { useEffect, useState } from "react";

export default function ProfilPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null); // Accepter null
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Récupérer l'email depuis localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      setError(
        "Aucun email trouvé. Veuillez vous connecter ou définir un email."
      );
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Veuillez sélectionner un fichier PDF.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !userEmail) {
      setError("Fichier ou email manquant.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("cv", selectedFile);
    formData.append("email", userEmail);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadedUrl(data.url);
        alert("✅ CV uploadé avec succès !");
      } else {
        setError(data.message || "Erreur lors de l'upload.");
      }
    } catch {
      setError("Erreur réseau pendant l'upload.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitial = (email: string) => email.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-50 flex flex-col items-center pt-8 px-4 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="flex items-center mb-8">
          {userEmail && (
            <div
              className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center text-3xl font-bold mr-6"
              aria-label={`Avatar pour ${userEmail}`}
            >
              {getInitial(userEmail)}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600">{userEmail || "Email non défini"}</p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-100 text-red-700 p-3 rounded mb-4"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-gray-700 bg-gray-100 p-3 rounded mb-4 flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              />
            </svg>
            Chargement...
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="cv-upload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sélectionner un CV (PDF uniquement)
          </label>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:bg-blue-100 file:text-blue-700 file:font-semibold hover:file:bg-blue-200 disabled:opacity-50"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={isLoading || !selectedFile || !userEmail} // Ajout de !userEmail dans disabled
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          aria-label={isLoading ? "Envoi en cours" : "Uploader le CV"}
        >
          {isLoading ? "Envoi..." : "Uploader le CV"}
        </button>

        {uploadedUrl && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <p className="font-medium text-gray-700">CV uploadé :</p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
              aria-label="Voir le CV uploadé"
            >
              Voir le CV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
