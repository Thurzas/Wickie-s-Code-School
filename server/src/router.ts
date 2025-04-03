import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import userActions from "./modules/users/userActions";

router.get("/api/users/", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/add", userActions.add);

import solutionActions from "./modules/solution/solutionActions";

router.get("/api/solutions", solutionActions.browse);
router.get("/api/solutions/course/:id", solutionActions.browseByCourse);

import commentSolution from "./modules/commentSolution/commentSolutionActions";
router.get(
  "/api/commentSolutions/solution/:id",
  commentSolution.browseBySolution,
);
router.get("/api/commentSolutions/:id", commentSolution.read);
router.post("/api/commentSolutions/:id", commentSolution.edit);

import courseActions from "./modules/course/courseActions";
router.get("/api/courses/", courseActions.browse);
router.get("/api/courses/:id", courseActions.read);
router.post("/api/courses/:id", courseActions.edit);
router.post("/api/courses/add/", courseActions.add);
/* ************************************************************************* */

export default router;
