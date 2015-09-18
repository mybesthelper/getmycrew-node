# getmycrew-node

## Installation
`npm --save install getmycrew-node`

## Using API

### requiring getmyrew-node lib in your project

```
var GetMyCrew = require('./lib/getmycrew-node').GetMyCrew;

getMyCrew = new GetMyCrew({
  client_id: '573464783de8e53595f554919556f698f9e63e9ea30c08bc225f520109e66dc6',
  client_secret: '664e5ca7b817c6eeb5892931e09745ff40005e3899ae9d1ab54300cbbe6bf036',
  //endpoint_url: 'http://mbhx.ngrok.com/api/v2'
});

```

### Authentication and API calls

```
getMyCrew.authenticate("marcin.popielarz@gmail.com", "marcin123", function() {
  //... your code goes here - you are authorized to perform api calls
  // ex ..
  
  getMyCrew.index_tasks(function(data) {
    console.log("task list");
    console.log(data);
  });

})

```

### Task index

```
  getMyCrew.index_tasks(function(data) {
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
  }, function(data) {
    console.log("task created");
    console.log(data);
  });
  
```

## Task show

```
  getMyCrew.show_task(32, function(data) {
    console.log("task shown");
    console.log(data);
  });
```
