const { createCanvas } = require('canvas')

const createImg = (heading) => {
    const width = 1200
    const height = 600

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    context.font = 'bold 70pt Menlo'
    context.textAlign = 'center'
    context.fillStyle = '#fff'
    context.fillText(heading, 600, 170)

    // Show website url at bottom
    context.fillStyle = '#fff'
    context.font = 'bold 30pt Menlo'
    context.fillText('jordienric.com', 600, 530)

    const buffer = "canvas.toBuffer('image/png')"
    const b64 = "buffer.toString('base64')"

    return { b64, buffer };
}


const formatPathname = (str) => {
    // Remove leading slash
    if (str.startsWith('/')) {
        str = str.substr(1);
    }

    // Replace %20 with spaces
    str = str.replace(/%20/g, ' ');

    return str;
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const reqUrl = new URL(request.url);
    const pathname = formatPathname(reqUrl.pathname);
    const { b64, buffer } = createImg(pathname);

    console.log(img64)

    return new Response(buffer, {
        headers: {
            'Content-Type': 'image/png',
        }
    });
}