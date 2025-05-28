import {Router} from 'express'
import { getTeams, createNewTeam } from '../controllers/team.controller';


const router = Router();

router.get("/teams", getTeams);
router.post("/teams", createNewTeam);

export default router;