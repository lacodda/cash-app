import { registerApplication, start } from "single-spa";
import { constructApplications, constructRoutes, constructLayoutEngine } from "single-spa-layout";

const apps = {
  "@cash/navbar": import(
    /* webpackIgnore: true */
    "//localhost:3081/src/main.ts"
  ),
  "@cash/work-time-calendar": import(
    /* webpackIgnore: true */
    "//localhost:3080/src/main.ts"
  ),
};

const routes = constructRoutes(document.querySelector("#single-spa-layout"));
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => {
    return apps[name];
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);

layoutEngine.activate();
start();
