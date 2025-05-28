import { Schema, model, Document } from "mongoose";

export interface ITeam extends Document {
    name: string;
    played_matches: number;
    points: number;
    goal_difference:number;
    won_matches: number;
    lost_matches: number;
    tie_matches: number;
}

const TeamSchema = new Schema<ITeam>({
    name: {type: String, required: true},
    played_matches: {type: Number, default: 0},
    points: {type: Number, default: 0},
    goal_difference: {type: Number, default: 0},
    won_matches: {type: Number, default: 0},
    lost_matches: {type: Number, default: 0},
    tie_matches: {type: Number, default: 0}

}) 

export const TeamModel = model<ITeam>('Team', TeamSchema)