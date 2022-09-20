module.exports = {
    routes: [
        {
            match: 'routes',
            src: '.*',
            dest: '/index.html'
        }
    ],
    mount: {
        httpdocs: {
            url: '/',
            dot: true,
        }
    },
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2018'
    },
    plugins: [
        [
            'snowpack-plugin-terser',
            {
                terserOptions: {
                    compress: {
                        arguments: true,
                        passes: 2,
                        unsafe_arrows: true,
                        drop_console: true,
                    },
                },
            },
        ],
        [
            'snowpack-plugin-imagemin',
            {
                include: [
                    'assets/images/*.{jpg,png}',
                    'resources/persons/**/*.{jpg,png}',
                    'resources/entities/**/*.{jpg,png}',
                    'resources/sources/**/*.{jpg,png}',
                    'resources/events/**/*.{jpg,png}',
                ],
                plugins: [
                    require('imagemin-mozjpeg')({
                        quality: 70,
                    }),
                    require('imagemin-optipng')({
                    }),
                ],
            },
        ],
    ],
    packageOptions: {
    },
    devOptions: {
    },
    buildOptions: {
        minify: false,
    }
};
