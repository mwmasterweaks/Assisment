import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AgentList from "../components/AgentList.vue";
import AgentForm from "../components/AgentForm.vue";


const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/agents" },
  { path: "/agents", component: AgentList },
  { path: "/agents/new", component: AgentForm },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
