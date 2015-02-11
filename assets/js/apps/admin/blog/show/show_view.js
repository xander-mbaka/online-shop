define(["app_admin", "tpl!apps/admin/blog/show/templates/blogroll.tpl", "tpl!apps/admin/blog/show/templates/blogitem.tpl", 
	"tpl!apps/admin/blog/show/templates/blogfull.tpl", "tpl!apps/admin/blog/show/templates/commentitem.tpl",
   "tpl!apps/admin/blog/show/templates/blogcreate.tpl", "tpl!apps/admin/blog/show/templates/blogedit.tpl", "backbone.syphon", "wysiwyg", "padvanced"], 
	function(LightningAbstracts, blogRollTpl, blogItemTpl, blogFullTpl, commentItemTpl, blogCreateTpl, blogEditTpl){
  LightningAbstracts.module('BlogApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){

    View.BlogItem = Marionette.ItemView.extend({      

      	template: blogItemTpl,

      	tagName: "li",

      	className: "event",   	

      	events: {
        	"click #btn-view": "viewBlog",
          "click #btn-edit": "editBlog",
          "click #btn-delete": "deleteBlog"
      	},

      	viewBlog: function(e) { 
        	e.preventDefault();
        	e.stopPropagation();
          this.trigger("navigate", this.model);
        	//alert("Head to latest article");
        	//this.trigger("edit:division", this);
      	},

        editBlog: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        deleteBlog: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.BlogRoll = Marionette.CompositeView.extend({

      template: blogRollTpl,

      itemView: View.BlogItem,

      itemViewContainer: "ul",

      events: {
        "click .btn-art": "fetchMore",
        "click .addblog-btn": "create"
      },

      initialize: function(){ },

      onRender: function(){ 

      },

      onShow: function(){ },

      fetchMore: function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("No more currently");
      },

      create: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("create");
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

    View.BlogCreate = Marionette.ItemView.extend({

      template: blogCreateTpl,

      events: {      
        "click .bloglink": "viewBlogHome",
        "click .create-button": "submitClicked"
      },

      initialize: function(){
        //this.collection = this.model.get('comments');
      },

      onShow: function(){
        var editor = new wysihtml5.Editor("blogeditor", {
          toolbar:      "toolbar",
          parserRules:  wysihtml5ParserRules
        });
      },

      viewBlogHome: function (e) {
        e.preventDefault();
        e.stopPropagation(); 
        this.trigger("navblog");
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = {};
        
        data['title'] = $('#blogtitle').text();
        data['content'] = $('#blogeditor').val();
        //alert(JSON.stringify(data));
        data['content'] = data['content'].replace(/"/g, '\'');
        this.trigger("submit", data);
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
      }

    });

    View.BlogEdit = Marionette.ItemView.extend({

      template: blogEditTpl,

      events: {      
        "click .bloglink": "viewBlogHome",
        "click .update-button": "submitClicked"
      },

      initialize: function(){
        //this.collection = this.model.get('comments');
      },

      onShow: function(){
        var editor = new wysihtml5.Editor("blogeditor", {
          toolbar:      "toolbar",
          parserRules:  wysihtml5ParserRules
        });
      },

      viewBlogHome: function (e) {
        e.preventDefault();
        e.stopPropagation(); 
        this.trigger("navblog");
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = {};
        
        data['title'] = $('#blogtitle').text();
        data['content'] = $('#blogeditor').val();
        //alert(JSON.stringify(data));
        data['content'] = data['content'].replace(/"/g, '\'');
        this.trigger("submit", data);
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
      }

    });

  });

  return LightningAbstracts.BlogApp.Show.View;
});
 