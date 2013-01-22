"use strict";
(function(exports) {

    // Wallpaper Model
    var Wallpaper = Backbone.Model.extend({

    });

    // URL patters we accept
    var accepted = [
        new RegExp('^https?://(?:[a-z0-9]*\.)?imgur.com', 'i'),
        new RegExp('^https?://(?:[a-z0-9]*\.)?deviantart.(?:net|com)/(?:[a-z0-9\-_%]*/)*[a-z0-9\-_%]*\.(?:jpg|png)$', 'i')
    ];

    // Check if a value is an accepted URL
    function acceptedUrl(value) {
        if (!value) return false;

        var valid = accepted.reduce(function(result, regex) {
            return result || regex.test(value);
        }, false);

        return valid;
    }

    // Wallpaper Collection
    exports.WallpaperCollection = Backbone.Collection.extend({
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

                    // Convert the JSON data to models
                    var models = listing.data.children
                        .filter(function(child) {
                            return (child.data) ? acceptedUrl(child.data.url) : false;
                        })
                        .map(function(child) {
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

})(window);
