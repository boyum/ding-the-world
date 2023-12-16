/// <reference types="vite/client" />

declare module "*.vue" {
  const component: Component;
  export default component;
}

declare module "*.svg";
