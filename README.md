# getmycrew-node

## Installation
`npm --save install getmycrew-node`

## Using API

```
var GetMyCrew = require('getmycrew-node').GetMyCrew;

getMyCrew = new GetMyCrew({
  client_id: '573464783de8e53595f554919556f698f9e63e9ea30c08bc225f520109e66dc6',
  client_secret: '664e5ca7b817c6eeb5892931e09745ff40005e3899ae9d1ab54300cbbe6bf036',
  //endpoint_url: 'http://mbhx.ngrok.com/api/v2'
});

getMyCrew.authenticate("marcin.popielarz@gmail.com", "marcin123", function() {
  getMyCrew.index_tasks(function(data) {
    console.log("task list");
    console.log(data);
  });
});
```
