app.factory('Level', ['$resource', function($resource) {
    function Level() {
        this.service = $resource('/api/levels/:levelSlug', {levelSlug: '@slug'});
    };
    Level.prototype.all = function() {
        return this.service.query();
    };
    Level.prototype.get = function(id) {
        return this.service.get({levelSlug: id});
    };
    Level.prototype.delete = function(id) {
        return this.service.remove({levelSlug: id});
    };
    Level.prototype.save = function(data) {
        return this.service.save(data);
    };
    return new Level;
}]);