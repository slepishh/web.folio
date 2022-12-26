import concat from "gulp-concat";
import webpack from "webpack-stream";

export const vendorJs = () => {
    return app.gulp.src(app.path.src.vendorJs, {sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "vendorJs",
                message: "Error: <% error.message %>"
            }))
        )
        .pipe(concat('vendor.min.js'))
        .pipe(app.gulp.dest(app.path.build.vendorJs))
        .pipe(app.plugins.browsersync.stream());
}