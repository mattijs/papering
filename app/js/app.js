var log = debug('app');

// Main application class
var App = window.App = (function() {

    var app = {};

    // Wallpaper collection
    var wallpapers = app.wallpapers = new WallpaperCollection();

    // Grid view
    var grid = app.grid = new GridView({
        el: '#grid',
        wallpapers: wallpapers
    });
    grid.render();

    // Fetch the initial set of wallpapers
    wallpapers.fetch({ update: true });


    // Return the application
    return app;
})();

