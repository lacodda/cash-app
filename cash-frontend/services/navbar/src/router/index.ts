import { RouteRecordRaw } from 'vue-router';

const Home = { template: '<div>Home</div>' };
const Calendar = { template: '<div>Calendar</div>' };

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
