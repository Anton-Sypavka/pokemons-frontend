import HttpClient from "./HttpClient";

const battle = {
  startBattle: (body) => {
    return HttpClient.post(`/battle/start`, body);
  },

  getBattle: (id) => {
    return HttpClient.get(`/battle/${id}`);
  },

  attack: (data) => {
    return HttpClient.post(`/battle/attack`, data);
  },

  quit: (id) => {
    return HttpClient.get(`/battle/quit/${id}`);
  },
}

export default battle;