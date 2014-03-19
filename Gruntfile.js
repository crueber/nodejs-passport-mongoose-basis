module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          nodeArgs: ['--debug=6858'],
          ignoredFiles: ['node_modules/**', 'views/**', '.git/**', 'assets/**', 'Gruntfile.js'],
          // watchedExtensions: ['js'],
          // watchedFolders: ['server'],
          env: {
            PORT: '4000'
          }
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    snockets: {
      core: {
        src: ['assets/js/*.js'],
        options: {
          concat: {
            header: '<%= meta.header %>',
            destExtension: "debug.js",
            destDir: "<%= meta.buildDirectory %>",
            footer: '<%= meta.footer %>'
          },
          min: {
            header: '<%= meta.header %>',
            destExtension: "js",
            destDir: "<%= meta.buildDirectory %>",
          }
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-barkeep');


  // Default task(s).
  grunt.registerTask('default', ['concurrent']);
};