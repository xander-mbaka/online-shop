define(["app_admin", "tpl!apps/admin/subscribers/show/templates/subscribers.tpl", "tpl!apps/admin/subscribers/show/templates/subscriberitem.tpl", 
	"tpl!apps/admin/subscribers/show/templates/edit_subscriber.tpl", "backbone.syphon"], 
	function(LightningAbstracts, subscribersTpl, subscriberItemTpl, editSubscriberTpl){
  LightningAbstracts.module('SubscribersApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){

    View.SubscriberItem = Marionette.ItemView.extend({      

      	template: subscriberItemTpl,

      	tagName: "tr",   	

      	events: {
          "click .js-edit": "editClicked",
          "click .js-delete": "deleteClicked"
      	},

        editClicked: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
        },

        deleteClicked: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model.get('user_id'));
        }
    });

    View.Subscribers = Marionette.CompositeView.extend({

      template: subscribersTpl,

      itemView: View.SubscriberItem,

      itemViewContainer: "tbody",

      events: {
        "click .btn-art": "fetchMore",
        "change #lab-afilter": "filter",
        "keyup #lab-asearch": "search"
      },

      initialize: function(){ 
        
      },

      onRender: function(){  },

      onShow: function(){ 
        this.$el.on('keyup keypress', 'form input[type="text"]', function(e) {
          if(e.which == 13) {
            e.preventDefault();
            return false;
          }
        });
      },

      fetchMore: function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("No more currently");
      },

      filter: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $view = this.$el;
        var $form = $view.find("form");
        var key = $view.find('#lab-afilter').val();
        //alert(key);
        this.trigger('filter', key);       
      },

      search: function (e) {
        if(e.which == 13)
        {
          e.preventDefault();
          e.stopPropagation();
          var $view = this.$el;
          var $form = $view.find("form");
          var name = $view.find('#lab-asearch').val();
          //alert(name);
          this.trigger('search', name);
        }
      }
    });

   View.Subscriber = Marionette.ItemView.extend({      

        template: editSubscriberTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .update-button": "updateSubscriber"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },

        onFormDone: function(){
          $("#lightbox").removeClass("active");
          this.close();
        },

        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        updateSubscriber: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['userId'] = this.model.get('user_id');
          //alert(JSON.stringify(data));
          this.trigger("update", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });
  });

  return LightningAbstracts.SubscribersApp.Show.View;
});
 