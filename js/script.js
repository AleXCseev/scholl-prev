var landingFunctions = {
	init: function() {
		this.initLibraris()
	}, 

	initLibraris: function() {
	
	
		AOS.init({
			disable : 'mobile',
			once: true,
			duration: 1000,
			offset : 0,
		});
	
		$(window).resize(function() {
			AOS.refresh();
		})

		
	},

}

$(document).ready(function() {
	landingFunctions.init();
});

