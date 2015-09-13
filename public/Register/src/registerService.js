app.factory('RegisterService', ['$resource',
	function($resource){
		
    	return $resource(BASE_URL + "/register", {}, {
	    save: { 
	      method : "POST"
	    }

	   });
}])