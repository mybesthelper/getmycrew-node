var GetMyCrew = require('./lib/getmycrew-node').GetMyCrew;

getMyCrew = new GetMyCrew({
  client_id: '573464783de8e53595f554919556f698f9e63e9ea30c08bc225f520109e66dc6',
  client_secret: '664e5ca7b817c6eeb5892931e09745ff40005e3899ae9d1ab54300cbbe6bf036',
  endpoint_url: 'http://mbhx.ngrok.com/api/v2'
});

getMyCrew.authenticate("marcin.popielarz@gmail.com", "marcin123").then(function(token) {

  console.log("authenticated");
  console.log(token);

  getMyCrew.index_tasks().then(function(task_list) {
    console.log("task list");
    console.log(task_list);
  });

  getMyCrew.show_task(32).then(function(task) {
    console.log("task shown");
    console.log(task);
  });

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

});