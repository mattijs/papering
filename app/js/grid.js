"use strict";
(function(exports) {

    // Grid view
    var GridView = exports.GridView = Backbone.View.extend({
        tagName: 'ul',
        initialize: function(options) {
            // The wallpapers collection to create a grid of
            this.wallpapers = options.wallpapers;

            // The collection of Tiles per Wallpaper
            this.tiles = {};

            // The Gridster object
            this.grid = null;

            // Add some handlers for wallpaper events
            this.wallpapers.on('add', this.add, this);
            this.wallpapers.on('remove', this.remove, this);
            this.wallpapers.on('change', this.update, this);
            this.wallpapers.on('reset', this.reset, this);
        },

        // Add a Wallpaper model to the Grid
        add: function(wallpaper) {
            // Create a new Tile for the Wallpaper
            var tile = new TileView({
                wallpaper: wallpaper
            });

            // Add the rendered tile to the Grid
            this.grid.add_widget(tile.render());
            return;


            var item = $('<li></li>')
                .data('wid', wallpaper.id);

            // Build the image
            var img = $('<img />')
                .attr('title', wallpaper.get('title'))
                .attr('src', wallpaper.get('url'))
                .attr('width', '140px');

            // Add the image
            item.append(img);

            // Add the widget
            this.grid.add_widget(item);
        },

        // Remove a Wallpaper model from the grid
        remove: function() {
            // Find the corresponding Tile for the wallpaper

            // Remove the tile from the Grid and delete it

        },

        // Update a tile in the Grid
        update: function(wallpaper) {
            // Find the corresponding Tile for the Wallpaper
        },

        // Reset the grid view. This removes all Tiles and rerenders the wallpaper collection again.
        reset: function() {
            // Remove all Tiles gracefully
        },

        // Render the Grid.
        render: function() {
            // Check if the grid already in place
            if (!this.grid) {
                // Create the Grid container
                this.$el.append($('<ul></ul>'));

                // Initialize Gridster
                this.grid = this.$el.find('ul').gridster({
                    widget_base_dimensions: [400, 250],
                    max_size_x: 2,
                    max_size_y: 2
                }).data('gridster').disable();
            }

            // Return the element
            return this.$el;
        }
    });

    // Compile the template for Tiles
    var tileTemplate = Handlebars.compile($('#tile-tmpl').html());

    // A single wallpaper tile in the GridView
    var TileView = exports.Backbone.View.extend({
        tagName: 'li',
        initialize: function(options) {
            // Store the model for the tile
            this.model = options.wallpaper;

            // Watch the model for changes
        },
        // Render the Tile
        render: function() {
            var el = this.$el;
            el.children().remove(); // clear previous renders

            var template = tileTemplate({
                title: this.model.get('title'),
                url:   this.model.get('url')
            });
            el.append(template)
            return el;
        }
    });

})(window);
