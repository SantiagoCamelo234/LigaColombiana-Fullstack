import { Request, Response, NextFunction } from "express"
import { TeamModel } from "../models/TeamModel";
import { Team } from "../domain/Team";
import { orderTeamsList } from "../utils/orderTeams";
import { findTeam } from "../utils/findTeam";

export const getTeams = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const teamsModel = await TeamModel.find();
        const teams = teamsModel.map(team => new Team(team.name, team.played_matches, team.points, team.goal_difference, team.won_matches, team.lost_matches, team.tie_matches)) 
        const orderTeams = orderTeamsList(teams)
        return res.status(201).json(orderTeams);
    }catch(error){
        res.status(404).json({
            message: "Teams not found"
        })
    }
    
}

export const createNewTeam = async(req: Request, res: Response, next: NextFunction): Promise<any>  => {
    try{
        const body = req.body;
        const existTeam = await findTeam(body.name);
        if(existTeam) return res.json({Message: "Equipo ya existe"})
        const createNewTeam = await TeamModel.create(body);
        const newTeam = new Team(createNewTeam.name, createNewTeam.played_matches, createNewTeam.points, createNewTeam.goal_difference, createNewTeam.won_matches, createNewTeam.lost_matches, createNewTeam.tie_matches)
        res.status(201).json(newTeam)
    }catch(error){
        console.log(error)
    }
    
}

