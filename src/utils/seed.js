import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "../models/Course.module.js";
import Module from "../models/Module.module.js";
import Resource from "../models/Resource.module.js";

const seedData = async () => {
  try {
    // Connexion à la base de données
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connecté à MongoDB pour le seed...");

    // Nettoyer les collections existantes
    await Course.deleteMany();
    await Module.deleteMany();
    await Resource.deleteMany();
    console.log("Anciennes données purgées.");

    // 1. Création des cours réalistes
    const course1 = await Course.create({
      title: "Développement Backend avec Node.js & Express",
      description:
        "Apprenez à concevoir des APIs REST scalables et sécurisées de A à Z.",
      category: "Backend",
      level: "intermediate",
      instructorName: "Marc Dupont",
      isPublished: true,
      publishedAt: new Date(),
    });

    const course2 = await Course.create({
      title: "Fondamentaux de MongoDB et Mongoose",
      description:
        "Maîtrisez la modélisation NoSQL, les index et les requêtes Mongoose avancées.",
      category: "Database",
      level: "beginner",
      instructorName: "Sarah Alami",
      isPublished: true,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hier
    });

    const course3 = await Course.create({
      title: "Architecture Logicielle & Docker pour Développeurs",
      description: "Conteneurisation, microservices et déploiement moderne.",
      category: "DevOps",
      level: "advanced",
      instructorName: "Marc Dupont",
      isPublished: false, // Brouillon non publié
      publishedAt: new Date(),
    });

    // 2. Création des modules pour le cours Node.js
    const module1 = await Module.create({
      title: "Architecture REST et Configuration Express",
      description: "Mise en place de l'environnement, middlewares et routage.",
      order: 1,
      course: course1._id,
    });

    const module2 = await Module.create({
      title: "Gestion des Erreurs et Validation des Données",
      description: "Gestion centralisée des statuts HTTP et schémas Mongoose.",
      order: 2,
      course: course1._id,
    });

    // 3. Création des ressources pour le Module 1
    await Resource.create([
      {
        title: "Introduction aux architectures RESTful",
        type: "video",
        url: "https://example.com/videos/intro-rest.mp4",
        duration: 18,
        module: module1._id,
      },
      {
        title: "Guide de démarrage rapide Express.js",
        type: "pdf",
        url: "https://example.com/docs/express-guide.pdf",
        duration: 10,
        module: module1._id,
      },
      {
        title: "Documentation officielle Express",
        type: "link",
        url: "https://expressjs.com/",
        module: module1._id,
      },
    ]);

    console.log(" Seed exécuté avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur pendant le seed :", error);
    process.exit(1);
  }
};

seedData();
