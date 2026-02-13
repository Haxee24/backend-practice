import { Router } from "express";
import {createTweet, getTweets } from '../controllers/tweet.controller.js';
import jwtAuthMiddleware from "../middleware/jwtAuth.middleware.js";

const router = new Router();

router.post('/createTweet', jwtAuthMiddleware, createTweet);
router.get('/trending', getTweets);

export default router;