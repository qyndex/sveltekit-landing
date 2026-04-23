import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.C-nO5w0s.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/Chih8ENo.js","_app/immutable/chunks/CxYv7NhA.js","_app/immutable/chunks/DR-XOjR6.js","_app/immutable/chunks/CN3QaU1v.js","_app/immutable/chunks/BUC-fFb3.js"];
export const stylesheets = ["_app/immutable/assets/2.BmeOLbbB.css"];
export const fonts = [];
