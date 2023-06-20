import { join } from 'path';
import PrerenderSPAPlugin from 'prerender-spa-plugin';

export function chainWebpack(config) {
  const svgRule = config.module.rule('svg');

  svgRule.uses.clear();

  svgRule
    .use('raw-loader')
    .loader('raw-loader');
}
export const configureWebpack = {
  plugins: [
    new PrerenderSPAPlugin({
      staticDir: join(import.meta.url, 'dist'),
      routes: ['/'],
    }),
  ]
};