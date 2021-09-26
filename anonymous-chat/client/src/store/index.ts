import { createStore } from "vuex";
import client from "../lib/client";

export interface ModuleAState {
  rooms: any;
  roomChats: any;
  liveWatch: any;
}

export default createStore<ModuleAState>({
  state: {
    rooms: [],
    roomChats: {},
    liveWatch: null,
  },
  mutations: {
    loadRooms(state, payload) {
      state.rooms = payload;
    },
    loadChats(state, payload) {
      state.roomChats[state.liveWatch] = payload;
    },
    createRoom(state, payload) {
      state.rooms.push(payload);
    },
    createChat(state, payload) {
      state.roomChats[state.liveWatch].push(payload);
    },
    setLiveWatch(state, payload) {
      state.liveWatch = payload;
    },
  },
  actions: {
    loadRooms({ commit }) {
      client
        .get("/")
        .then((res) => {
          commit("loadRooms", res.data);
        })
        .catch((err) => console.error(err));
    },
    loadChats({ commit, state }) {
      client
        .get(`/room/${state.liveWatch}/chats`)
        .then((res) => {
          commit("loadChats", res.data);
        })
        .catch((err) => console.error(err));
    },
    createRoom({ commit }, { roomName }) {
      client.post("/room", { name: roomName }).then((res) => {
        commit("createRoom", res.data);
      });
    },
    createChat({ state }, { content }) {
      client
        .post(`/room/${state.liveWatch}/chat`, { content })
        .catch((err) => console.error(err));
    },
  },
  getters: {
    getRooms: (state) => {
      return state.rooms;
    },
    getRoomChats: (state) => {
      return state.roomChats[state.liveWatch];
    },
    isRoomChats: (state) => {
      return state.roomChats[state.liveWatch] ? true : false;
    },
    getliveWatch: (state) => {
      return state.liveWatch;
    },
    getRoomsId: (state) => {
      const roomsInfo = state.rooms.map((room: any) => {
        const { id } = room;
        return id;
      });
      return roomsInfo;
    },
  },
  modules: {},
});
