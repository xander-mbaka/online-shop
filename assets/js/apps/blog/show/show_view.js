define(["app", "tpl!apps/blog/show/templates/blogroll.tpl", "tpl!apps/blog/show/templates/blogitem.tpl", 
	"tpl!apps/blog/show/templates/blogfull.tpl", "tpl!apps/blog/show/templates/commentitem.tpl", "backbone.syphon"], 
	function(RealEstate, blogRollTpl, blogItemTpl, blogFullTpl, commentItemTpl){
  RealEstate.module('BlogApp.Show.View', function(View, RealEstate, Backbone, Marionette, $, _){

    View.BlogItem = Marionette.ItemView.extend({      

      	template: blogItemTpl,

      	tagName: "li",

      	className: "event",   	

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

    View.BlogRoll = Marionette.CompositeView.extend({

      template: blogRollTpl,

      itemView: View.BlogItem,

      itemViewContainer: "ul",

      events: {
        "click .btn-art": "fetchMore"
      },

      initialize: function(){ console.log('BookCollectionView: initialize') },

      onRender: function(){ console.log('BookCollectionView: onRender') },

      onShow: function(){ console.log('BookCollectionView: onShow') },

      fetchMore: function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("No more currently");
      }
    });

     View.CommentItem = Marionette.ItemView.extend({      

      	template: commentItemTpl,

      	tagName: "li",  	

      	events: {
        	"click img": "itemClicked"
      	},

      	itemClicked: function(e) {
        	e.preventDefault();
        	e.stopPropagation();
        	alert("Head to latest article");
        	//this.trigger("edit:division", this);
      	}
    });

    View.BlogFull = Marionette.CompositeView.extend({

      template: blogFullTpl,

      itemView: View.CommentItem,

      itemViewContainer: "ul",

      events: {      
        "click .bloglink": "viewBlogHome",
        "click .rpost": "submitClicked"
      },

      initialize: function(){
       	this.collection = this.model.get('comments');
   	  },

      viewBlogHome: function (e) {
        e.preventDefault();
        e.stopPropagation(); 
        this.trigger("navblog");
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("rpost", data, this.model.get('blog_id'));
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
      }

    });

  });

  return RealEstate.BlogApp.Show.View;
});
 