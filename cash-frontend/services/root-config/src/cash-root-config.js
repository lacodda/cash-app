import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@cash/navbar",
//   app: () => System.import("@cash/navbar"),
//   activeWhen: "/",
//   customProps: {
//     menu: [],
//   },
// });

// registerApplication({
//   name: "@cash/home",
//   app: () =>
//     import(
//       /* webpackIgnore: true */
//       "http://localhost:3081/src/main.ts"
//     ),
//   activeWhen: "/home",
// });

registerApplication({
  name: "@cash/work-time-calendar",
  app: () =>
    import(
      /* webpackIgnore: true */
      "//localhost:3080/src/main.ts"
    ),
  activeWhen: "/",
});

start({
  urlRerouteOnly: true,
});
