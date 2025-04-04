import type { RequestHandler } from "express";

// Import access to data
import topicRepository, { type Topic } from "./topicRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all Topics
    const topics = await topicRepository.readAll();
    // Respond with the Topics in JSON format
    res.json(topics);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific Topic based on the provided ID
    const topicId = Number(req.params.id);
    const topic = await topicRepository.read(topicId);

    // If the Topic is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Topic in JSON format
    if (topic == null) {
      res.sendStatus(404);
    } else {
      res.json(topic);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  try {
    const newTopic = {
      id: Number(req.body.id),
      name: String(req.body.name),
      image: String(req.body.image),
    } as Topic;

    const affectedRows = await topicRepository.update(newTopic);
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
    // Extract the Topic data from the request body
    const newTopic = {
      name: req.body.name,
      image: req.body.image,
    };

    // Create the Topic
    const insertId = await topicRepository.create(newTopic);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted Topic
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

/**
 * Supprime un produit.
 */
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const topicId = Number(req.params.id);
    await topicRepository.delete(topicId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
