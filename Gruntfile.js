/**
 * Created by TODO http://www.lightcolors.cn on 16/8/7.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        image: {
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: '_src/img' // 优化后的图片保存位置
                }]
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

        }


    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('less', ['less']);


};