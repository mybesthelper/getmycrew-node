# getmycrew-node

## Installation
`npm --save install getmycrew-node`

## Using API

### requiring getmyrew-node lib in your project

```
var GetMyCrew = require('getmycrew-node').GetMyCrew;

var getMyCrew = new GetMyCrew({
  client_id: '573464783de8e53595f554919556f698f9e63e9ea30c08bc225f520109e66dc6',
  client_secret: '664e5ca7b817c6eeb5892931e09745ff40005e3899ae9d1ab54300cbbe6bf036',
  endpoint_url: 'http://mbhx.ngrok.com/api/v2'
});
```

### Authentication and API calls

```
getMyCrew.authenticate("marcin.popielarz@gmail.com", "marcin123").then(function(token) {

  console.log("authenticated - your authenticated api calls go in here");
  console.log(token);
  
  getMyCrew.index_tasks().then(function(data) {
    console.log("task list");
    console.log(data);
  });
});
```

### Task index
  
```
  getMyCrew.index_tasks().then(function(data) {
    console.log("task list");
    console.log(data);
  });
```

### Task create

```
  getMyCrew.create_tasks({
     title: 'My New Cool Task',
     time: new Date(),
     location: 'V6J1G1',
     details: 'Some notes about task',
     urgency: true,
     contact_ids: [1,2,3]
  }).then(function(task) {
     console.log("task created");
     console.log(task);
  });
```

### Task show

```
  getMyCrew.show_tasks(32).then(function(task) {
     console.log("task shown");
     console.log(task);
  });

```
