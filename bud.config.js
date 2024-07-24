export default async (app) => {
    app.build.setRule('svg', {
        test: /\.inline\.svg$/i,
        issuer: /\.js$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: { overrides: { removeViewBox: false } },
                            },
                        ],
                    },
                },
            },
        ],
    });

    app
        .entry('app', [ '@scripts/client/app', '@styles/app' ])
        .entry('editor', [ '@scripts/editor/editor', '@styles/editor' ])
        .entry('admin', [ '@styles/admin' ])
        .assets([ 'images' ]);

    app.setPublicPath('/wp-content/themes/THEME_PUBLIC_PATH_NAME/public/');

    app
        .setUrl('http://localhost:3000')
        .setProxyUrl(process.env.WP_HOME)
        .watch([ 'resources/views', 'resources/styles', 'resources/scripts', 'app' ]);

    app.eslint
        .extends([ '@roots/eslint-config' ])
        .setFailOnError(false)
        .setFailOnWarning(false);

    app.devtool(`eval-source-map`);

    /**
     * Generate WordPress `theme.json`
     *
     * @note This overwrites `theme.json` on every build.
     *
     * @see {@link https://bud.js.org/extensions/sage/theme.json}
     * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json}
     */
    app.wpjson
        .setSettings({
            background: {
                backgroundImage: true,
            },
            color: {
                custom: false,
                customDuotone: false,
                customGradient: false,
                defaultDuotone: false,
                defaultGradients: false,
                defaultPalette: false,
                duotone: [],
            },
            custom: {
                spacing: {},
                typography: {
                    'font-size': {},
                    'line-height': {},
                },
            },
            spacing: {
                padding: true,
                units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
            },
            typography: {
                customFontSize: false,
            },
        })
        .useTailwindColors()
        .useTailwindFontFamily()
        .useTailwindFontSize();
};
