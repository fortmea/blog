function headers() {
    return [
        {
            source: '/ffmpeg',
            headers: [
                {
                    key: 'Cross-Origin-Embedder-Policy',
                    value: 'require-corp',
                },
                {
                    key: 'Cross-Origin-Opener-Policy',
                    value: 'same-origin',
                },
            ],
        },
    ];
}
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
    experimental: { esmExternals: true },
    trailingSlash: true,
    images: {
        loader: 'akamai',
        path: '',
    },
    reactStrictMode: true,
    headers: headers(),



});