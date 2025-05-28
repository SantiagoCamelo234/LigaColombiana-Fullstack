import {Router} from 'express'
import { getMatches, addMatch, deleteMatch } from '../controllers/match.controller';


const router = Router();

router.get("/matches", getMatches)
router.post("/matches", addMatch)
router.delete("/matches", deleteMatch)

export default router;