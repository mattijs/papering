var log = debug('app');

// Main application class
var App = window.App = (function() {

    var app = {};

    // Wallpaper collection
    var wallpapers = app.wallpapers = new WallpaperCollection();

    // Grid view
    var grid = app.grid = new GridView({
        el: '#grid'
    });

    wallpapers.fetch({ update: true });

    wallpapers.on('add', function(model) {
        grid.add(model);
    });

    grid.render();

    // Return the application
    return app;
})();

