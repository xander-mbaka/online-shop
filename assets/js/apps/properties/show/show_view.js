define(["app", "tpl!apps/properties/show/templates/properties.tpl", 
	"tpl!apps/properties/show/templates/property_item.tpl", "tpl!apps/properties/show/templates/result_title.tpl",
  "tpl!apps/properties/show/templates/property_search.tpl", "backbone.syphon"], 
  function(RealEstate, propertiesTpl, propertyItemTpl, resultTitleTpl, propertySearchTpl){
  RealEstate.module('PropertiesApp.Show.View', function(View, RealEstate, Backbone, Marionette, $, _){

    View.PropertyItem = Marionette.ItemView.extend({      

      	template: propertyItemTpl,

      	tagName: "li",

      	className: "aproperty",

      	events: {
        	"click .img": "itemClicked",
          "click .p": "itemClicked"
      	},

      	itemClicked: function(e) {
        	e.preventDefault();
        	e.stopPropagation();
        	alert("Head to latest article");
        	//this.trigger("edit:division", this);
      	}
    });

    View.ResultTitle = Marionette.ItemView.extend({      

        template: resultTitleTpl,

    });

    View.Properties = Marionette.CollectionView.extend({

      itemView: View.PropertyItem,

      tagName: "ul",

      attributes: function() {
          return {
            'id': 'search-results'
          };
        },

      events: {
        "click li.ajournal": "viewNode"
      },

      onShow: function () {
      },

      viewNode: function (e) {
        e.preventDefault();
        e.stopPropagation();
        //alert("boom");
      }
    });

    View.SearchForm = Marionette.ItemView.extend({      

      template: propertySearchTpl,

      events: {
        "click button.lab-button": "submitClicked", 
        "change #propcat": "category",
        "change #rangeInputx": "rangeChange"
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("search", data);
      },

      onShow: function(){

      },

      rangeChange: function(e) {
        var $view = this.$el;
          $view.find("#textInputx").each(function(){
            $(this).val(document.getElementById('rangeInputx').value);
          });
      },

      onFormClear: function(){
          var $view = this.$el;
          //$("input[name=password]").val("");
          //$("input[name=password]").focus();
          var $form = $view.find("form");
          $form.find("input").each(function(){
            $(this).val("");
          });
          $form.find("textarea").each(function(){
            $(this).val("");
          });
          $("input[name=comname]").focus();
          alert("Thank you");
      },

      category: function(e){
        e.preventDefault();
        e.stopPropagation();
        var category = ["residential", "commercial", "land" ];
        var m = document.getElementById('propcat').value;
        var $view = this.$el;

        for (var i = category.length - 1; i >= 0; i--) {
          if (category[i] == m) {
            $view.find("."+ category[i]).each(function(){
              $(this).show();
            });
          } else{
            $view.find("."+ category[i]).each(function(){
              $(this).hide();
            });
          };
          
        };
      }
    });

  });

  return RealEstate.PropertiesApp.Show.View;
});
 