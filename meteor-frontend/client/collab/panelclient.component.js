


angular.module('iaas-collaboratif').directive('collab', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/collab/panelclient.html',
    controllerAs: 'collab',
    controller: function ($scope, $reactive, $modal) {
      $reactive(this).attach($scope);

	    this.bashpwd = function () {
			Meteor.call('bashpwd', function (err, response) {
	  			console.log(response);
			});
		};
    }
  	}
});