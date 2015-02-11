define(["app_admin", "tpl!apps/admin/footer/show/templates/footer.tpl"], function(LightningAbstracts, footerTpl){
  LightningAbstracts.module('FooterApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){
    View.Footer = Marionette.ItemView.extend({
      template: footerTpl,

      events: {
      },

      initialize: function(){ 


      },

      onRender: function(){ },

      onShow: function(){
      	var $view = this.$el;
        //$("input[name=password]").val("");
        //$("input[name=password]").focus();
        var $time = $view.find(".time");
        var $date = $view.find(".date");
        var $day = $view.find(".day");
        var $monthyear = $view.find(".month-year");

        var currentDate = new Date();

		var monthNames = [ "January", "February", "March", "April", "May", "June",
		 "July", "August", "September", "October", "November", "December" ];

		var dayNames = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
		 "Sunday" ];

		$date.text(currentDate.getDate());
		$day.text(dayNames[currentDate.getDay()]);
		$monthyear.text(monthNames[currentDate.getMonth()] + ', ' + currentDate.getFullYear());



		function formatAMPM(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
		}


        setInterval(function(){
		
			var currentDate = new Date();

			var monthNames = [ "January", "February", "March", "April", "May", "June",
			 "July", "August", "September", "October", "November", "December" ];

			var dayNames = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
			 "Sunday" ];

			$date.text(currentDate.getDate());
			$day.text(dayNames[currentDate.getDay()]);
			$monthyear.text(monthNames[currentDate.getMonth()] + ', ' + currentDate.getFullYear());
		
		},60000);

      	setInterval(function(){
		
			var currentTime = new Date();

			$time.text(formatAMPM(currentTime));
		
		},1000);

      }
    });
  });

  return LightningAbstracts.FooterApp.Show.View;
});
