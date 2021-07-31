import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [{
  id: "dashboard",
  icon: "iconsminds-dashboard",
  label: "Dashboard",
  to: `${adminRoot}/dashboard`,
  subs: [{
    icon: "simple-icon-user",
    label: "Pessoal",
    to: `${adminRoot}/dashboard/personal`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  ]
},
{
  id: "leads",
  icon: "simple-icon-people",
  label: "Leads",
  to: `${adminRoot}/leads`,
  subs: [{
    icon: "iconsminds-diamond",
    label: "Leads",
    to: `${adminRoot}/leads/list`,
  },
    {
      icon: "iconsminds-handshake",
      label: "Clients",
      to: `${adminRoot}/clients/list`,
    },
    {
      icon: "iconsminds-safe-box",
      label: "Parceiros",
      to: `${adminRoot}/leads/list`,
    },
  ]
},
{
  id: "pages",
  icon: "iconsminds-digital-drawing",
  label: "Cursos",
  to: "/user/login",
  subs: [{
    icon: "simple-icon-user-following",
    label: "menu.login",
    to: "/user/login",
    newWindow: true
  }, {
    icon: "simple-icon-user-follow",
    label: "menu.register",
    to: "/user/register",
    newWindow: true
  }, {
    icon: "simple-icon-user-unfollow",
    label: "menu.forgot-password",
    to: "/user/forgot-password",
    newWindow: true
  },
  {
    icon: "simple-icon-user-following",
    label: "menu.reset-password",
    to: "/user/reset-password",
    newWindow: true
  }
  ]
},
{
  id: "single",
  icon: "iconsminds-three-arrow-fork",
  label: "Administrativo",
  to: `${adminRoot}/single`,
},
{
  id: "docs",
  icon: "iconsminds-library",
  label: "Definições",
  to: "https://piaf-vue-docs.coloredstrategies.com/",
  newWindow: true
}
];
export default data;
