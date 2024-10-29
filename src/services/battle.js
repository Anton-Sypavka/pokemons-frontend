import HttpClient from "./HttpClient";

const battle = {
  startBattle: (body) => {
    return HttpClient.post(`/battle/start`, body);
  },

  getBattle: (id) => {
    return HttpClient.get(`/battle/${id}`);
  },
}

export default battle;