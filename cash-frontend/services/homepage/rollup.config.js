const { join, resolve } = require("path");
const { readFileSync } = require("fs");
import svelte from "rollup-plugin-svelte";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;
const projectRoot = join(__dirname, "../../../");
const keyPath = resolve(projectRoot, "./ssl/ssl.key");
const certPath = resolve(projectRoot, "./ssl/ssl.crt");

export default {
  input: "src/cash-homepage.js",
  output: {
    sourcemap: true,
    format: "system",
    name: null, // ensure anonymous System.register
    file: "dist/cash-homepage.js",
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },

      emitCss: false,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    nodeResolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `dist` directory and refresh the
    // browser on changes when not in production
    !production &&
      livereload({
        watch: "dist",
        // verbose: false, // Disable console output
        // other livereload options
        https: {
          key: readFileSync(keyPath),
          cert: readFileSync(certPath),
        },
      }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "serve", "--", "--dev", "--http2", "--cert", certPath, "--key", keyPath], {
          // stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
