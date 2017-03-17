var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var assetRev = require('gulp-asset-rev');

function gulpScripts(app_name) {
    return gulp.src([app_name + '/**/*.js']) //源文件下的所有js
        .pipe(assetRev())                    //配置版本号
        .pipe($.uglify())                    //进行压缩，如果需要合并也可加上合并的代码
        .pipe(gulp.dest(app_name + "_dist"));//复制到目标文件路径
}

function gulpStyles(app_name) {
    return gulp.src([app_name + '/**/*.css'])
        .pipe(assetRev())
        .pipe($.minifyCss())
        .pipe(gulp.dest(app_name + "_dist"));
}

function gulpImages(app_name) {
    return gulp.src([app_name + '/**/images/*']) 
        .pipe(gulp.dest(app_name + "_dist"));   //复制所有图片到目标文件夹
}

function gulpRevHtml(app_name) {
    gulp.src([app_name + '/*.html', app_name + '/**/*.html'])   //源文件下面是所有html
        .pipe(assetRev())                                       //配置引用的js和css文件，需要的话也可以用minifyHtml压缩html文件
        .pipe(gulp.dest(app_name + '_dist'));                   //打包到目标文件夹路径下面
}

gulp.task('app_scripts', function(){
    gulpScripts("src");
});
gulp.task('app_styles', function(){
    gulpStyles("src");
});
gulp.task('app_images',function(){
     gulpImages("src");
});
gulp.task('app_rev', ['app_styles', 'app_scripts'], function(){
    gulpRevHtml("src");
});
gulp.task('clean', del.bind(null, ['app_dist'], {
    force: true
}));
gulp.task("default", function() {
    runSequence('clean', ["app_images", "app_rev"]);
});