$(document).ready(function() {

	$('.button-shameel').on('click', function(){
		var curButton = $('.button-shameel');
		curButton.removeClass('btn-primary');
		curButton.addClass('btn-success');
		curButton.attr('disabled','true');
		$.post('/request/shameel', function(data, status){
		});
		curButton.text('Requested');
	})

})
