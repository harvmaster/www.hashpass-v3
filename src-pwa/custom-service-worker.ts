declare const self: ServiceWorkerGlobalScope & typeof globalThis;

import { clientsClaim } from 'workbox-core';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute([{url: 'index.html', revision: null}, ...self.__WB_MANIFEST]);


cleanupOutdatedCaches();

// Cache all other requests with a StaleWhileRevalidate strategy
registerRoute(
  ({url}) => url.origin === self.location.origin,
  new StaleWhileRevalidate()
);

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
}


/* */
// import { clientsClaim } from 'workbox-core'
// import {
//   precacheAndRoute,
//   cleanupOutdatedCaches,
//   createHandlerBoundToURL,
// } from 'workbox-precaching';
// import { registerRoute, NavigationRoute } from 'workbox-routing'
// import { StaleWhileRevalidate } from 'workbox-strategies'

// declare const self: ServiceWorkerGlobalScope & typeof globalThis;
// (self as any).__WB_MANIFEST

// import { initDb, Database } from './db'

// let db : Database;
// const loadDb = async () => {
//   db = await initDb()
// }
// loadDb()

// precacheAndRoute([{url: 'index.html', revision: null}, ...self.__WB_MANIFEST]);
// cleanupOutdatedCaches()

// registerRoute(
//   ({url}) => url.origin === self.location.origin,
//   new StaleWhileRevalidate()
// );

// const swInterfaces = {
//   db: {
//     find: (params) => {
//       return db.find(params)
//     },
//     // findOne: () => {},
//     // findById: () => {}
//   }
// }

// // Using broadcast channel instead of fixing communication bug between SW and Client
// const channel = new BroadcastChannel('hashpass');

// self.addEventListener('message', async (event) => {
//   // Check supported type
//   const {type, command, params} = event.data
//   if (!Object.keys(swInterfaces).includes(type)) throw new Error('Invalid SW request')
  
//   // Check type supports command
//   if (!Object.keys(swInterfaces[type]).includes(command)) throw new Error(`Invalid SW command on type '${type}'`)

//   const res = await swInterfaces[type][command](params)
//   channel.postMessage({ id: event.data.id, res: res });
// })

// self.addEventListener("install", (event) => {
//   self.skipWaiting();
//   clientsClaim();
//   console.log('Installed Service Worker')
// })


// console.log('loaded service worker')