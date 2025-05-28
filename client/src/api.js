const URL = "https://ligacolombiana-fullstack-8.onrender.com/api"; 

export const getTeams = async () => {
  try {
    const response = await fetch(`${URL}/teams`);
    if (response.ok) {
      const data = await response.json();
      console.log("Data from fetch:", data);
      return data;
    }
    throw new Error("Error al obtener los equipos");
  } catch (error) {
    console.error("Ha ocurrido un error con fetch:", error);
  }
};


export const addTeam = async (name) => {
  try {
    const response = await fetch(`${URL}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name})
    });
    
    const data = await response.json(); 
    console.log(data);
  } catch (error) {
    console.error("Ha ocurrido un error" + error);
  }
};


export const getMatches = async () => {
  try {
    const response = await fetch(`${URL}/matches`);
    if (response.ok) {
      const data = await response.json();
    //   console.log("Data from fetch:", data);
      return data;
    }
    throw new Error("Error al obtener los equipos");
  } catch (error) {
    console.error("Ha ocurrido un error con fetch:", error);
  }
};

export const addMatch = async (data) => {
  try {
    const response = await fetch(`${URL}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response.json());
    
  } catch (error) {
    console.error("Ha ocurrido un error" + error);
  }
};

export const restartSeason = async() => {
  try {
    const response = await fetch(`${URL}/matches`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    
  } catch (error) {
    console.error("Ha ocurrido un error" + error);
  }
}
