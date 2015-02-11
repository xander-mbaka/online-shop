define(["app", "rslides", "tpl!apps/home/show/templates/searchForm.tpl", 
  "tpl!apps/home/show/templates/latest.tpl", "tpl!apps/home/show/templates/newsletter.tpl", "backbone.syphon"], 
	function(RealEstate, x, searchFormTpl, latestTpl, newsletterTpl){
  RealEstate.module('HomeApp.Show.View', function(View, RealEstate, Backbone, Marionette, $, _){

    View.Newsletter = Marionette.ItemView.extend({
      template: newsletterTpl,

      tagName: 'div',

      classNmae: 'newsletter-tab',

      events: {
      'click a#news-sub': 'submitClicked'
      },

      submitClicked: function(e){
          e.preventDefault();
          var $view = this.$el; 
          var $form = $view.find("form");

          var data = {};
          
          data['name'] = $form.find("input[name=name]").val();
          data['email'] = $form.find("input[name=email]").val();
          if (data['name'] != '' && data['email'] != '') {
            this.trigger("subscribe", data);
          }else{
            alert("Please ensure you fill all fields");
           }
            
        },

        onSubscribeError: function(){
            //var $view = this.$el;
            $("input[name=name]").val("");
            $("input[name=email]").val("");
            $("input[name=name]").focus();
            alert('Subscription failed: This email is already registered.');
        },

        onFormClear: function(){
            $(".newsletter-tab").hide();
            $(".subscribe-overlay").show();
            alert("Subscription accepted");
        }
    });

    View.SearchForm = Marionette.ItemView.extend({      

      template: searchFormTpl,

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
          alert("Comment posted. Thank you");
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

    View.LatestListing = Marionette.ItemView.extend({      

      	template: latestTpl,

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

    View.LatestListings = Marionette.CollectionView.extend({

      itemView: View.LatestListing,

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

  return RealEstate.HomeApp.Show.View;
});
