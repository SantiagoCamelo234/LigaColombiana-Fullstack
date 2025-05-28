import { TeamModel } from "../models/TeamModel";
export class Team {
    constructor(
        private _name: string,
        private played_matches: number = 0,
        private _points: number = 0,
        private _goal_difference: number = 0,
        private won_matches: number = 0,
        private lost_matches: number = 0,
        private tie_matches: number = 0,
    ){}

    private played_match(): void{
        this.played_matches += 1;
    }

    async win(diff: number){
        try{
            const team = await TeamModel.findOne({
                name: this._name
            })
            if(!team) throw new Error("Equipo no encontrado")
            this.played_match()
            team.played_matches = this.played_matches;
            team.points = this._points +=3;
            team.won_matches = this.won_matches += 1;
            team.goal_difference = this._goal_difference += diff
            await team.save();  
        }catch (error) {
            console.error("Error al registrar la victoria:", error);
            throw new Error("Error al registrar la victoria");
        }
        
    }
    async tie(){
        try{
            const team = await TeamModel.findOne({
                name: this._name
            })
            if(!team) throw new Error("Equipo no encontrado")
            this.played_match()
            team.played_matches = this.played_matches;
            team.tie_matches = this.tie_matches += 1
            team.points = this._points += 1
            await team.save()
        }catch (error) {
            console.error("Error al registrar el empate:", error);
            throw new Error("Error al registrar el empate");
        }
        
    }

    async lose(diff: number){
        try{
            const team = await TeamModel.findOne({
                name: this._name
            })
            if(!team) throw new Error("Equipo no encontrado")
            this.played_match()    
    
    
            team.played_matches = this.played_matches
            team.lost_matches = this.lost_matches +=1;
            team.goal_difference = this._goal_difference -= diff
            await team.save()
        }catch (error) {
            console.error("Error al registrar la derrota:", error);
            throw new Error("Error al registrar la derrota");
        }
        
    }

    get name(): string {
        return this._name;
    }

    get points(): number {
        return this._points;
    }

    get goal_difference(): number{
        return this._goal_difference;
    }
}