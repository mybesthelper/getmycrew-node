var _ = require('underscore');
var fetch = require('node-fetch');

exports.Api = function(options) {
  var self = this;

  self.options = options || {};

  self.client_id = self.options.client_id;
  self.client_secret = self.options.client_secret;

  self.endpoint = self.options.endpoint_url || "http://www.getmycrew.com/api/v2"

  self.access_token = null;

  // //registering all API methods
  // //authentication
  // self.client.registerMethod("authenticate", self.endpoint+"/oauth/token", "POST");

  // // api methods
  // self.client.registerMethod("index_tasks", self.endpoint+"/tasks", "GET");
  // self.client.registerMethod("create_tasks", self.endpoint+"/tasks", "POST");
  // self.client.registerMethod("show_task", self.endpoint+"/tasks/${id}", "GET");


  this.authenticate = function(username, password) {
    args = {
      client_id: self.client_id,
      client_secret: self.client_secret,
      grant_type: 'assertion',
      assertion_type: 'password',
      username: username,
      password: password
    }

    return fetch(self.endpoint+'/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      }).then(function(response) {
        console.log(response.status);
        return response.json()
      }).then(function(json) {
        self.access_token = json.access_token
        console.log('parsed json', json)
        return json.access_token
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  this.index_tasks = function() {
    return fetch(self.endpoint+'/tasks?access_token='+self.access_token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ''
      }).then(function(response) {
        console.log(response.status);
        return response.json()
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  }

  this.show_task = function(id) {
    return fetch(self.endpoint+'/tasks/'+id+'?access_token='+self.access_token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ''
      }).then(function(response) {
        console.log(response.status);
        return response.json()
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  }


  this.create_tasks = function(params) {

    params = _.extend(params, { access_token: self.access_token });

    return fetch(self.endpoint+'/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }).then(function(response) {
        console.log(response.status);
        return response.json()
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  }



}