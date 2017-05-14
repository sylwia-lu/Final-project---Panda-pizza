var gulp = require("gulp");  /*pobiera zaintalowany komponent i zapisuje jego obiekt do zmiennej*/
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var browser = require("browser-sync").create();

gulp.task("sass", function(){
    return gulp.src("scss/style.scss")
        .pipe(sourcemaps.init()) // inicjujemy sorce map na pobranym komponencie
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) /*logError wypisuje blad w konsoli ale nie zatrzymuje nasluchiwania */
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browser.stream());
});

gulp.task("reload", function() {
    browser.reload();
})

gulp.task("serwer", function(){
    browser.init({
        server: "./"
    });
});

gulp.task("watch", ['serwer'],function(){
    gulp.watch(["scss/**/*.scss"], ["sass"]);
    gulp.watch(["*.html", "js/**/*.js"], ["reload"]);
});
