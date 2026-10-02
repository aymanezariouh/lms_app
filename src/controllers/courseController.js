import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

// 1. Lister les cours avec filtres et tri
export const getCourses = async (req, res, next) => {
  try {
    const { category, level, search, sortBy } = req.query;

    // Filtre de base : uniquement les cours publiés
    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" }; // recherche insensible à la casse
    }

    // Tri par date
    let sortOptions = { publishedAt: -1 }; // Du plus récent au plus ancien par défaut
    if (sortBy === "createdAt") {
      sortOptions = { createdAt: -1 };
    }

    const courses = await Course.find(query).sort(sortOptions);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// 2. Détail d'un cours spécifique
export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// 3. Obtenir les modules d'un cours
export const getModulesByCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Vérifier que le cours existe
    const courseExists = await Course.findById(id);
    if (!courseExists) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    const modules = await Module.find({ course: id }).sort({ order: 1 });
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

// 4. Obtenir les ressources d'un module
export const getResourcesByModule = async (req, res, next) => {
  try {
    const { moduleId } = req.params;

    // Vérifier que le module existe
    const moduleExists = await Module.findById(moduleId);
    if (!moduleExists) {
      return res.status(404).json({ message: "Module introuvable" });
    }

    const resources = await Resource.find({ module: moduleId });
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};
