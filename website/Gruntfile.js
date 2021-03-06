module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            dist: [
                'Gruntfile.js',
                'javascripts/**/*.js'
            ],
            options: {
                globals: {
                    debug: true,
                    forin: true,
                    eqnul: true,
                    noarg: true,
                    noempty: true,
                    eqeqeq: true,
                    boss: true,
                    loopfunc: true,
                    evil: true,
                    laxbreak: true,
                    bitwise: true,
                    undef: true,
                    curly: true,
                    nonew: true,
                    browser: true,
                    devel: true,
                    jquery: true
                }
            }
        },

        concat: {
            js: {
                options: {
                    separator:';'
                },
                src: [
                    // Non-CDN libs
                    "wp-content/themes/hoffice/libs/p.js",
                    "wp-content/themes/hoffice/libs/jquery.visible.js", //The minified version has bug https://github.com/customd/jquery-visible/issues/21
                    "wp-content/themes/hoffice/libs/magnific-popup/jquery.magnific-popup.min.js",
                    "wp-content/themes/hoffice/libs/js-breakpoints/breakpoints.js",

                    // Global
                    "wp-content/themes/hoffice/js/hoffice/global.js",

                    // Common

                    // Services
                    "wp-content/themes/hoffice/js/hoffice/services/browser.js",

                    // Models

                    // Controllers
                    "wp-content/themes/hoffice/js/hoffice/controllers/base.js",
                    "wp-content/themes/hoffice/js/hoffice/controllers/index.js",
                    "wp-content/themes/hoffice/js/hoffice/controllers/postAndPage.js"

                    // Templates
                ],
                dest: 'wp-content/themes/hoffice/js/hoffice.js'
            },
            css: {
                src: [
                    // Theme header
                    'wp-content/themes/hoffice/theme-header.css',

                    // Libs
                    'wp-content/themes/hoffice/libs/magnific-popup/magnific-popup.css',

                    // Rest
                    'wp-content/themes/hoffice/style.css'
                ],
                dest: 'wp-content/themes/hoffice/style.css'
            }
        },

        sass: {
            build: {
                files: {
                    'wp-content/themes/hoffice/style.css': 'wp-content/themes/hoffice/sass/style.scss'
                }
            }
        },

        /* Task fails
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    'public/<%= pkg.name %>.css': 'public/<%= pkg.name %>.css'
                }
            }
        }, */

        watch: {
            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['buildjs']
            },

            css: {
                files: ['wp-content/themes/hoffice/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default', ['buildjs', 'buildcss']);
    grunt.registerTask('buildjs',  ['jshint', 'concat:js']);
    grunt.registerTask('buildcss',  ['sass', 'concat:css']);
};
