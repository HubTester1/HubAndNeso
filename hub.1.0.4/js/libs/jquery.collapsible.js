/**
* --------------------------------------------------------------------
* jQuery collapsible plugin
* Author: Scott Jehl, scott@filamentgroup.com
* Copyright (c) 2009 Filament Group
* licensed under MIT (filamentgroup.com/examples/mit-license.txt)
* --------------------------------------------------------------------
*/


// NOTE: "$" changed to "jQuery" for Drupal compatibility

jQuery.fn.collapsible = function(){
return jQuery(this).each(function(){

//define
var collapsibleHeading = jQuery(this);
var collapsibleContent = collapsibleHeading.next();

//modify markup & attributes
collapsibleHeading.addClass('collapsible-heading')
.prepend('<span class="collapsible-heading-status"></span>')
.wrapInner('<a href="#" class="collapsible-heading-toggle"></a>');

collapsibleContent.addClass('collapsible-content');

//events
collapsibleHeading
.bind('collapse', function(){
jQuery(this)
.addClass('collapsible-heading-collapsed')
.find('.collapsible-heading-status').text('Show ');

collapsibleContent.slideUp(function(){
jQuery(this).addClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden',true);
});
})
.bind('expand', function(){
jQuery(this)
.removeClass('collapsible-heading-collapsed')
.find('.collapsible-heading-status').text('Hide ');

collapsibleContent
.slideDown(function(){
jQuery(this).removeClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden',false);
});
})
.click(function(){
if( jQuery(this).is('.collapsible-heading-collapsed') ){
jQuery(this).trigger('expand');
}
else {
jQuery(this).trigger('collapse');
}
return false;
})
.trigger('collapse');
});
};