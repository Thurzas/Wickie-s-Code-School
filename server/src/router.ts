import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);


import userActions from "./modules/users/userActions";

router.get("/api/users/", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/add", userActions.add);

import solutionActions from "./modules/solution/solutionActions";

router.get("/api/solutions", solutionActions.browse);
router.get("/api/solutions/course/:id",solutionActions.browseByCourse);
/* ************************************************************************* */

export default router;
