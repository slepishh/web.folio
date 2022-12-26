import webpHtmlNosvg from "gulp-webp-html-nosvg";
import pug from "gulp-pug";
import formatHtml from "gulp-format-html"

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        //.pipe(fileinclude())
        .pipe(pug({
            pretty: true,
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )
        )
        .pipe(formatHtml())
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}