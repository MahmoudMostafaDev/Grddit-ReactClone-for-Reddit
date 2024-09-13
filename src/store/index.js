import { createSlice, configureStore } from "@reduxjs/toolkit";
import { addRecent } from "../util/http";
import { getUsername } from "../util/auth";
import { io } from "socket.io-client";

const customChatSlice = createSlice({
  name: "customChat",
  initialState: {
    username: "",
    img: "",
  },
  reducers: {
    setCustomChat: (state, payload) => {
      state.username = payload.payload.username;
      state.img = payload.payload.img;
    },
    clearCustomChat: (state) => {
      state.username = "";
      state.img = "";
    },
  },
});

const SideBarinitialState = {
  sidebarOpen: false,
  forceOpen: false,
};

const recent = createSlice({
  name: "recent",
  initialState: {
    recent: [],
  },
  reducers: {
    addRecent: (state, payload) => {
      if (state.recent.includes(payload.payload)) return;
      state.recent = [payload.payload, ...state.recent];
    },
    loadRecent: (state, payload) => {
      state.recent = [...payload.payload];
    },
    clearRecent: (state) => {
      state.recent = [];
    },
  },
});
export const addRecentAction = (recentdata) => {
  return async (dispatch) => {
    const res = await addRecent(getUsername(), recentdata);
    dispatch(recent.actions.addRecent(recentdata));
  };
};

const userData = createSlice({
  name: "userData",
  initialState: {
    username: "",
    img: "",
    banner: "",
    posts: [],
    subs: [],
    recent: [],
  },
  reducers: {
    addPost: (state, payload) => {
      state.posts.push(payload);
    },
    addSub: (state, payload) => {
      state.subs.push(payload);
    },
    addRecent: (state, payload) => {
      state.recent.push(payload);
    },
    updateUser: (state, payload) => {
      state.username = payload.payload.username;
      state.img = payload.payload.img;
      state.banner = payload.payload.banner;
      state.posts = payload.payload.posts;
      state.subs = payload.payload.subs;
      state.recent = payload.payload.recent;
    },
  },
});

const PopupSlice = createSlice({
  name: "PopupSlice",
  initialState: { MessageisOpened: false, LoginisOpened: false },
  reducers: {
    toggleMessage: (state) => {
      state.MessageisOpened = !state.MessageisOpened;
    },
    closeMessage: (state) => {
      state.MessageisOpened = false;
    },

    openLogin: (state) => {
      state.LoginisOpened = true;
    },
    closeLogin: (state) => {
      state.LoginisOpened = false;
    },
  },
});

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: SideBarinitialState,
  reducers: {
    toggleSidebar: (state) => {
      state.forceOpen = !state.forceOpen;
    },

    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },

    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export const popupActions = PopupSlice.actions;
export const userDataActions = userData.actions;
export const recentActions = recent.actions;
export const customChatActions = customChatSlice.actions;
const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
    popup: PopupSlice.reducer,
    userData: userData.reducer,
    recent: recent.reducer,
    customChat: customChatSlice.reducer,
  },
});

export default store;
