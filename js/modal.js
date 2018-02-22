(function(window){
	var $modal = $('.modal');

	var modal = {
		open: function(content, cb) {
			$modal.find('.modal__content-holder').html(content);
			$modal.fadeIn(1000,cb);
		},
		close: function() {
			$modal.fadeOut();
		}
	};

	$modal.find('.modal__close').on('click', function (e){
		
		modal.close();

		e.stopPropagation(); 
	});




	window.modal = modal;

})(window);

