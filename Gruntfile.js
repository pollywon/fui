var publicDir = '../../ironman/'; //发布目录


module.exports = function (grunt) {
    // 自动加载 grunt 任务
    require('load-grunt-tasks')(grunt);

    // 统计 grunt 任务耗时
    //require('time-grunt')(grunt);

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'build/img/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: '_dist/img' // 优化后的图片保存位置
                }]
            }
        },
        autoprefixer: {
            options: {
                diff: false,
                browsers: ['last 2 versions', 'ios 5', 'android 2.3']
            },

            // prefix all files
            multiple_files: {
                expand: true,
                src: ['build/css/*.css', 'build/css/**/*.css']
            }
        },
        less: {
            dist: {
                expand: true,
                flatten: true,
                cwd: 'build/less',
                src: ['**/*.less'],
                dest: 'build/css/',
                ext: '.css',
                "sourcemap=none": ''
            }

        },
        cssmin: {
            dist: {
                expand: true,
                cwd: 'build/css/',
                src: ['**/*.css'],
                dest: '_dist/css/'
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'build/js',
                    src: '**/*.js',
                    dest: '_dist/js/',
                    ext: '.js'
                }]
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js', '!js/fui.js'],
            options: {
                // 允许多行字符拼接, 在 *.tpl 中常用
                "multistr": true,
                // 允许使用类似这种表达式 $.isFunction( fn ) && fn();
                "expr": true,
                // 允许使用类似这种函数  new Function("obj","return 123")
                "evil": true
            }
        },
        concat: {
            js: {
                src: [
                    'build/js/core/core.js',
                    'build/js/app/*.js'
                ],
                dest: 'js/fui.js'
            }
        },
        copy: {
            font: {
                expand: true,
                src: 'build/font/**/*',
                dest: '_dist'
            },
            cssdebug: {
                expand: true,
                cwd: 'build/css',
                src: '*.css',
                dest: '_dist/css-debug'
            },
            demo: {
                expand: true,
                src: 'build/demo/*.html',
                dest: '<%=pkg.version%>'
            },
            less: {
                expand: true,
                src: 'build/less/**/*',
                dest: '<%=pkg.version%>'
            },
            dist: {
                expand: true,
                cwd: '_dist',
                src: ['font/**/*', 'img/*.{png,jpg,jpeg}',
                    'css/basic.css', 'css/frozen.css',
                    'js/fui.js', 'js/zepto.min.js'],
                dest: 'dist'
            },
            main: {
                expand: true,
                cwd: '_dist',
                src: '**/*',
                dest: '<%=pkg.version%>'
            },
            zip: {
                expand: true,
                cwd: publicDir + '/<%=pkg.version%>',
                src: ['img/**/*',
                    'css/basic.css', 'css/global.css'],
                dest: publicDir + '/<%=pkg.version%>/i.gtimg.cn/vipstyle/frozenui/<%=pkg.version%>'
            }
        },
        replace: {
            img: {
                src: ['<%=pkg.version%>/css/**/*.css', '<%=pkg.version%>/sass/**/*.scss'],
                overwrite: true,
                replacements: [{
                    from: /\.*\.\/img/g,
                    to: function () {
                        return 'http://i.gtimg.cn/vipstyle/frozenui/<%=pkg.version%>/img';
                    }
                },
                    {
                        from: /png\)/g,
                        to: function () {
                            return 'png?_bid=2134&max_age=31536000)';
                        }
                    },
                    {
                        from: /\.*\.\/font/g,
                        to: function () {
                            return 'http://i.gtimg.cn/vipstyle/frozenui/<%=pkg.version%>/font';
                        }
                    },
                    {
                        from: /ttf\)/g,
                        to: function () {
                            return 'ttf?_bid=2134&max_age=31536000)';
                        }
                    }]

            }
        },
        includereplace: {
            html: {
                expand: true,
                cwd: 'build/demo/src',
                src: ['*.html'],
                dest: 'demo/'

            }
        },
        compress: {
            main: {
                cwd: publicDir + '/<%=pkg.version%>',
                options: {
                    archive: publicDir + '/<%=pkg.version%>/i.gtimg.cn.zip'
                },
                expand: true,
                src: ['i.gtimg.cn/**']
            }
        },
        watch: {
            demo: {
                files: [
                    'build/demo/**/*.html'
                ],
                tasks: ['includereplace']
            },
            css: {
                files: [
                    'build/less/**/*.less'
                ],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['build/js/**/*.js', '!build/js/fui.js'],
                tasks: ['concat:js']
            }
        }
    });
    grunt.registerTask('copystatic', ['copy:font', 'copy:cssdebug', 'copy:sass', 'copy:demo', 'copy:dist', 'copy:main']);
    // 默认任务
    grunt.registerTask('default', [
        'less',
        'autoprefixer',
        'cssmin',
        'imagemin',
        'concat:js',
        'uglify',
        'includereplace',
        'watch'
    ]);
    grunt.registerTask('dev', [
        'less',
        'watch:css'

    ]);
    grunt.registerTask('deploy', [
        'replace',
        'copy:vipstyle',
        'copy:zip',
        'compress'
    ]);
    // 根据 docs 的代码片段生成 demo 到 demo/*.html
    grunt.registerTask('demo', ['includereplace']);
};
/**
 * Created by Ironman on 16/8/7.
 */
