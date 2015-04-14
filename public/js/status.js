$(function() {
	$('#status li').each(function(i, item) {
		item = $(item);
		var url = item.data('url');
		var port = item.data('port');
		$.get('/status', {
			url: url,
			port: port
		}).then(function(data) {
			item.addClass(data.available ? 'good' : 'bad');
			if (data.time) {
				item.find('.time').html(data.time.toFixed(2) + 'ms');
				(data.time > 200) && item.addClass('slow');
			} else {
				item.find('.time').html('Time out');
			}
		});
	});
});