# LMS Backend API - Sprint 1 (Catalogue de Cours)

Première base technique de la plateforme d'apprentissage LMS. Ce brief se concentre sur l'architecture backend initiale, la modélisation des entités principales du catalogue (`Course`, `Module`, `Resource`), la gestion des erreurs, et la mise à disposition d'une API REST de consultation documentée.

> **Note sur le périmètre (Sprint 1) :** Conformément au cahier des charges, ce sprint n'inclut pas d'authentification réelle (JWT/bcrypt) ni la gestion complète des utilisateurs (`User`, `Enrollment`, `Quiz`). Le catalogue est exposé en consultation publique. Les fonctionnalités d'administration/formateur seront sécurisées lors des prochains sprints.

---

## Stack Technique

- **Runtime :** Node.js (ES Modules)
- **Framework :** Express.js
- **Base de données :** MongoDB avec Mongoose ODM
- **Conteneurisation :** Docker & Docker Compose
- **Documentation API :** Swagger UI / OpenAPI 3.0

---

## Structure du Projet

```text
lms_app/
├── docs/
│   └── swagger.yaml          # Spécification OpenAPI / Swagger
├── src/
│   ├── config/
│   │   └── db.js             # Connexion MongoDB Mongoose
│   ├── controllers/
│   │   └── courseController.js # Logique métier catalogue (filtres, tri, détails)
│   ├── middlewares/
│   │   └── errorMiddleware.js  # Gestion centralisée 404 (notFound) et 500 (errorHandler)
│   ├── models/
│   │   ├── Course.js         # Modèle des cours
│   │   ├── Module.js         # Modèle des modules ordonnés
│   │   └── Resource.js       # Modèle des ressources de cours (vidéo, pdf, etc.)
│   ├── routes/
│   │   └── courseRoutes.js   # Définition des endpoints REST
│   ├── utils/
│   │   └── seed.js           # Peuplement de la base avec données réalistes
│   ├── app.js                # Configuration Express et middlewares
│   └── server.js             # Point d'entrée et écoute réseau
├── .env.example              # Modèle des variables d'environnement
├── docker-compose.yml        # Service MongoDB conteneurisé
├── package.json
└── README.md
```
