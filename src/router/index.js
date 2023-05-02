import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/",
    component: () => import("@/pages/home"),
    name: "Home",
    meta: {
      title: "首页-图片展示",
    },
  },
  {
    path: "/image-upload",
    component: () => import("@/pages/image-upload"),
    name: "ImageUpload",
    meta: {
      title: "图片上传",
    },
  },
  {
    path: "/admin",
    component: () => import("@/pages/admin"),
    name: "Admin",
    meta: {
      title: "后台管理",
    },
  },
];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
