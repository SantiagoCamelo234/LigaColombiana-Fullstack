import { TeamModel } from "../models/TeamModel";
import { Team } from "../domain/Team";
export async function findTeam(teamName: string) {
    try{
        const team = await TeamModel.findOne({name: teamName} )
        if(!team) return false
        return new Team(team.name, team.played_matches, team.points, team.goal_difference, team.won_matches, team.lost_matches, team.tie_matches)
    }catch (error) {
        console.error("Error al buscar el equipo:", error);
        throw new Error("Error al buscar el equipo");
    }
    
}

