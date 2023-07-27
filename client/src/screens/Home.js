import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [position, setPosition] = useState("GKP");
  const [players, setPlayers] = useState(null);
  const [team, selectTeam] = useState({
    GKP: [],
    DEF: [],
    MID: [],
    FWD: [],
  });
  function selectButton(selectedPlayer, player) {
    if (selectedPlayer) {
      return (
        <button
          className="btn btn-danger"
          onClick={() => {
            removeFromTeam(player);
          }}
        >
          Remove Player
        </button>
      );
    }
    return (
      <button
        disabled={disableClick(player)}
        className="btn btn-success"
        onClick={() => {
          addToTeam(player);
        }}
      >
        Select Player
      </button>
    );
  }
  function renderSelectButton(player) {
    if (position === "GKP") {
      // check if plyaer exist in the array or not
      let selectedPlayer = team?.GKP?.find((x) => x?.id === player?.id);
      return selectButton(selectedPlayer, player);
    }
    if (position === "DEF") {
      let selectedPlayer = team?.DEF?.find((x) => x?.id === player?.id);
      return selectButton(selectedPlayer, player);
    }
    if (position === "MID") {
      let selectedPlayer = team?.MID?.find((x) => x?.id === player?.id);
      return selectButton(selectedPlayer, player);
    }
    if (position === "FWD") {
      let selectedPlayer = team?.FWD?.find((x) => x?.id === player?.id);
      return selectButton(selectedPlayer, player);
    }
  }
  const changeHandler = (event) => {
    setPosition(event.target.value);
  };
  const fetchPlayers = () => {
    axios
      .get("http://localhost:8081/player/players?position=" + position)
      .then((data) => {
        setPlayers(data?.data);
      });
  };
  const removeFromTeam = (player) => {
    if (position === "GKP") {
      let GKP = team.GKP;
      let playerIndex = GKP.indexOf(player);
      GKP.splice(playerIndex);
      // if (player.team_code in teamval) {
      //   teamval.player.team_code -= 1;
      // }
      selectTeam({
        ...team,
        GKP: GKP,
      });
    }
    if (position === "DEF") {
      let DEF = team.DEF;
      let playerIndex = DEF.indexOf(player);
      DEF.splice(playerIndex);
      selectTeam({
        ...team,
        DEF: DEF,
      });
    }
    if (position === "MID") {
      let MID = team.MID;
      let playerIndex = MID.indexOf(player);
      MID.splice(playerIndex);
      selectTeam({
        ...team,
        MID: MID,
      });
    }
    if (position === "FWD") {
      let FWD = team.FWD;
      let playerIndex = FWD.indexOf(player);
      FWD.splice(playerIndex);
      selectTeam({
        ...team,
        FWD: FWD,
      });
    }
  };
  const addToTeam = (player) => {
    if (position === "GKP") {
      let GKP = team.GKP;
      GKP.push(player);
      // if (player.team_code in teamval) {
      //   teamval.player.team_code += 1;
      // } else {
      //   teamval[player.team_code] = 1;
      // }
      // console.log(JSON.stringify(teamval));
      selectTeam({
        ...team,
        GKP: GKP,
      });
    }
    if (position === "DEF") {
      let DEF = team.DEF;
      DEF.push(player);
      selectTeam({
        ...team,
        DEF: DEF,
      });
    }
    if (position === "MID") {
      let MID = team.MID;
      MID.push(player);
      selectTeam({
        ...team,
        MID: MID,
      });
    }
    if (position === "FWD") {
      let FWD = team.FWD;
      FWD.push(player);
      selectTeam({
        ...team,
        FWF: FWD,
      });
    }
  };
  function disableClick(player) {
    if (position === "GKP") {
      if (team.GKP?.length === 5) {
        return true;
      }

      const res = {};
      team?.GKP?.forEach((obj) => {
        const key = `${obj.team}`;

        if (!res[key]) {
          res[key] = { ...obj, count: 0 };
        }
        res[key].count += 1;
      });
      let finalArray = Object.values(res);
      var result = finalArray.filter((obj) => {
        return obj.team === player.team;
      });

      if (result[0]?.count >= 2) {
        return true;
      }
      return false;
      // return team.GKP?.length === 2 ? true : false;
    }
    if (position === "DEF") {
      return team.DEF?.length === 5 ? true : false;
    }
    if (position === "MID") {
      return team.MID?.length === 5 ? true : false;
    }
    if (position === "FWD") {
      return team.FWD?.length === 3 ? true : false;
    }
  }
  function renderPlayers() {
    return players?.map((item) => {
      return (
        <div>
          <img
            src={
              "https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
              item?.photo?.replace("jpg", "png")
            }
            height="100px"
            width="100px"
          />
          <p>{item?.second_name}</p>
          {renderSelectButton(item)}
        </div>
      );
    });
  }
  return (
    <div>
      <h2 className="text-primary text-center">Get players by positon</h2>
      <b className="m-2 p-2">Select Player positon</b>
      <select name="drop" onChange={changeHandler}>
        <option value="GK">GKP</option>
        <option value="DEF">DEF</option>
        <option value="MID">MID</option>
        <option value="FWD">FWD</option>
      </select>
      <button className="btn btn-info" onClick={fetchPlayers}>
        Show players
      </button>
      <button className="btn btn-danger">Clear</button>
      {renderPlayers()}
    </div>
  );
}

export default Home;
