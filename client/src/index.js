import { getTeams, addTeam, getMatches, addMatch, restartSeason } from "./api.js";



const createNewTeamButton = document.getElementById("create-team");
const addResultButton = document.getElementById("add-result");
const positionsTable = document.getElementById("position-table");
const createNewTeamName = document.getElementById("name");
const createNewTeamSection = document.getElementById("create-team-section");
const createTeamForm = document.getElementById("create-team-form");
const addResultSection = document.getElementById("add-result-section");
const addResultForm = document.getElementById("add-result-form");
const addResultTeam1Name = document.getElementById("team1");
const addResultTeam2Name = document.getElementById("team2");
const addResultTeam1Score = document.getElementById("result1");
const addResultTeam2Score = document.getElementById("result2");
const lastMatches = document.getElementById("last-matches");
const labelTitle1 = document.getElementById("result1label");
const labelTitle2 = document.getElementById("result2label");
const restartButton = document.getElementById("restart-season-button");

const logos = {
  "Alianza FC": "./public/logos/alianza_fc.png",
  "America de Cali": "./public/logos/america_de_cali.png",
  "Atletico Junior": "./public/logos/atletico_junior.png",
  "Atletico Nacional": "./public/logos/atletico_nacional.png",
  "Boyaca Chico": "./public/logos/boyaca_chico.png",
  Bucaramanga: "./public/logos/bucaramanga.png",
  "Deportes Tolima": "./public/logos/deportes_tolima.svg",
  "Deportivo Cali": "./public/logos/deportivo_cali.png",
  "Deportivo Pasto": "./public/logos/deportivo_pasto.png",
  "Deportivo Pereira": "./public/logos/deportivo_pereira.png",
  Envigado: "./public/logos/envigado.png",
  "Fortaleza CEIF": "./public/logos/fortaleza_ceif.png",
  "Independiente Medellin": "./public/logos/independiente_medellin.png",
  "Independiente Santa Fe": "./public/logos/independiente_santa_fe.png",
  "La Equidad": "./public/logos/la_equidad.png",
  Llaneros: "./public/logos/llaneros.png",
  Millonarios: "./public/logos/millonarios.png",
  "Once Caldas": "./public/logos/once_caldas.png",
  "Union Magadalena": "./public/logos/union_magdalena.png",
  "Aguilas Doradas": "./public/logos/aguilas_doradas.png",
};
const renderTeamsList = async () => {
  positionsTable.innerHTML = "";
  const headerRow = document.createElement("div");
  headerRow.classList.add("position-row", "position-header");

  headerRow.innerHTML = `
    <div class="position-cell position-team">Equipo</div>
    <div class="position-cell">PJ</div>
    <div class="position-cell">G</div>
    <div class="position-cell">E</div>
    <div class="position-cell">P</div>
    <div class="position-cell">DG</div>
    <div class="position-cell">Pts</div>
`;




  

  positionsTable.appendChild(headerRow);
  const positions = await getTeams();
  console.log(positions)

  positions.forEach((club) => {
    const row = document.createElement("div");
    row.classList.add("position-row");

    console.log(logos[club._name])
    row.innerHTML = `
                <div class="position-cell position-team">
                 <img src="${logos[club._name]}" alt="Logo de ${club._name}" class="team-logo">
                ${club._name}</div>
                <div class="position-cell">${club.played_matches}</div>
                <div class="position-cell">${club.won_matches}</div>
                <div class="position-cell">${club.tie_matches}</div>
                <div class="position-cell">${club.lost_matches}</div>
                <div class="position-cell">${club._goal_difference}</div>
                <div class="position-cell">${club._points}</div>
            `;

    positionsTable.appendChild(row);
  });
};

const renderMatches = async() => {
  lastMatches.innerHTML = "";
  const matches = await getMatches();
  matches.slice(-5).forEach((match) => {
    const matchRender = document.createElement("div");
    matchRender.classList.add("match-row");
    const date = new Date(match.date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    matchRender.innerHTML = `
                  <div class = "match-team">
                  <img src="${logos[match.local_team]}" alt="Logo de ${
      match.local_team
    }" class="team-logo">
                  ${match.local_team}
                  </div>
                  <div class = "match-score">${match.local_team_result}</div>
                  <div class = "match-team">
                  <img src="${logos[match.away_team]}" alt="Logo de ${
      match.away_team
    }" class="team-logo">
                  ${match.away_team}</div>
                  <div class = "match-score">${match.away_team_result}</div>
                  <div class = "match-score">${day}/${month}/${year}</div>
              `;

    lastMatches.append(matchRender);
  });
};
const renderDropdownList = async() => {
  addResultTeam1Name.innerHTML =
    '<option value="">-- Selecciona un equipo --</option>';
  addResultTeam2Name.innerHTML =
    '<option value="">-- Selecciona un equipo --</option>';
    const positions = await getTeams();
  positions.forEach((team) => {
    const option = document.createElement("option");
    option.value = team._name;
    option.textContent = team._name;
    const option2 = option.cloneNode(true);
    addResultTeam1Name.appendChild(option);
    addResultTeam2Name.appendChild(option2);
  });
};

const newTeam = async() => {
  let name = createNewTeamName.value;
  console.log(name)
  const newTeam = await addTeam(name);
  renderTeamsList();
  renderDropdownList();
};

const newMatch = async() => {
    let local_team = addResultTeam1Name.value;
    let away_team = addResultTeam2Name.value;
    if (local_team === away_team) return alert("No puede ser el mismo equipo");

    let local_team_result = parseInt(addResultTeam1Score.value);
    let away_team_result = parseInt(addResultTeam2Score.value);
    const obj = {
        local_team,
        away_team,
        local_team_result,
        away_team_result
    }

    const newMatch = await addMatch(obj)
    renderTeamsList()
    renderMatches()
}
document.addEventListener("DOMContentLoaded", () => {
    renderTeamsList();
    renderMatches();
    renderDropdownList();
});

createTeamForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newTeam();
  toogleForm(createNewTeamSection);
});

const toogleForm = (element) => {
  element.style.display === "none"
    ? (element.style.display = "block")
    : (element.style.display = "none");
};

createNewTeamButton.addEventListener("click", () => {
  toogleForm(createNewTeamSection);
});

const updateLabels = () => {
  labelTitle1.textContent = `Goles de ${addResultTeam1Name.value}`;
  labelTitle2.textContent = `Goles de ${addResultTeam2Name.value}`;
};

addResultTeam1Name.addEventListener("change", updateLabels);

addResultTeam2Name.addEventListener("change", updateLabels);

addResultForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newMatch();
  
});

restartButton.addEventListener("click", async(e) => {
  e.preventDefault();
  const confirmRestart = confirm("Desear reiniciar la temporada?")
  if(confirmRestart){
    await restartSeason();
  }

  renderDropdownList()
  renderMatches()
  renderTeamsList()


})

