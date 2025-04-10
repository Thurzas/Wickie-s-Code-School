import type { RequestHandler } from "express";

// Import access to data
import courseRepository, { type Course } from "./courseRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all course
    const course = await courseRepository.readAll();

    // Respond with the course in JSON format
    res.json(course);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific course based on the provided ID
    const courseId = Number(req.params.id);
    const course = await courseRepository.read(courseId);

    // If the course is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the course in JSON format
    if (course == null) {
      res.sendStatus(404);
    } else {
      res.json(course);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  try {
    const newCourse = {
      id: Number(req.body.id),
      title: String(req.body.title),
      corpus: String(req.body.corpus),
      is_active: Boolean(req.body.is_active),
      id_category: Number(req.body.id_category),
      topic_id: Number(req.body.topic_id),
    } as Course;

    const affectedRows = await courseRepository.update(newCourse);
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the course data from the request body
    const newcourse = {
      title: req.body.title,
      corpus: req.body.corpus,
      is_active: Boolean(req.body.is_active),
      id_category: Number(req.body.id_category),
      topic_id: Number(req.body.topic_id),
    };
    // Create the course
    const insertId = await courseRepository.create(newcourse);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted course
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

/**
 * Supprime un course.
 */
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const courseId = Number(req.params.id);
    await courseRepository.delete(courseId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
