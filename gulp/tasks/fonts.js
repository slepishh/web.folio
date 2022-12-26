export const fonts = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/**`, {})
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**`))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
