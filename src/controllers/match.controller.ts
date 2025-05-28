import { Request, Response, NextFunction } from "express"
import { MatchModel } from "../models/MatchModel"
import { Match } from "../domain/Match";
import {faker} from "@faker-js/faker"
import { TeamModel } from "../models/TeamModel";
import { generateRandomDate } from "../utils/randomDate";
import dayjs from "dayjs";
export const getMatches = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const matchesModel = await MatchModel.find();
        const matches = matchesModel.map(match => new Match(match.local_team, match.away_team, match.local_team_result, match.away_team_result, match.date)) 
        res.status(200).json(matches);
    }catch(error){
        res.status(404).json({
            message: "Matches not found"
        })
    }
    
}

export const addMatch = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {local_team, away_team, local_team_result,away_team_result} = req.body;
        const date: Date =  new Date(generateRandomDate('2024-01-01', '2025-12-31'));
        const matchObject = new Match(local_team, away_team, local_team_result, away_team_result, date)
        const result = await matchObject.createTeams();

        if(result === "Equipos no existen") return res.status(400).json({message: result})
        return res.status(201).json({message: "Partido registrado correctamente"})
    }catch(error){
        res.status(404).json({
            message: "Could not create a match"
        })
    }

}

export const deleteMatch = async(req: Request, res: Response): Promise<any> => {
    try{
        const deletedMatches = await MatchModel.deleteMany()
        const deletedTeams = await TeamModel.deleteMany()
        return res.status(200).json({
            message: "Season restarted"
        })
    }catch(error){
        res.status(500).json({
            message: "Season could not be restarted"
        })
    }
}