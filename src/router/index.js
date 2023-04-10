import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

import BuildingEnergy from "../pages/BuildingEnergy.vue";
import BuildingHistoric from "../pages/BuildingHistoric.vue";
import CMDView from "../pages/CMDataVisualization.vue";
import Correlations from "../pages/Correlations.vue";
import EnergyForecast from "../pages/EnergyForecast.vue";
import TokenGeneration from "../pages/TokenGenerationForm.vue";
import Tokens from "../pages/Tokens.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/building-energy",
    name: "Building Energy",
    component: BuildingEnergy,
  },
  {
    path: "/building-historic",
    name: "Building Historic",
    component: BuildingHistoric,
  },
  {
    path: "/cmd-view",
    name: "CMD View",
    component: CMDView,
  },
  {
    path: "/correlations",
    name: "Correlations",
    component: Correlations,
  },
  {
    path: "/energy-forecast",
    name: "Energy Forecast",
    component: EnergyForecast,
  },
  {
    path: "/tokens",
    name: "Tokens",
    component: Tokens,
  },
  {
    path: "/token-generation",
    name: "Token Generation",
    component: TokenGeneration,
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
