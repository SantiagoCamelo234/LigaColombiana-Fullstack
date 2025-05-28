import { Team } from "../domain/Team";
import { TeamModel } from "../models/TeamModel";

export class LeagueService {
    private teams: Team[] = []
    async loadTeams(){
        const rawTeams = await TeamModel.find();
        rawTeams.forEach(team => {
            const newTeam = new Team(team.name, team.played_matches, team.points, team.goal_difference, team.won_matches, team.lost_matches, team.tie_matches)
            teams.push(newTeam)
            
        });
    }
}
