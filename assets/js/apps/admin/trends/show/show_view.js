define(["app_admin", "tpl!apps/admin/trends/show/templates/indicators.tpl", "tpl!apps/admin/trends/show/templates/indicator_item.tpl"], 
	function(LightningAbstracts, indicatorsTpl, indicatorItemTpl){
  LightningAbstracts.module('TrendsApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){

    View.IndicatorItem = Marionette.ItemView.extend({      

      	template: indicatorItemTpl,

      	tagName: "li",

      	className: "anindicator",   	

      	events: {
        	"click li.isection": "itemClicked"
      	},

      	itemClicked: function(e) {
        	e.preventDefault();
        	e.stopPropagation();
        	alert("Head to latest article");
        	//this.trigger("edit:division", this);
      	}
    });

    View.Indicators = Marionette.CompositeView.extend({

      template: indicatorsTpl,

      itemView: View.IndicatorItem,

      itemViewContainer: "ul",

      events: {
        "click .node:first": "viewNode"
      },

      initialize: function(){ console.log('BookCollectionView: initialize') },

      onRender: function(){ console.log('BookCollectionView: onRender') },

      onShow: function(){ console.log('BookCollectionView: onShow') },

      viewNode: function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

  });

  return LightningAbstracts.TrendsApp.Show.View;
});
 