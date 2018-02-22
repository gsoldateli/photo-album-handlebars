(function(window,Handlebars){
	var albums;
	var $albumHolder = $('#album-holder');
	var template = Handlebars.compile($('#album-list-template').html());

	Handlebars.registerPartial(
		'album-item', 
		$('#album-item-template').html()
	);
	
	var loadAlbums = function () {
		var html = template({ 
			albums: albums
		});

		$albumHolder.append(html);

		$albumHolder.find('.album-item').on('click', function(){
			gallery.load($(this).data('album-id'));
		});
	}

	var _splitPicturesByAlbums = function (pictures) {

		for(var iAlbum = 0; iAlbum < albums.length; iAlbum++) {
			var album = albums[iAlbum];
				var albumPictures = pictures.filter(function(picture){
				return picture.albumId == album.id;
			});
			albums[iAlbum].pictures = albumPictures;
		}

		window.albums = albums;
	}
	 
	$.get('datasource/albums.json', function (response) {
		albums = response;
		$.get('datasource/photos.json', function (response) {
			var jsonPicures = response;
			_splitPicturesByAlbums(jsonPicures);
			loadAlbums();
		});	
		
	});

})(window,Handlebars);