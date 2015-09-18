var Api = require('./api').Api;

exports.GetMyCrew = function(options) {
  var self = this;

  self.options = options || {};

  self.api = new Api({
    client_secret: self.options.client_secret,
    client_id: self.options.client_id,
    endpoint_url: options.endpoint_url
  });

  this.authenticate = function(username, password) {
    return self.api.authenticate(username, password)
  }

  this.index_tasks = function() {
    return self.api.index_tasks();
  }

  this.create_tasks = function(args) {
    return self.api.create_tasks(args);
  }

  this.show_task = function(id) {
    return self.api.show_task(id)
  }


}
