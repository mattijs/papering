
// Wallpaper Model
var Wallpaper = Backbone.Model.extend({

});

// Wallpaper Collection
var WallpaperCollection = Backbone.Collection.extend({
    model: Wallpaper,
    create: function(data) {
        return new this.model(data);
    },
    sync: function(action, collection, options) {
        // Only allow read syncs
        if (action !== 'read') return;

        log('Synching wallpapers');

        // Fetch the JSON from Reddit
        $.ajax('http://www.reddit.com/r/wallpaper.json', {
            dataType: 'jsonp',
            jsonp: 'jsonp',
            success: function(listing, textStatus, jqXHR) {
                if (!listing.kind || listing.kind.toLowerCase() !== 'listing') {
                    return;
                }
                else if (!listing.data || !listing.data.children) {
                    return;
                }

                var models = listing.data.children.map(function(child) {
                    return collection.create(child.data);
                });

                collection.update(models);
            },
            error: function(jqXHR, textStatus, error) {
                console.log('error', textStatus, error);
            }
        });
    }
});

