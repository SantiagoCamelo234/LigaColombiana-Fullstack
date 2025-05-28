import { findTeam } from "../utils/findTeam"
import { Team } from "./Team";
import { MatchModel } from "../models/MatchModel";
export class Match{
    constructor(private local_team: string, private away_team: string, private local_team_result: number, private away_team_result: number, private date: Date){}

    async createTeams(): Promise<any>{
        const local_team = await findTeam(this.local_team)
        const away_team = await findTeam(this.away_team)
        if ( !local_team || !away_team) return "Equipos no existen"
        if(this.local_team_result === this.away_team_result)
            this.tieResult(local_team, away_team);
        else if(this.local_team_result > this.away_team_result)
            this.localTeamVictory(local_team, away_team);
        else if(this.local_team_result < this.away_team_result)
            this.awayTeamVictory(local_team, away_team);

        const saveMatches = await MatchModel.create({
            local_team: this.local_team,
            away_team: this.away_team,
            local_team_result: this.local_team_result,
            away_team_result: this.away_team_result,
            date: this.date
        })

        return "Partido creado exitosamente"
    }

    tieResult(local_team: Team, away_team: Team): void{
        local_team.tie()
        away_team.tie()
    }
    localTeamVictory(local_team: Team, away_team: Team): void{
        let diff: number = this.local_team_result - this.away_team_result 
        local_team.win(diff)
        away_team.lose(diff)
    }
    awayTeamVictory(local_team: Team, away_team: Team): void{
        let diff: number = this.away_team_result - this.local_team_result;
        away_team.win(diff);
        local_team.lose(diff);
    }

}