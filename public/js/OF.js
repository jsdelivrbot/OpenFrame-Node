var OF = (function($, OF_CONF) {

	var self = {},
		_stream = {},
		_options = {},
		_defaults = {
			interval: 5000
		},
		_timer = null,
		_curItemIndex = 0,
		_totalItems = 0,
		$body = $('body');



	function _init(opts) {
		_options = $.extend(_defaults, opts);

		_loadStream(OF_CONF.stream_url)
			.done(_handleStreamLoaded)
			.fail(_handleStreamFailed);
	}

	function _loadStream(stream_url) {
		return $.getJSON(stream_url);
	}

	function _startStream(stream) {
		console.log('_startStream', stream.name);
		clearInterval(_timer);
		_timer = setInterval(_displayNextItem, _options.interval);
		_displayNextItem();

		// _displayContent(_curItemIndex);
	}

	function _displayNextItem() {
		console.log('_displayContent');

		if (_curItemIndex < _totalItems-1) {
			_curItemIndex += 1;
		} else {
			_curItemIndex = 0;
		}

		var item = _stream.works[_curItemIndex];

		$body.css({
			'background-image': 'url("'+item.url+'")'
		});
	}


	/**
	 * EVENT HANDLERS
	 */

	function _handleStreamLoaded(resp) {
		console.log('_handleStreamLoaded', resp);
		_stream = resp;
		_totalItems = _stream.works.length;
		_startStream(_stream);
	}

	function _handleStreamFailed(err) {
		console.log(err);
	}

	self.init = _init;
	return self;

})(jQuery, OF_CONF);