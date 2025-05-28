import { Team } from "../domain/Team";
export function orderTeamsList(teams: Team[] = []) {
    if(teams.length > 0){
        return [...teams].sort((a, b) => {
            if (a.points === b.points) {
              return b.goal_difference - a.goal_difference;
            }
            return b.points - a.points;
          });
    }
    else return []; 
    }