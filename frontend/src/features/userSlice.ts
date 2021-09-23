import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createChat,
  createRoom,
  joinRoom,
  loadRoom,
  loadRoomChats,
  loadRooms,
  login,
  searchRoom,
  signup,
} from "../actions/user";
import { User } from "../types/user.type";

const userSlice = createSlice({
  name: "user",
  initialState: {
    myInfo: null as any,
    roomsInfo: [] as any,
    chatsInfo: {} as any,
    currentRoom: null as any,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null as string | null,
    loginLoading: false,
    loginDone: false,
    loginError: null as any,
    signupLoading: false,
    signupDone: false,
    signupError: null as any,
    createRoomLoading: false,
    createRoomDone: false,
    createRoomError: null as any,
    joinRoomLoading: false,
    joinRoomDone: false,
    joinRoomError: null as any,
    searchRoomLoading: false,
    searchRoomDone: false,
    searchRoomError: null as any,
    loadRoomLoading: false,
    loadRoomDone: false,
    loadRoomError: null as any,
    loadRoomsLoading: false,
    loadRoomsDone: false,
    loadRoomsError: null as any,
    loadRoomChatsLoading: false,
    loadRoomChatsDone: false,
    loadRoomChatsError: null as any,
    createChatLoading: false,
    createChatDone: false,
    createChatError: null as any,
  },
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<{ currentRoom: number }>) => {
      console.log(action.payload.currentRoom);
      state.currentRoom = action.payload.currentRoom;
    },
    addChannelChat: (state, action: PayloadAction<{ data: any }>) => {
      const { data } = action.payload;
      state.chatsInfo[data.ChannelId].ChannelChats.push(data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.myInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      .addCase(createRoom.pending, (state) => {
        state.createRoomLoading = true;
        state.createRoomDone = false;
        state.createRoomError = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createRoomLoading = false;
        state.createRoomDone = true;
        state.roomsInfo.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.createRoomLoading = false;
        state.createRoomError = action.payload;
      })
      .addCase(joinRoom.pending, (state) => {
        state.joinRoomLoading = true;
        state.joinRoomDone = false;
        state.joinRoomError = null;
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.joinRoomLoading = false;
        state.joinRoomDone = true;
        state.roomsInfo.push(action.payload);
      })
      .addCase(joinRoom.rejected, (state, action) => {
        state.joinRoomLoading = false;
        state.joinRoomError = action.payload;
      })
      .addCase(searchRoom.pending, (state) => {
        state.searchRoomLoading = true;
        state.searchRoomDone = false;
        state.searchRoomError = null;
      })
      .addCase(searchRoom.fulfilled, (state, action) => {
        state.searchRoomLoading = false;
        state.searchRoomDone = true;
      })
      .addCase(searchRoom.rejected, (state, action) => {
        state.searchRoomLoading = false;
        state.searchRoomError = action.payload;
      })
      .addCase(loadRoom.pending, (state) => {
        state.loadRoomLoading = true;
        state.loadRoomDone = false;
        state.loadRoomError = null;
      })
      .addCase(loadRoom.fulfilled, (state, action) => {
        state.loadRoomLoading = false;
        state.loadRoomDone = true;
        state.roomsInfo.push(action.payload);
      })
      .addCase(loadRoom.rejected, (state, action) => {
        state.loadRoomLoading = false;
        state.loadRoomError = action.payload;
      })
      .addCase(loadRooms.pending, (state) => {
        state.loadRoomsLoading = true;
        state.loadRoomsDone = false;
        state.loadRoomsError = null;
      })
      .addCase(loadRooms.fulfilled, (state, action) => {
        state.loadRoomsLoading = false;
        state.loadRoomsDone = true;
        state.roomsInfo = action.payload;
      })
      .addCase(loadRooms.rejected, (state, action) => {
        state.loadRoomsLoading = false;
        state.loadRoomsError = action.payload;
      })
      .addCase(loadRoomChats.pending, (state) => {
        state.loadRoomChatsLoading = true;
        state.loadRoomChatsDone = false;
        state.loadRoomChatsError = null;
      })
      .addCase(loadRoomChats.fulfilled, (state, action) => {
        state.loadRoomChatsLoading = false;
        state.loadRoomChatsDone = true;
        const z = action.payload;
        state.chatsInfo = { ...state.chatsInfo, [z.id]: z };
      })
      .addCase(loadRoomChats.rejected, (state, action) => {
        state.loadRoomChatsLoading = false;
        state.loadRoomChatsError = action.payload;
      })
      .addCase(createChat.pending, (state) => {
        state.createChatLoading = true;
        state.createChatDone = false;
        state.createChatError = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.createChatLoading = false;
        state.createChatDone = true;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.createChatLoading = false;
        state.createChatError = action.payload;
      })
      .addDefaultCase((state) => state);
  },
});

export const { setCurrentRoom, addChannelChat } = userSlice.actions;
export default userSlice.reducer;
