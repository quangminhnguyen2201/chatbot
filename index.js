const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");
var myID = 100006280864661;
var answeredThreads = {};
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var nameSender;
 
// Create simple echo bot
login({email: "", password: ""}, function callback (err, api) {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }
    api.setOptions({forceLogin: true, selfListen: true, logLevel: "silent"});

    api.listen(function callback(err, message) {
        if(err) return console.error(err);
        api.getUserInfo(message.senderID, function(err, ret) {
            if (err) return console.error(err);
            for (var prop in ret) {
                if (ret.hasOwnProperty(prop) && ret[prop].name) {
                    nameSender = ret[prop].name;
                }
            }
        })
        console.log("***From", nameSender, ":");
        console.log(message.body);
        console.log("----------");
        if (!message.isGroup && message.senderID != myID) {
            console.log(">>>Send to", nameSender, ":");
            console.log("----------");
            api.sendMessage("Chào! Xin lỗi vì mình không thể trả lời tin nhắn vào thời điểm này. Nếu cần thiết, bạn có thể liên hệ trực tiếp vào số điện thoại của mình hoặc để lại lời nhắn vào địa chỉ quangminhnguyen2201@gmail.com. Cảm ơn!", message.threadID);
        }
    });
});
