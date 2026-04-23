export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.-Qput-zG.js",app:"_app/immutable/entry/app.BNo2IF4h.js",imports:["_app/immutable/entry/start.-Qput-zG.js","_app/immutable/chunks/BUC-fFb3.js","_app/immutable/chunks/Chih8ENo.js","_app/immutable/entry/app.BNo2IF4h.js","_app/immutable/chunks/Chih8ENo.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DR-XOjR6.js","_app/immutable/chunks/CN3QaU1v.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
