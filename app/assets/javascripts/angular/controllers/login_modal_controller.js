function popupCenter(url, width, height, name) {
    var left = (screen.width/2)-(width/2);
    var top = (screen.height/2)-(height/2);
    return window.open(url, name, "menubar=no,toolbar=no,status=no,width="+width+",height="+height+",toolbar=no,left="+left+",top="+top);
}

var LoginModalController = ['$scope','$modalInstance', function ($scope, $modalInstance) {
    $scope.login = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('Canceled');
    };
    $scope.auth = function(e){
        var $this = jQuery(e.target);
        $scope.error = null;
        popupCenter($this.attr("href"), $this.data('width'), $this.data('height'), 'authPopup');
        e.preventDefault();
    }

    window.modalAuthSuccess = function() {
        $modalInstance.close('ok');
    }
    window.modalAuthFailure = function(error) {
        $scope.error = error;
        $scope.$apply();
    }
}];
