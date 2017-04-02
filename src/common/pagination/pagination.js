angular.module("common.pagination").factory("paginationSrv", function(){

	return function (_currentPage, totalPages){

		var _pagArray = [];

		// First
		if( _currentPage != 1){
			_pagArray.push({
				value: '1',
				pageDestination: 1
			});
		}

		// Ellipsis start
		if (_currentPage > 3){

			_pagArray.push({
				value: '...',
				pageDestination: _currentPage - 3
			});
		}

		

		// Page before 2
		if((_currentPage - 2) > 1){
			_pagArray.push({
				value: (_currentPage - 2),
				pageDestination: _currentPage - 2
			});
		}

		// Page before
		if((_currentPage - 1) > 1){
			_pagArray.push({
				value: _currentPage - 1,
				pageDestination: _currentPage - 1
			});
		}

		// Current page
		_pagArray.push({
			value: _currentPage,
			pageDestination: _currentPage
		});

		// Page after
		if( (_currentPage + 1) < totalPages){
			_pagArray.push({
				value: _currentPage + 1,
				pageDestination: _currentPage + 1
			});
		}

		// Page after 2
		if( (_currentPage + 2) < totalPages){
			_pagArray.push({
				value: _currentPage + 2,
				pageDestination: _currentPage + 2
			});
		}

		// Ellipsis end
		if ((totalPages - _currentPage) >= 3 ){

			_pagArray.push({
				value: '...',
				pageDestination: _currentPage + 3
			});
		}

		// Last page
		if( _currentPage != totalPages){
			_pagArray.push({
				value: totalPages,
				pageDestination: totalPages
			});
		}

		return {
			currentPage: _currentPage,
			pagList: _pagArray
		};
	}	
})
