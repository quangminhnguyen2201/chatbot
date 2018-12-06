const login = require("facebook-chat-api");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var answeredThreads = {};
 
// Create simple echo bot
login({email: "minhnq22", password: "gt3q2-fls09-D12M5-##98#"}, function callback (err, api) {
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

    api.listen(function callback(err, message) {
        // console.log(message.threadID);
        // if(!answeredThreads.hasOwnProperty(message.threadID)){
        //     answeredThreads[message.threadID] = true;
            api.sendMessage("Chào! Xin lỗi vì mình không thể trả lời vào thời điểm này. Nếu cần thiết, bạn có thể liên hệ trực tiếp vào số điện thoại của mình hoặc để lại lời nhắn vào địa chỉ quangminhnguyen2201@gmail.com. Cảm ơn!", message.threadID);
        // }
    });
});