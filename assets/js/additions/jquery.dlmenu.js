!function(n,i){"use strict";var e=i.Modernizr,t=n("body");n.DLMenu=function(i,e){this.$el=n(e),this._init(i)},n.DLMenu.defaults={animationClasses:{classin:"dl-animate-in-1",classout:"dl-animate-out-1"},onLevelClick:function(){return!1},onLinkClick:function(){return!1}},n.DLMenu.prototype={_init:function(i){this.options=n.extend(!0,{},n.DLMenu.defaults,i),this._config();var t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd",animation:"animationend"},s={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};this.animEndEventName=t[e.prefixed("animation")]+".dlmenu",this.transEndEventName=s[e.prefixed("transition")]+".dlmenu",this.supportAnimations=e.cssanimations,this.supportTransitions=e.csstransitions,this._initEvents()},_config:function(){this.open=!1,this.$trigger=this.$el.children(".dl-trigger"),this.$menu=this.$el.children("ul.dl-menu"),this.$menuitems=this.$menu.find("li:not(.dl-back)"),this.$el.find("ul.dl-submenu").prepend('<li class="dl-back"><a href="#">back</a></li>'),this.$back=this.$menu.find("li.dl-back")},_initEvents:function(){var i=this;this.$trigger.on("click.dlmenu",function(){return i.open?i._closeMenu():i._openMenu(),!1}),this.$menuitems.on("click.dlmenu",function(e){e.stopPropagation();var t=n(this),s=t.children("ul.dl-submenu");if(s.length>0){var o=s.clone().css("opacity",0).insertAfter(i.$menu),a=function(){i.$menu.off(i.animEndEventName).removeClass(i.options.animationClasses.classout).addClass("dl-subview"),t.addClass("dl-subviewopen").parents(".dl-subviewopen:first").removeClass("dl-subviewopen").addClass("dl-subview"),o.remove()};return setTimeout(function(){o.addClass(i.options.animationClasses.classin),i.$menu.addClass(i.options.animationClasses.classout),i.supportAnimations?i.$menu.on(i.animEndEventName,a):a.call(),i.options.onLevelClick(t,t.children("a:first").text())}),!1}i.options.onLinkClick(t,e)}),this.$back.on("click.dlmenu",function(){var e=n(this),t=e.parents("ul.dl-submenu:first"),s=t.parent(),o=t.clone().insertAfter(i.$menu),a=function(){i.$menu.off(i.animEndEventName).removeClass(i.options.animationClasses.classin),o.remove()};return setTimeout(function(){o.addClass(i.options.animationClasses.classout),i.$menu.addClass(i.options.animationClasses.classin),i.supportAnimations?i.$menu.on(i.animEndEventName,a):a.call(),s.removeClass("dl-subviewopen");var n=e.parents(".dl-subview:first");n.is("li")&&n.addClass("dl-subviewopen"),n.removeClass("dl-subview")}),!1})},closeMenu:function(){this.open&&this._closeMenu()},_closeMenu:function(){var n=this,i=function(){n.$menu.off(n.transEndEventName),n._resetMenu()};this.$menu.removeClass("dl-menuopen"),this.$menu.addClass("dl-menu-toggle"),this.$trigger.removeClass("dl-active"),this.supportTransitions?this.$menu.on(this.transEndEventName,i):i.call(),this.open=!1},openMenu:function(){this.open||this._openMenu()},_openMenu:function(){var i=this;t.off("click").on("click.dlmenu",function(){i._closeMenu()}),this.$menu.addClass("dl-menuopen dl-menu-toggle").on(this.transEndEventName,function(){n(this).removeClass("dl-menu-toggle")}),this.$trigger.addClass("dl-active"),this.open=!0},_resetMenu:function(){this.$menu.removeClass("dl-subview"),this.$menuitems.removeClass("dl-subview dl-subviewopen")}};var s=function(n){i.console&&i.console.error(n)};n.fn.dlmenu=function(i){if("string"==typeof i){var e=Array.prototype.slice.call(arguments,1);this.each(function(){var t=n.data(this,"dlmenu");return t?n.isFunction(t[i])&&"_"!==i.charAt(0)?(t[i].apply(t,e),void 0):(s("no such method '"+i+"' for dlmenu instance"),void 0):(s("cannot call methods on dlmenu prior to initialization; attempted to call method '"+i+"'"),void 0)})}else this.each(function(){var e=n.data(this,"dlmenu");e?e._init():e=n.data(this,"dlmenu",new n.DLMenu(i,this))});return this}}(jQuery,window);