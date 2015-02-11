define(["app", "tpl!common/templates/loading.tpl", "tpl!common/templates/featured.tpl", "spin.jquery"], function(RealEstate, loadingTpl, featuredTpl){
  RealEstate.module('Common.Views', function(Views, RealEstate, Backbone, Marionette, $, _){
    Views.Loading = Marionette.ItemView.extend({
      template: loadingTpl,

      serializeData: function(){
        return {
          title: this.options.title || "Loading Data",
          message: this.options.message || "Please wait, data is loading."
        }
      },

      onShow: function(){
        var opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 30, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '30px', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        };
        $('#spinner').spin(opts);
      }
    });

    Views.FeaturedListing = Marionette.ItemView.extend({      

        template: featuredTpl,

        tagName: "li",    

        events: {
          "click .btn": "itemClicked"
        },

        itemClicked: function(e) { 
          e.preventDefault();
          e.stopPropagation();
            this.trigger("navigate", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    Views.FeaturedListings = Marionette.CollectionView.extend({

      itemView: Views.FeaturedListing,

      events: {
        //"click .btn-art": "fetchMore"
      },

      fetchMore: function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("No more currently");
      }
    });

  });

  return RealEstate.Common.Views;
});
