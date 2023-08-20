import axios from "axios";
import { query, request, response } from "express";
import TeamModel from "../models/Team.js";

export const players = (request, response) => {
  // fetch players from api
  axios
    .get(process.env.PLAYERS_API)
    .then((data) => {
      let playersData = [];
      data?.data?.elements?.map((item) => {
        let position = data?.data?.element_types?.find(
          (x) => x.id === item.element_type
        );
        let team = data?.data?.teams?.find((x) => x.code === item.team_code);
        position = {
          plural_name: position?.plural_name,
          plural_name_short: position?.plural_name_short,
          singular_name: position?.singular_name,
          singular_name_short: position?.singular_name_short,
        };
        let player = {
          id: item?.id,
          photo: item?.photo,
          first_name: item.first_name,
          second_name: item.second_name,
          web_name: item.web_name,
          element_type: item.element_type,
          points: item.total_points,
          team: team.short_name,
          position: position,
          selected_by_percent: item?.selected_by_percent,
          price: item?.now_cost,
        };
        if (Object.keys(request?.query).length === 0) {
          playersData.push(player);
        } else {
          const filters = request?.query?.position.split(",");
          if (
            filters.indexOf(position?.singular_name_short) > -1 ||
            filters.indexOf(team.short_name) > -1
          ) {
            playersData.push(player);
          }
        }
      });
      response.status(200).send(playersData);
    })
    .catch((error) => {
      response.status(404).send(error);
    });
};

export const player = (request, response) => {
  axios.get(process.env.PLAYERS_API).then((data) => {
    let detail = null;
    data?.data?.elements?.map((item) => {
      if (Number(request?.query?.id) === item?.id) {
        let position = data?.data?.element_types?.find(
          (x) => x.id === item.element_type
        );
        let team = data?.data?.teams?.find((x) => x.id === item.team_code);
        detail = {
          player: item?.web_name,
          position: position?.singular_name_short,
          team: team.short_name,
        };
      }
    });
    response.status(200).send(detail);
  });
};

// export const createTeam = (request, response) => {
//   axios.get(process.env.PLAYERS_API).then((data) => {
//     let team = {
//       GKP: [],
//       DEF: [],
//       MID: [],
//       FWD: [],
//     };
//     data?.data?.elements.map((item) => {
//       if (Number(request?.query?.id) === item?.id) {
//         team[GKP].push(item.first_name);
//       }
//     });
//   });
//   response.status(200).send(team);
// };
export const createTeam = async (request, response) => {
  let teamData = await TeamModel.create({
    user_id: request.body.id,
    team: request.body.team,
  });
  response.status(200).send(teamData);
};
