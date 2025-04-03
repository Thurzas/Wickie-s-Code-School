import type { RequestHandler } from "express";

// Import access to data
import commentSolutionRepository from "./commentSolutionRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all course
    const course = await commentSolutionRepository.readAll();

    // Respond with the course in JSON format
    res.json(course);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseBySolution: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all course
    const courseId = Number(req.params.id);
    if (Number.isNaN(courseId)) {
      res.sendStatus(404);
    }
    const course = await commentSolutionRepository.readBySolution(courseId);

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
    console.info(req.params.id);
    const course = await commentSolutionRepository.read(courseId);

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
    const newComment = {
      id: req.body.id,
      text_comment_solution: req.body.comment,
      id_user: Number(req.body.id_user),
      id_user_target: Number(req.body.id_user_target),
      id_solution: Number(req.body.id_solution),
      isValidated: Boolean(req.body.isValidated),
    };
    const affectedRows = await commentSolutionRepository.update(newComment);
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
    console.info(req.body);
    const newSolution = {
      id_user: Number(req.body.id_user),
      id_user_target: Number(req.body.id_user_target),
      id_solution: Number(req.body.id_solution),
      text_comment_solution: req.body.text_comment_solution,
      isValidated: Boolean(req.body.isValidated),
    };

    console.info(newSolution);
    // Create the course
    const insertId = await commentSolutionRepository.create(newSolution);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted course
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, browseBySolution, edit };
