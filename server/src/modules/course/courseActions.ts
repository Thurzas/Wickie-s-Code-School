import type { RequestHandler } from "express";

// Import access to data
import courseRepository from "./courseRepository";

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

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the course data from the request body
    console.info(req.body);
    const newcourse = {
      title: req.body.title,
      corpus: req.body.corpus,
      is_active: Number(req.body.age),
      id_category: Number(req.body.id_category),
      topic_id: Number(req.body.topic_id),
    };
    console.info(newcourse);
    // Create the course
    const insertId = await courseRepository.create(newcourse);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted course
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
