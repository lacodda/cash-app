declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';

interface ImportMetaEnv {
  CLIENT_PORT: string;
  CLIENT_ROOT_API: string;
  CLIENT_PERSISTENT_STORE_KEY: string;
}

interface AnyObject {
  [key: string]: any;
}
