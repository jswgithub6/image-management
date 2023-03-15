import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/",
    component: () => import("@/pages/home"),
    name: "Home",
  },
  {
    path: "/image-upload",
    component: () => import("@/pages/image-upload"),
    name: "ImageUpload",
  },
  {
    path: "/admin",
    component: () => import("@/pages/admin"),
    name: "Admin",
  },
];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
