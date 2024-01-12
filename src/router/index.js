import { createRouter, createWebHistory } from "vue-router";
// import Login from '../views/Login.vue'
import TokenService from "../services/token.service";

const routes = [
  {
    path: "/",
    name: "Root",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },

  {
    path: "/admin",
    name: "Admin View",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin/Index.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Administrator Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Admin/AdminDashboard.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "manage-user-accounts",
        name: "Manage User Accounts",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Admin/ManageUserAccounts.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "purchase-pipeline",
        name: "Purchase Pipeline",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Admin/PurchasePipeline.vue"
          ),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // You are going to have to make an ENV File
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is authenticated, e.g., by checking Local Storage.
    if (TokenService.getLocalAccessToken()) {
      next();
    } else {
      // Redirect to the login page or handle unauthorized access.
      // Call the Toaster Alert over Here.
      next("/login");
    }
  } else {
    // If the route does not require authentication, allow access.
    next();
  }
});

export default router;
