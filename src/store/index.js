import { createStore } from "vuex";

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
    uiSignin(state){
      localStorage.setItem("hideConfigButton", true)
      localStorage.setItem("showSidenav", false)
      localStorage.setItem("showNavbar", false)
      localStorage.setItem("showFooter", false)
      state.hideConfigButton = true;
      state.showSidenav = false;
      state.showNavbar = false;
      state.showFooter = false;
    },
    uiLogged(state){
      localStorage.setItem("hideConfigButton", true)
      localStorage.setItem("showSidenav", true)
      localStorage.setItem("showNavbar", true)
      localStorage.setItem("showFooter", true)
      state.hideConfigButton = true;
      state.showSidenav = true;
      state.showNavbar = true;
      state.showFooter = true;
    },
    login(state, [name, uri, token]){
      localStorage.setItem("name", name)
      localStorage.setItem("uri", uri)
      localStorage.setItem("token", token)
      localStorage.setItem("overview", JSON.stringify([0]))
      localStorage.setItem("forecast", JSON.stringify([0]))
      localStorage.setItem("iots", JSON.stringify([0]))
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
    isAuthenticated: () => {
      if (localStorage.getItem("name") != ""){
        return true
      }
      return false
    }
  },
  plugins: []
});
