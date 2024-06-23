export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('content:file:afterParse', (file) => {
        if (file.images?.length > 0) {
            if (!('head' in file)) file.head = {};
            if (!('meta' in file.head)) file.head.meta = [];

            const src = file.images[0].src,
                alt = file.images[0].desc;

            file.image = {
                src,
                alt,
            };

            file.head.meta.push({
                name: 'og:image',
                content: src,
            });

            file.head.meta.push({
                name: 'og:image:alt',
                content: alt,
            });
        }
    });
});
