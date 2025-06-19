import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  phone: { type: String, required: false },         // numéro téléphone
  birthDate: { type: Date, required: false },       // date de naissance

  firstName: { type: String, required: false },     // prénom
  lastName: { type: String, required: false },      // nom
  address: { type: String, required: false },       // adresse
  cvUrl: { type: String },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },     // date de création du compte
  updatedAt: { type: Date, default: Date.now },     // date de mise à jour (à mettre à jour manuellement)
});



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
