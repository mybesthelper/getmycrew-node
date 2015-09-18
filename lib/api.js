var _ = require('underscore');
var interpolate = require('interpolate');

exports.Api = function(options) {
  var self = this;

  self.options = options || {};

  self.client_id = self.options.client_id;
  self.client_secret = self.options.client_secret;

  self.endpoint_url = self.options.endpoint_url || "http://staging.getmycrew.com/api/v2"

  self.access_token = null;
  this.status = 'disconnected'

  this.api = {}

  this.api = {
    index_tasks: { url: self.endpoint_url+"/tasks?access_token={access_token}", method: 'GET' },
    show_tasks: { url: self.endpoint_url+"/tasks/{id}?access_token={access_token}", method: 'GET' },
    create_tasks: { url: self.endpoint_url+"/tasks", method: 'POST' },
  }

  this.authenticate = function(username, password) {

    this.status = 'authenticating'

    args = {
      client_id: self.client_id,
      client_secret: self.client_secret,
      grant_type: 'assertion',
      assertion_type: 'password',
      username: username,
      password: password
    }

    return fetch(self.endpoint_url+'/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        self.status = 'authenticated'
        self.access_token = json.access_token
        console.log('parsed json', json)
        return json.access_token
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  this.call = function(name, options) {
    options = options || {}

    url = self.api[name]['url']

    args = {
      method: self.api[name]['method'],
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (self.api[name]['method'] == 'GET') {
      options['path'] = _.extend(options['path'] || {}, { access_token: self.access_token });
    }

    if (self.api[name]['method'] == 'POST') {
      options['body'] = _.extend(options['body'] || {}, { access_token: self.access_token });
    }

    if (options['path'] != undefined) {
      url = interpolate(url, options['path'])
    }

    if (options['body'] != undefined) {
      console.log(options['body']);
      args['body'] = _.extend(args['body'] || {}, options['body'])
    }

    if (args['body'] != undefined) {
      args['body'] = JSON.stringify(args['body'])
    }

    return fetch(url, args).then(function(response) {
        console.log(response.status);
        return response.json()
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  }



}