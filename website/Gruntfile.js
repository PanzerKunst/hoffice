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
            options: {
                separator:';'
            },
            dist: {
                src: [
                    // Libs
                    "wp-content/themes/hoffice/libs/p.js",
                    "wp-content/themes/hoffice/libs/jquery-2.1.1.min.js",
                    "wp-content/themes/hoffice/libs/lodash.min.js",
                    "wp-content/themes/hoffice/libs/gsap/TweenLite.min.js",
                    "wp-content/themes/hoffice/libs/gsap/CSSPlugin.min.js",
                    "wp-content/themes/hoffice/libs/gsap/EasePack.min.js",
                    // "libs/jquery.visible.js",    The minified version has bug https://github.com/customd/jquery-visible/issues/21

                    // Global
                    "wp-content/themes/hoffice/js/hoffice/global.js",

                    // Common

                    // Services

                    // Models

                    // Controllers
                    "wp-content/themes/hoffice/js/hoffice/controllers/base.js",
                    "wp-content/themes/hoffice/js/hoffice/controllers/index.js"

                    // Templates
                ],
                dest: 'wp-content/themes/hoffice/js/hoffice.js'
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

        cssmin: {
            build: {
                src: [
                    // Libs

                    // Rest
                    'wp-content/themes/hoffice/style.css'
                ],
                dest: 'wp-content/themes/hoffice/style.css'
            }
        },

        watch: {
            js: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['buildjs']
            },

            css: {
                files: ['wp-content/themes/hoffice/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default', ['buildjs', 'buildcss']);
    grunt.registerTask('buildjs',  ['jshint', 'concat']);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);
};
