import { Schema, model, Document } from "mongoose";

export interface IMatch extends Document {
    local_team: string;
    away_team: string;
    local_team_result: number;
    away_team_result: number;
    date: Date
}

const MatchSchema = new Schema<IMatch>({
    local_team: {type: String, required: true},
    away_team: {type: String, required: true},
    local_team_result: {type: Number, default: 0},
    away_team_result: {type: Number, default: 0},
    date: {type: Date, required: true}
    
}) 

export const MatchModel = model<IMatch>('Match', MatchSchema)