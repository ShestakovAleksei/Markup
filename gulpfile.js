const   gulp = require('gulp'),
        autoprefixer = require('gulp-autoprefixer'),
        cleanCss = require('gulp-clean-css'),
        fileInclude = require('gulp-file-include'),
        fonter = require('gulp-fonter'),
        groupMedia = require('gulp-group-css-media-queries'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        ttf2woff = require('gulp-ttf2woff'),
        ttf2woff2 = require('gulp-ttf2woff2'),
        uglifyEs = require('gulp-uglify-es').default,
        // browserSync = require('browser-sync'),
        iconfont = require('gulp-iconfont'),
        iconfontCss = require('gulp-iconfont-css'),
        { dest } = require('vinyl-fs'),
        criticalCss = require('gulp-critical-css'),
        addSource = require('gulp-add-source-picture'),
        sizeOf = require('image-size'),
        {watch, series} = require('gulp');

//server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: 'build'
//         }
//     });
// });


gulp.task('html', function () {
    return  gulp.src('src/index.html')
            .pipe(fileInclude())
            .pipe(dest('build'))
            .pipe(addSource('build/img'))
            .pipe(dest('build'));
});

gulp.task('css', function() {
    return  gulp.src('src/styles/**/*.scss')
            .pipe(sass({
                outputStyle: 'expanded'
            }))
            .pipe(groupMedia())
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ['last 2 versions'],
                    cascade: true
                })
            )
            .pipe(dest('build/styles'))
            .pipe(criticalCss())
            .pipe(dest('build/styles'))
            .pipe(cleanCss())
            .pipe(
                rename({
                    extname: '.min.css'
                })
            )
            .pipe(dest('build/styles'))
});




gulp.task('js', function() {
    return  gulp.src('src/js/**/*.js')
            .pipe(fileInclude())
            .pipe(dest('build/js'))
            .pipe(uglifyEs())
            .pipe(
                rename({
                    extname: '.min.js'
                })
            )
            .pipe(dest('build/js'))
            // .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
    return  gulp.src('src/assets/img/**/*')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 3}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(dest('build/img'))
            // .pipe(browserSync.reload({stream: true}));
});


const fontName = 'icons';
gulp.task('icon', async function() {
            gulp.src('src/assets/icons/*.svg')
            .pipe(iconfontCss({
                targetPath  : '../../src/styles/common/_icons.scss',
                fontPath    : '../fonts/',
                fontName    : fontName
            }))
            .pipe(iconfont({
                fontName    : fontName,
                formats     : [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
                normalize   : true,
                fontHeight  : 1001
            }))
            .pipe(gulp.dest('build/fonts/'));
});

gulp.task('fonts', async function() {
            gulp.src('src/assets/fonts/*.ttf')
            .pipe(ttf2woff())
            .pipe(dest('build/fonts'));
            gulp.src('src/assets/fonts/*.ttf')
            .pipe(ttf2woff2())
            .pipe(dest('build/fonts'));
            gulp.src('src/assets/fonts/*.otf')
            .pipe(fonter({
                formats: ['ttf']
            }))
            .pipe(dest('build/fonts'));
});


gulp.task('watcher', function(){
    watch('src/**/**/*.{html,scss,js}', series('html','css','js'));
});


exports.assets = series('fonts','icon', 'img')

exports.default = series('watcher');




//  gulp-add-source-picture using   -   -   - 

            // <picture>
            //     <img src="../images/image.jpg" alt="example">
            // </picture>

// critical css using   -   -   -

            // .my-selector {
            //     critical: this;
            // }

// assets use to:
            //  convert svg icons to iconFont.css
            //  optimaze images
            // convert *.ttf and *.otf fonts to *.woff and *.woff2
