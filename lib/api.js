var Client = require('node-rest-client').Client;

var _ = require('underscore');



exports.Api = function(options) {
  var self = this;

  self.options = options || {};

  self.client_id = self.options.client_id;
  self.client_secret = self.options.client_secret;

  self.endpoint = self.options.endpoint_url || "http://www.getmycrew.com/api/v2"
  self.client = new Client();

  self.access_token = null;

  //registering all API methods
  //authentication
  self.client.registerMethod("authenticate", self.endpoint+"/oauth/token", "POST");

  // api methods
  self.client.registerMethod("index_tasks", self.endpoint+"/tasks", "GET");
  self.client.registerMethod("create_tasks", self.endpoint+"/tasks", "POST");
  self.client.registerMethod("index_contacts", self.endpoint+"/contacts", "GET");


  this.authenticate = function(username, password, success) {
    args = {
      headers:{"Content-Type": "application/json"},
      data: {
        client_id: self.client_id,
        client_secret: self.client_secret,
        grant_type: 'assertion',
        assertion_type: 'password',
        username: username,
        password: password
      }
    }

    self.client.methods.authenticate(args, function(data,response) {
      d = JSON.parse(data.toString('utf-8'));
      self.access_token = d.access_token
      console.log("Authentication with "+response.statusCode);
      success.call();
    });

  }

  this.call = function(name, args, success) {
    params = {
      headers: {"Content-Type": "application/json"},
      data:  _.extend( args, { access_token: self.access_token })
    };

    console.log("Calling "+name);
    console.log(params);

    self.client.methods[name](params, function(data,response) {
      console.log("Calling "+name+" with "+response.statusCode);
      d = JSON.parse(data.toString('utf-8'));
      success(d);
    })
  }



}