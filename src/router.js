import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/user"),
    redirect: `/login`,
    children: [{
      path: "login",
      component: () =>
        import(/* webpackChunkName: "piaf" */ "./views/user/Login"),
    }]
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/dashboard`,
    meta: { loginRequired: true },
    /*
   define with Authorization :
   meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
   */
    children: [
      {
        path: "piaf",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/piaf"),
        redirect: `${adminRoot}/piaf/start`,
        children: [
          {
            path: 'start',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Start')
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
        ]
      },
      {
        path: "dashboard",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/dashboard"),
        redirect: `${adminRoot}/dashboard/personal`,
        children: [
          {
            path: 'personal',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/dashboard/personal')
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
        ]
      },
      {
        path: "leads",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/leads"),
        redirect: `${adminRoot}/leads/list`,
        children: [
          {
            path: 'list',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/leads/list')
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'edit-lead/:lead',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/leads/editLead'),
            props: true
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'convert-lead/:lead',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/leads/convertLead'),
            props: true
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
        ]
      },
      {
        path: "clients",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/clients"),
        redirect: `${adminRoot}/clients/list`,
        children: [
          {
            path: 'list',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/clients/list')
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'edit-client/:client',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/clients/editClient'),
            props: true
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'create-client/:client',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/clients/createCliente'),
            props: true
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
        ]
      },
      {
        path: "second-menu",
        component: () =>
          import(/* webpackChunkName: "second-menu" */ "./views/app/second-menu"),
        redirect: `${adminRoot}/second-menu/second`,
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "piaf" */ './views/app/second-menu/Second') }
        ]
      },


      {
        path: "single",
        component: () =>
          import(/* webpackChunkName: "single" */ "./views/app/single")
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;
