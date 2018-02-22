(function(window,Handlebars){
	var $gallery, $mainImage;
	var template = Handlebars.compile($('#gallery-template').html());

	var _changeImage = function () {
		$gallery = $('.gallery');
		$mainImage = $gallery.find('#main-image');
		var newImageSrc = $(this).data('url');

		$mainImage.fadeOut(1000, function(){
			$mainImage.attr('src',newImageSrc);
			$mainImage.fadeIn();
		});
		
	}



	var gallery = {
		load: function(idAlbum) {
			var html = template({album: window.albums[idAlbum]});
			modal.open(html, function(){
				$('.gallery__pictures > img').on('click', _changeImage);	
			});
			
			
		}
	};




	window.gallery = gallery;

})(window,Handlebars);

