var Api = require('./api').Api;

exports.GetMyCrew = function(options) {
  var self = this;

  self.options = options || {};

  self.api = new Api({
    client_secret: self.options.client_secret,
    client_id: self.options.client_id,
    endpoint_url: options.endpoint_url
  });

  this.authenticate = function(username, password, callback) {
    self.api.authenticate(username, password, callback)
  };

  this.index_tasks = function(success) {
    self.api.call("index_tasks", {}, success)
  }

  this.create_tasks = function(args, success) {
    self.api.call("create_tasks", args, success)
  }


}
