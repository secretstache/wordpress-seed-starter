export default async (app) => {
    app.eslint
        .extends(['@roots/eslint-config'])
        .setFailOnError(true)
        .setFailOnWarning(false);

    app.stylelint
        .setFailOnError(true)
        .setFailOnWarning(false);

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

    app.devtool(`eval-source-map`);

    app.wpjson
        .setSettings({
            layout: {
                contentSize: '1240px',
                wideSize: '1440px',
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
            spacing: {
                margin: true,
                padding: true,
                customMargin: true,
                customPadding: true,
                units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
            },
            typography: {
                customFontSize: false,
            },
        })
        .useTailwindColors()
        .useTailwindSpacing()
        .useTailwindFontSize()
        .useTailwindFontFamily();

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
};
