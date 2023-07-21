import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    name: "",
    uri: "",
    token: "",
    overview: [],
    forecast: [],
    iots: []
  },
  mutations: {
    saveOverview(state,overview){
      state.overview = overview;
    },
    saveForecast(state,forecast){
      state.forecast = forecast;
    },
    saveIots(state,iots){
      state.iots = iots;
    },
    uiSignin(state){
      state.hideConfigButton = true;
      state.showSidenav = false;
      state.showNavbar = false;
      state.showFooter = false;
    },
    uiLogged(state){
      state.hideConfigButton = false;
      state.showSidenav = true;
      state.showNavbar = true;
      state.showFooter = true;
    },
    login(state, [name, uri, token]){
      state.name = name;
      state.uri = uri;
      state.token = token;
      state.overview = [];
      state.forecast  = [];
      state.iots = [];
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    }
  },
  getters: {
    isAuthenticated: state => {
      if (state.user != ""){
        return true
      }
      return false
    }
  },
  plugins: [createPersistedState()]
});
