module.exports = function (grunt) {

	'use strict';

	var util = require("util"),
		jsSrcFile = 'src/js/app/app.js',
		jsFile = 'app.min.js',
		jsDistDir = 'dist/js/',
		libsDir = 'src/js/libs/',
		libFile_log = libsDir + "log.js",
		libFile_swiftclick = libsDir + "swiftclick.js",
		libFile_bannerhammer = libsDir + "bannerhammer.js",
		libFile_enabler = libsDir + "doubleclick-enabler.js",

		browserifyShim = {

			log: {
				path: libFile_log,
				exports: "log"
			},

			swiftclick: {
				path: libFile_swiftclick,
				exports: "swiftclick"
			},

			bannerhammer: {
				path: libFile_bannerhammer,
				exports: "bannerhammer"
			},

			enabler: {
				path: libFile_enabler,
				exports: "enabler"
			}
		},


		browserifyAliasLibFilesArray = [
			libFile_log + ':log',
			libFile_swiftclick + ':swiftclick',
			libFile_bannerhammer + ':bannerhammer',
			libFile_enabler + ":enabler"
		],

		// a variable to alias app js files, allowing them to be
		// require'd without any complicated relative filepaths.
		browserifyAliasAppFilesArray = aliasMappingsToAliasArray({
			
			cwd: 'src/js/app',
			src: ['**/*.js'],
			dest: ''
		}),

		// combine both alias arrays.
		browserifyAliasAllFilesArray = browserifyAliasLibFilesArray.concat(browserifyAliasAppFilesArray);


	// Takes grunt-browserify aliasMappings config and converts it into an alias array
	function aliasMappingsToAliasArray(aliasMappings)
	{
		var aliasArray = [],
			aliases = util.isArray(aliasMappings) ? aliasMappings : [aliasMappings];

		aliases.forEach(function (alias) {

			grunt.file.expandMapping(alias.src, alias.dest, {cwd: alias.cwd}).forEach(function(file) {
				
				var expose = file.dest.substr(0, file.dest.lastIndexOf('.'));
				aliasArray.push('./' + file.src[0] + ':' + expose);
			});
		});

		return aliasArray;
	}

	// ====================
	// ====================

	// Project configuration.
	grunt.initConfig({

		browserify: {

			dev: {

				options : {
					debug: true,
					shim: browserifyShim,
					alias: browserifyAliasAllFilesArray,
				

				},

				src: jsSrcFile,
				dest: jsDistDir + jsFile
			},

			deploy: {

				options : {
					debug: false,
					shim: browserifyShim,
					alias: browserifyAliasAllFilesArray,
					transform: ['uglifyify']

				},

				src: jsSrcFile,
				dest: jsDistDir + jsFile
			}
		},


		/**
		 * Sass compilation
		 * https://github.com/gruntjs/grunt-contrib-sass
		 * Separate options for dev and production environments
		 * Includes bannerhammer.scss by default
		 * Also creates source maps
		 */
		sass: {


			dev: {
				options: {
					unixNewlines: true,
					style: 'expanded',
					lineNumbers: false,
					debugInfo : false,
					precision : 8,
					sourcemap : true
				},
				files: {
					'dist/css/bannerhammer.css': 'src/scss/bannerhammer.scss'
				}
			},

			deploy: {
				options: {
					style: 'compressed',
					precision : 8
				},
				files: {
					'dist/css/bannerhammer.css': 'src/scss/bannerhammer.scss'
				}

			}
		},


		/**
		 * Autoprefixer
		 * https://github.com/ai/autoprefixer
		 * Auto prefixes your CSS using caniuse data
		 */
		autoprefixer: {
			dist : {
				options: {
					// support the last 2 browsers, any browsers with >5% market share,
					// and ensuring we support IE9 and Anroid 4 stock browsers with prefixes
					browsers: ['> 5%', 'last 2 versions', 'ie >= 9', 'Android 4'],
					map: true
				},
				files: {
					'dist/css/bannerhammer.css': 'dist/css/bannerhammer.css'
				}
			}
		},


		/**
		 * CSSO
		 * https://github.com/t32k/grunt-csso
		 * Minify CSS files with CSSO
		 */
		csso: {
			dist: {
				
				options: {
					restructure: false
				},

				files: {
					'dist/css/bannerhammer.css' : 'dist/css/bannerhammer.css'
				},
			}
		},


		/**
		 * Watch
		 * https://github.com/gruntjs/grunt-contrib-watch
		 * Watches your scss, js etc for changes and compiles them
		 */
		watch: {
			scss: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass:dev', 'autoprefixer:dist']
			},

			js: {
				files: [
					'Gruntfile.js',
					'src/js/app/**/*.js',
					'src/js/libs/**/*.js'
				],

				tasks: ['browserify:dev']
			},
			
			livereload: {
				options: { livereload: true },
				files: [
					'dist/css/*.css'
				]
			}
		},

		/**
		 * Connect
		 * https://github.com/gruntjs/grunt-contrib-connect
		 * Start a static web server
		 */
		connect: {
			server: {
				options: {
					port: 8000,
					hostname: '0.0.0.0',
					open: true,
					livereload: true,
					base: 'dist'
				}
			}
		},

	  htmlbuild: {
        dist: {
            src: 'src/templates/index.html',
            dest: 'dist/output',
            options: {
                beautify: true,
                prefix: '//some-cdn',
                relative: true,
                
                   
                },
               
                sections: {
                  //  views: '<%= fixturesPath %>/views/**/*.html',
                  //  templates: '<%= fixturesPath %>/templates/**/*.html',
                 //  layout: {
                  //      header: '<%= fixturesPath %>/layout/header.html',
                  //      footer: '<%= fixturesPath %>/layout/footer.html'
                   // }
                },
                data: {
                    // Data to pass to templates
                    version: "0.1.0",
                    title: "test",
                },
            }
         }
	});


	// Load all the grunt tasks.
	require('load-grunt-tasks')(grunt);

	// =============
	// === Tasks ===
	// =============

	/**
	 * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask('serve', function (target) {
		grunt.task.run(['browserify:dev', 'sass:dev', 'autoprefixer:dist', 'connect:server', 'watch']);
	});

	// A task for creating a development build.
	grunt.registerTask('dev', ['browserify:dev', 'sass:dev', 'autoprefixer:dist']);

	// A task for creating a deployment build.
	grunt.registerTask('deploy', ['browserify:deploy', 'sass:deploy', 'autoprefixer:dist', 'csso:dist']);



};
