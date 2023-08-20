import React, { useEffect, useState } from "react";
import axios from "axios";
import { PRICES } from "../constants/Constants";

function Home() {
  const [selectedRole, setSelectedRole] = useState("Goalkeepers");
  const [selectPrice, setSelectPrice] = useState(8.0);
  const [priceOfPosition, setPriceOfPosition] = useState(null);
  const [sortType, setSortType] = useState("Total points");
  const [searchText, setSeachText] = useState("");
  const [players, setPlayers] = useState(null);
  const [team, selectTeam] = useState({
    GKP: [],
    DEF: [],
    MID: [],
    FWD: [],
  });
  const [fetching, isFetching] = useState(false);

  useEffect(() => {
    if (convertRole() === "GKP") {
      setPriceOfPosition(PRICES.GKP);
    }
    if (convertRole() === "DEF") {
      setPriceOfPosition(PRICES.DEF);
    }
    if (convertRole() === "MID") {
      setPriceOfPosition(PRICES.MID);
    }
    if (convertRole() === "FWD") {
      setPriceOfPosition(PRICES.FWD);
    }
  }, [selectedRole]);

  function convertRole() {
    let role_code = "";
    if (selectedRole == "Goalkeepers") {
      role_code = "GKP";
    }
    if (selectedRole == "Defenders") {
      role_code = "DEF";
    }
    if (selectedRole == "Midfielders") {
      role_code = "MID";
    }
    if (selectedRole == "Forwards") {
      role_code = "FWD";
    }
    if (selectedRole == "Arsenal") {
      role_code = "ARS";
    }
    if (selectedRole == "Brentford") {
      role_code = "BRE";
    }
    if (selectedRole == "Chelsea") {
      role_code = "CHE";
    }
    if (selectedRole == "Bournemouth") {
      role_code = "BOU";
    }
    if (selectedRole == "Aston Villa") {
      role_code = "AVL";
    }
    if (selectedRole == "Crystal Palace") {
      role_code = "CRY";
    }
    if (selectedRole == "Brighton") {
      role_code = "BHA";
    }
    if (selectedRole == "Liverpool") {
      role_code = "LIV";
    }
    if (selectedRole == "Luton") {
      role_code = "LUT";
    }
    if (selectedRole == "Man Utd") {
      role_code = "MUN";
    }
    if (selectedRole == "Nott'm Forest") {
      role_code = "NFO";
    }
    if (selectedRole == "Sheffield Utd") {
      role_code = "SHU";
    }
    if (selectedRole == "Wolves") {
      role_code = "WOL";
    }
    return role_code;
  }
  useEffect(() => {
    if (selectedRole != null) {
      getPlayers();
    }
  }, [selectedRole]);
  function getPlayers() {
    isFetching(true);
    axios
      .get("http://localhost:8081/player?position=" + convertRole())
      .then((d) => {
        isFetching(false);
        setPlayers(d.data);
      })
      .catch(() => {
        isFetching(false);
      });
  }
  const addToTeam = (player) => {
    if (convertRole() === "GKP") {
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
    if (convertRole() === "DEF") {
      let DEF = team.DEF;
      DEF.push(player);
      selectTeam({
        ...team,
        DEF: DEF,
      });
    }
    if (convertRole() === "MID") {
      let MID = team.MID;
      MID.push(player);
      selectTeam({
        ...team,
        MID: MID,
      });
    }
    if (convertRole() === "FWD") {
      let FWD = team.FWD;
      FWD.push(player);
      selectTeam({
        ...team,
        FWF: FWD,
      });
    }
  };
  const removeFromTeam = (player) => {
    if (convertRole() === "GKP") {
      let GKP = team.GKP;
      let playerIndex = GKP.indexOf(player);
      GKP.splice(playerIndex, 1);
      // if (player.team_code in teamval) {
      //   teamval.player.team_code -= 1;
      // }
      selectTeam({
        ...team,
        GKP: GKP,
      });
    }
    if (convertRole() === "DEF") {
      let DEF = team.DEF;
      let playerIndex = DEF.indexOf(player);
      DEF.splice(playerIndex, 1);
      selectTeam({
        ...team,
        DEF: DEF,
      });
    }
    if (convertRole() === "MID") {
      let MID = team.MID;
      let playerIndex = MID.indexOf(player);
      MID.splice(playerIndex, 1);
      selectTeam({
        ...team,
        MID: MID,
      });
    }
    if (convertRole() === "FWD") {
      let FWD = team.FWD;
      let playerIndex = FWD.indexOf(player);
      FWD.splice(playerIndex, 1);
      selectTeam({
        ...team,
        FWD: FWD,
      });
    }
  };

  function showValueAsPerFilter(item) {
    if (sortType === "Total points") {
      return item.points;
    }
    if (sortType === "Team selected by %") {
      return item.selected_by_percent;
    }
    if (sortType === "Price") {
      return (item.price / 10).toFixed(1);
    }
  }

  function renderPlayers(data) {
    if (data != null) {
      let palyersArray = [];
      palyersArray.push(
        <tr>
          <th></th>
          <th></th>
          <th>£</th>
          <th>**</th>
        </tr>
      );

      data.map((item) => {
        palyersArray.push(
          <tr
            onClick={() => {
              if (!disableClick(item)) addToTeam(item);
            }}
            style={
              !disableClick(item)
                ? { cursor: "pointer" }
                : { cursor: "not-allowed" }
            }
          >
            <td>
              <button
                class="i-btn"
                data-bs-toggle="modal"
                data-bs-target="#playerInfo"
              ></button>
            </td>
            <td>
              <button
                class="player-detail-btn"
                data-bs-toggle="modal"
                data-bs-target="#addPlayer"
              >
                <span class="pd-main-wrapper">
                  <span class="pd-img">
                    <img
                      src={`./assets/jersey/${item.team}.webp`}
                      alt="Shirt"
                    />
                  </span>
                  <span class="pd-blk">
                    <span class="pd-name">{item.web_name}</span>
                    <span class="pd-club-role">
                      <span class="pd-club">{item.team}</span>
                      <span class="pd-role">
                        {item.position.plural_name_short}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </td>
            <td>{parseFloat(item.price / 10)}</td>
            <td>{showValueAsPerFilter(item)}</td>
          </tr>
        );
      });
      return palyersArray;
    }
  }
  const onRollSelect = (e) => {
    setSelectedRole(e.target.value);
  };
  const onPriceSelect = (e) => {
    setSelectPrice(e.target.value);
  };

  function renderGoalKeeper(code) {
    let selected = [];
    team?.[code]?.map((item) => {
      selected.push(
        <div class="player-selection-box">
          <button class="selectplayer">
            <span class="selectplayer-inner-blk">
              <span class="player-shirt">
                <img src={`./assets/jersey/${item.team}.webp`} alt="Shirt" />
              </span>
              <span class="player-role d-none">Add Defenders</span>
              <span class="player-detail">
                <span class="player-name">{item?.web_name}</span>
                <span class="player-value">
                  {(item?.price / 10.0).toFixed(1)}
                </span>
              </span>
              <span
                class="remove-player"
                onClick={() => {
                  removeFromTeam(item);
                }}
              >
                <i class="fa-solid fa-xmark"></i>
              </span>
              <span class="player-info"></span>
            </span>
          </button>
        </div>
      );
    });
    let max = 2;
    if (code === "GKP") {
      max = 2;
    }
    if (code === "DEF") {
      max = 5;
    }
    if (code === "MID") {
      max = 5;
    }
    if (code === "FWD") {
      max = 3;
    }
    let data = renderPlayerPlaceHolder(max - selected?.length, code);
    data?.map((item) => {
      selected.push(item);
    });
    return selected;
  }

  function renderPlayerPlaceHolder(count, code) {
    let msg = "";
    if (code == "GKP") msg = "Add Goalkeeper";
    if (code == "DEF") msg = "Add Defender";
    if (code == "MID") msg = "Add Midfielder";
    if (code == "FWD") msg = "Add Forward";
    let placeHolders = [];
    for (let i = 0; i < count; i++) {
      placeHolders.push(
        <div class="player-selection-box">
          <button class="selectplayer">
            <span class="selectplayer-inner-blk">
              <span class="player-shirt">
                <img src="images/shirt.webp" alt="Shirt" />
              </span>
              <span class="player-role">{msg}</span>
            </span>
          </button>
        </div>
      );
    }

    return placeHolders;
  }
  function disableClick(player) {
    if (convertRole() === "GKP") {
      if (team.GKP?.length === 2) {
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
    if (convertRole() === "DEF") {
      if (team.DEF?.length === 5) {
        return true;
      }
      const res = {};
      team?.DEF?.forEach((obj) => {
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

      if (result[0]?.count >= 5) {
        return true;
      }
      return false;
      // return team.DEF?.length === 5 ? true : false;
    }
    if (convertRole() === "MID") {
      if (team.MID?.length === 5) {
        return true;
      }
      const res = {};
      team?.MID?.forEach((obj) => {
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
      if (result[0]?.count >= 5) {
        return true;
      }
      return false;
      //return team.MID?.length === 5 ? true : false;
    }
    if (convertRole() === "FWD") {
      if (team.FWD?.length === 3) {
        return true;
      }
      const res = {};
      team?.FWD?.forEach((obj) => {
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

      if (result[0]?.count >= 3) {
        return true;
      }
      return false;
      //return team.FWD?.length === 3 ? true : false;
    }
  }

  function searchPlayerByName() {
    let filtredPlayers = null;
    if (players) {
      if (searchText === "") {
        filtredPlayers = players;
      } else {
        let data = players.filter((player) =>
          player["web_name"].toLowerCase().includes(searchText?.toLowerCase())
        );
        filtredPlayers = data;
      }
    }

    if (filtredPlayers) {
      let filterByPrice = filtredPlayers.filter(
        (player) => player["price"] / 10 <= selectPrice
      );

      // let sortedData = filterByPrice.sort((a, b) =>
      //   a.points > b.points ? 1 : b.points > a.points ? -1 : 0
      // );
      let sortedData = null;
      if (sortType === "Total points") {
        sortedData = filterByPrice.sort((a, b) => b.points - a.points);
      }
      if (sortType === "Team selected by %") {
        sortedData = filterByPrice.sort(
          (a, b) => b.selected_by_percent - a.selected_by_percent
        );
      }
      if (sortType === "Price") {
        sortedData = filterByPrice.sort((a, b) => b.price - a.price);
      }
      if (sortedData) return renderPlayers(sortedData);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <div class="row">
        <div class="col-lg-9">
          <div class="heading">
            <h2>Squad Selection</h2>
          </div>
          {/* <div class="maximum-player-txt">
            <p>
              Select a maximum of 3 players from a single team or 'Auto Pick' if
              you're short of time.
            </p>
          </div> */}
          <div class="squad-outer-wrapper">
            <div class="squad-main-wrapper">
              <div class="gameweek-blk">
                <div class="gameweek-heading">
                  <h3>Gameweek 1</h3>
                </div>
                <div class="week-deadline-blk p-relative line">
                  <p>
                    Gameweek 1 deadline:
                    <strong>Fri 11 Aug 23:00</strong>
                  </p>
                </div>
                <div class="scoreboard-wrapper">
                  <div class="scoreboard-card">
                    <div class="scoreboard-heading">
                      <p>Players Selected</p>
                    </div>
                    <div class="scoreboard-value">
                      <span class="player-selected">0/15</span>
                    </div>
                    <div class="scoreboard-btn-block">
                      <button class="scoreboard-btn">Auto pick</button>
                    </div>
                  </div>
                  <div class="scoreboard-card">
                    <div class="scoreboard-heading">
                      <p>Money Remaining</p>
                    </div>
                    <div class="scoreboard-value">
                      <span class="remaining-time">100.0</span>
                    </div>
                    <div class="scoreboard-btn-block">
                      <button class="scoreboard-btn">Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="squad-tab-section">
              <ul
                class="nav justify-content-center align-items-center nav-pills"
                id="squad-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="squad-tab-one"
                    data-bs-toggle="pill"
                    data-bs-target="#squad-one"
                    type="button"
                    role="tab"
                    aria-controls="squad-one"
                    aria-selected="true"
                  >
                    Pitch View
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="squad-tab-two"
                    data-bs-toggle="pill"
                    data-bs-target="#squad-two"
                    type="button"
                    role="tab"
                    aria-controls="squad-two"
                    aria-selected="false"
                  >
                    List
                  </button>
                </li>
              </ul>
              <div class="tab-content mt-4" id="squad-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="squad-one"
                  role="tabpanel"
                  aria-labelledby="squad-tab-one"
                  tabindex="0"
                >
                  <div class="pitch-block">
                    <div class="player-selection-wrapper">
                      {renderGoalKeeper("GKP")}
                    </div>
                    <div class="player-selection-wrapper">
                      {renderGoalKeeper("DEF")}
                    </div>
                    <div class="player-selection-wrapper">
                      {renderGoalKeeper("MID")}
                    </div>
                    <div class="player-selection-wrapper">
                      {renderGoalKeeper("FWD")}
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="squad-two"
                  role="tabpanel"
                  aria-labelledby="squad-tab-two"
                  tabindex="0"
                >
                  list
                </div>
              </div>
            </div>
          </div>
          <div class="note-block">
            <p>
              <strong>Please note:</strong> Some kit designs are mere
              placeholders. All home shirts will be faithfully reproduced here
              once kits are launched.
            </p>
          </div>
          <div class="enter-squad-blk">
            <button class="enter-squad-btn">Enter Squad</button>
          </div>
          <div class="fixture-blk">
            <div class="fixture-header-blk line">
              <div class="fixture-logo-blk">
                <span class="fixture-logo">
                  <img src="images/pl-main-logo.png" alt="Logo" />
                </span>
                <h2>Fixtures</h2>
              </div>
              <div class="fixture-btn-blk">
                <a href="#" class="calender-link">
                  <i class="fa-solid fa-calendar-days"></i>Sync to Calendar
                </a>
              </div>
            </div>
            <div class="gameweek-time-blk p-relative line">
              <h3>
                <strong>Gameweek 1:</strong> Fri 11 Aug 23:00
              </h3>
              <button class="next-list-btn">
                Next<i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div class="all-time-text">
              <p>All times are shown in your local time</p>
            </div>
            <div class="gameday-list">
              <div class="tag-heading-blk">
                <div class="tag-heading">
                  <h3>Saturday 12 August 2023</h3>
                </div>
              </div>
              <ul class="game-list-wrapper">
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Burnley</span>
                      <span class="team-logo">
                        <img src="images/t90.png" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">30:00</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t43.svg" alt="Team" />
                      </span>
                      <span class="team-name">Man City</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Arsenal</span>
                      <span class="team-logo">
                        <img src="images/t3.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">00:50</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t17.png" alt="Team" />
                      </span>
                      <span class="team-name">Nott'm Forest</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Bournemouth</span>
                      <span class="team-logo">
                        <img src="images/t91.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">25:00</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t94.svg" alt="Team" />
                      </span>
                      <span class="team-name">Brentford</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Chelsea</span>
                      <span class="team-logo">
                        <img src="images/t8.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">30:00</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t1.svg" alt="Team" />
                      </span>
                      <span class="team-name">Man Utd</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Liverpool</span>
                      <span class="team-logo">
                        <img src="images/t14.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">30:00</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t31.svg" alt="Team" />
                      </span>
                      <span class="team-name">Crystal Palace</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Aston Villa</span>
                      <span class="team-logo">
                        <img src="images/t7.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">30:00</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t102.png" alt="Team" />
                      </span>
                      <span class="team-name">Luton</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div class="gameday-list">
              <div class="tag-heading-blk">
                <div class="tag-heading">
                  <h3>Sunday 13 August 2023</h3>
                </div>
              </div>
              <ul class="game-list-wrapper">
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Arsenal</span>
                      <span class="team-logo">
                        <img src="images/t3.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">00:50</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t17.png" alt="Team" />
                      </span>
                      <span class="team-name">Nott'm Forest</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Chelsea</span>
                      <span class="team-logo">
                        <img src="images/t8.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">30:00</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t1.svg" alt="Team" />
                      </span>
                      <span class="team-name">Man Utd</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div class="gameday-list">
              <div class="tag-heading-blk">
                <div class="tag-heading">
                  <h3>Tuesday 15 August 2023</h3>
                </div>
              </div>
              <ul class="game-list-wrapper">
                <li>
                  <div class="team-wrapper">
                    <div class="team-left">
                      <span class="team-name">Arsenal</span>
                      <span class="team-logo">
                        <img src="images/t3.svg" alt="Team" />
                      </span>
                    </div>
                    <span class="game-time-blk">00:50</span>
                    <div class="team-right">
                      <span class="team-logo">
                        <img src="images/t17.png" alt="Team" />
                      </span>
                      <span class="team-name">Nott'm Forest</span>
                    </div>
                    <a
                      href="https://www.hotstar.com/in/sports/football"
                      class="hotstar-link"
                      target="_blank"
                    >
                      <img src="images/hotstar.png" alt="Hotstar" />
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="selection">
            <div class="selection-wrapper">
              <div class="heading">
                <h2>Player Selection</h2>
              </div>
              <div class="selection-block">
                <label for="select">View</label>
                <select onChange={onRollSelect} name="" id="select">
                  <optgroup label="By Position">
                    <option>Goalkeepers</option>
                    <option>Defenders</option>
                    <option>Midfielders</option>
                    <option>Forwards</option>
                  </optgroup>
                  <optgroup label="By Team">
                    <option>Arsenal</option>
                    <option>Aston Villa</option>
                    <option>Bournemouth</option>
                    <option>Brentford</option>
                    <option>Brighton</option>
                    <option>Chelsea</option>
                    <option>Crystal Palace</option>
                    <option>Liverpool</option>
                    <option>Luton</option>
                    <option>Man Utd</option>
                    <option>Nott'm Forest</option>
                    <option>Sheffield Utd</option>
                    <option>Wolves</option>
                  </optgroup>
                </select>
              </div>
              <div class="selection-block">
                <label for="">Sorted by</label>
                <select
                  onChange={(e) => {
                    setSortType(e.target.value);
                  }}
                  name=""
                  id=""
                >
                  <option>Total points</option>
                  <option>Price</option>
                  <option>Team selected by %</option>
                </select>
              </div>
              <div class="selection-block">
                <label for="select">
                  Max cost Between {priceOfPosition?.max} and{" "}
                  {priceOfPosition?.min}
                </label>
                <select onChange={onPriceSelect} name="" id="">
                  {priceOfPosition?.values?.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              </div>
              <div class="search-block">
                <input
                  onChange={(e) => {
                    setSeachText(e.target.value);
                  }}
                  type="text"
                  placeholder="Search for player…"
                />
                <span class="search-icon">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
              <div class="player-shown-block">
                <p>570 players shown</p>
              </div>
            </div>
            <div class="table-section">
              <div class="tag-heading-blk">
                <div class="tag-heading">
                  <h3>{selectedRole}</h3>
                </div>
              </div>
              <div class="table-block">
                {fetching && <h5>Loading....</h5>}
                <table>
                  <tbody>{searchPlayerByName()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
