//*** Note: 
//ZMQ allow to handling all topic in one message handler, by listening to multiple topic from one socket. eg: 
// sock.subscribe('kitty'); 
// sock.subscribe('tom');
// sock.on('message', function(topic, message) {
//  
// });
//But in this example will separate message handler to easily handling each topic.

'use strict';

var zmq = require('zmq');

//subscribe multiple topic by separate handler.
var sock1 = zmq.socket('sub');
sock1.connect('tcp://127.0.0.1:3000');
sock1.subscribe('kitty');
sock1.identity = 'subscriber' + process.pid;

//subscribe multiple topic by separate handler.
var sock2 = zmq.socket('sub');
sock2.connect('tcp://127.0.0.1:3000');
sock2.subscribe('tom');
sock2.identity = 'subscriber' + process.pid;

//Message handler for topic # 1
sock1.on('message', function(topic, message) {

	var msg = message.toString(); //convert buffer to string
	var data = JSON.parse(msg); //convert string to object
    var strData = JSON.stringify(data); //show how to convert json(object) to string
	console.log('from: %s, topic: %s, message: %s', sock1.identity, topic.toString(), strData);
});

//Message handler for topic # 2
sock2.on('message', function(topic, message) {

	var msg = message.toString(); //convert buffer to string
	var data = JSON.parse(msg); //convert string to object
    var strData = JSON.stringify(data); //show how to convert json(object) to string
	console.log('from: %s, topic: %s, message: %s', sock2.identity, topic.toString(), strData);
});

console.log('Subscriber connected to port 3000');

