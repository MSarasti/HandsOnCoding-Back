"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const solutions_1 = require("../../services/solutions");
const router = express_1.default.Router();
exports.SolutionsRouter = router;
/**
 * @swagger
 * components:
 *  schemas:
 *    Solution:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The autogenerated id of the solution.
 *        name:
 *          type: string
 *          description: The file name.
 *        content:
 *          type: string
 *          description: The content of the file.
 *        updatedAt:
 *          type: string
 *          description: The last time the file was updated.
 *        stepId:
 *          type: string
 *          description: The id of the existing step that uses this solution.
 *      required:
 *        - name
 *        - content
 *        - stepId
 *      examples:
 *        id: 63158ff83cd164cc4fda4282
 *        name: main.py
 *        content: print(\"Hello world!\")
 *        updateAt: 2022-09-04T07:18:20.250Z
 *        stepId: 63158ff83cd164cc4fda4281
 *  parameters:
 *    solutionId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: The solution id.
 *
 * tags:
 *  name: Solutions
 *  description: Solutions endpoint.
 */
// GET
/**
 * @swagger
 * /solutions:
 *  get:
 *    summary: Get all solutions.
 *    tags: [Solutions]
 *    responses:
 *      200:
 *        description: All the solutions.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Solution'
 *      400:
 *        description: An error occurred due to a bad request.
 */
router.route("/").get((req, res) => {
    (0, solutions_1.getSolutions)()
        .then((v) => {
        res.status(200);
        res.send(v);
    })
        .catch((e) => {
        res.sendStatus(400); // SHOULD BE 404 NOT FOUND
    });
});
/**
 * @swagger
 * /solutions/{id}:
 *  get:
 *    summary: Get a solution by id.
 *    tags: [Solutions]
 *    parameters:
 *      - $ref: '#/components/parameters/solutionId'
 *    responses:
 *      200:
 *        description: The solution.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Solution'
 *      400:
 *        description: An error occurred due to a bad request.
 */
router.route("/:id").get((req, res) => {
    (0, solutions_1.getSolution)(req.params.id)
        .then((v) => {
        res.status(200);
        res.send(v);
    })
        .catch((e) => {
        res.sendStatus(400); // SHOULD BE 404 NOT FOUND
    });
});
// POST
/**
 * @swagger
 * /solutions:
 *  post:
 *    summary: Create a solution.
 *    tags: [Solutions]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Solution'
 *    responses:
 *      200:
 *        description: The created solution.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Solution'
 *      400:
 *        description: An error occurred due to a bad request.
 */
router.route("/").post((req, res) => {
    (0, solutions_1.createSolution)(req.body)
        .then((v) => {
        res.status(201);
        res.send(v);
    })
        .catch((e) => {
        res.sendStatus(400);
    });
});
// PUT
/**
 * @swagger
 * /solutions/{id}:
 *  put:
 *    summary: Update a solution by id.
 *    tags: [Solutions]
 *    parameters:
 *      - $ref: '#/components/parameters/solutionId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Solution'
 *    responses:
 *      200:
 *        description: The updated solution.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Solution'
 *      400:
 *        description: An error occurred due to a bad request.
 */
router.route("/:id").put((req, res) => {
    (0, solutions_1.updateSolution)(req.params.id, req.body)
        .then((v) => {
        res.status(200);
        res.send(v);
    })
        .catch((e) => {
        res.sendStatus(400); // OR 404 NOT FOUND
    });
});
// DELETE
/**
 * @swagger
 * /solutions/{id}:
 *  delete:
 *    summary: Delete a solution by id.
 *    tags: [Solutions]
 *    parameters:
 *      - $ref: '#/components/parameters/solutionId'
 *    responses:
 *      200:
 *        description: The deleted solution.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Solution'
 *      400:
 *        description: An error occurred due to a bad request.
 */
router.route("/:id").delete((req, res) => {
    (0, solutions_1.deleteSolution)(req.params.id)
        .then((v) => {
        res.status(204);
        res.send(v);
    })
        .catch((e) => {
        res.sendStatus(400); // [OR/SHOULD BE](?) 404 NOT FOUND
    });
});
//# sourceMappingURL=solutions.js.map