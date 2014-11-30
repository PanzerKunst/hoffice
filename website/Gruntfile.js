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

                    // Global

                    // Common

                    // Services

                    // Models

                    // Controllers

                    // Templates
                ],
                dest: 'themes/hoffice/<%= pkg.name %>.js'
            }
        },

        sass: {
            build: {
                files: {
                    'themes/hoffice/<%= pkg.name %>.css': 'themes/hoffice/sass/main.scss'
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
                    'themes/hoffice/libs/h5bp/normalize.css',

                    // Rest
                    'themes/hoffice/<%= pkg.name %>.css'
                ],
                dest: 'themes/hoffice/<%= pkg.name %>-v1.css'
            }
        },

        watch: {
            js: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['buildjs']
            },

            css: {
                files: ['sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default', ['buildjs', 'buildcss']);
    grunt.registerTask('buildjs',  ['jshint', 'concat']);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);
};
