

var GridView = Backbone.View.extend({
    tagName: 'ul',
    add: function(wallpaper) {
        var item = $('<li></li>');

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
    // Update the Grid with a set of wallpapers
    update: function(wallpapers) {
        if (!wallpapers) return;
        log('Updating grid with wallpapers');
    },

    // Render the Grid
    render: function() {
        this.$el.append($('<ul></ul>'));
        this.grid = this.$el.find('ul').gridster().data('gridster');

        // Return the element
        return this.$el;
    }

});
