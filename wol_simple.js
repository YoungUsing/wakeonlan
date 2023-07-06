//输入MAC地址和域名，向域名发送一个UDP Wake on LAN数据包

var dgram = require('dgram');
var mac = process.argv[2];
var domain = process.argv[3];

var buf = new Buffer(6 + 16 * mac.split(':').length);
buf.fill(0);
for (var i = 0; i < mac.split(':').length;
     i++) {
    buf.writeUInt16BE(parseInt(mac.split(':')[i], 16), 6 + i * 2);
}

var client = dgram.createSocket('udp6');
client.send(buf, 0, buf.length, 9, domain, function (err, bytes) {
    if (err) throw err;}
    );
    client.on('listening', function () {
        var address = client.address();
        console.log('UDP Client listening on ' + address.address + ":" + address.port);
    }
    );

