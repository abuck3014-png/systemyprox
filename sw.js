importScripts('/scramjet/scramjet.wasm.js');
importScripts('/scramjet/scramjet.worker.js');

const scramjet = new ScramjetServiceWorker({
    prefix: '/service/',
    codec: scramjet.codecs.xor,
    config: {
        wisp: (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/wisp/'
    }
});

self.addEventListener('fetch', (event) => {
    if (scramjet.route(event)) {
        event.respondWith(scramjet.fetch(event));
    }
});
