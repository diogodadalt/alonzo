/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'build/app.js': ['build/src/*.js'],
        }
      }
    },
    traceur: {
      options: {
        copyRuntime: 'build',
        modules: 'commonjs',
        blockBinding: true,
        experimental: true
      },
      custom: {
        files: [{
          expand: true,
          cwd: '',
          src: ['src/*.js'],
          dest: 'build'
        }]
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['build/src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    simplemocha: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: { src: ['test/*.js'] }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.registerTask('test', ['jshint', 'traceur', 'browserify', 'simplemocha']);
  grunt.registerTask('compile', ['jshint', 'traceur', 'browserify', 
    'simplemocha', 'concat', 'uglify']);  
  grunt.registerTask('default', ['jshint', 'simplemocha', 'concat', 'uglify']);
};