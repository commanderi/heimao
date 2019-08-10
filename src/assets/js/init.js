// import{ RongIMLib }from '../../../static/js/RongIMLib-2.5.0.js';
// import{ Protobuf }from '../../../static/js/protobuf-2.3.5.min.js';

var RongIMClient = RongIMLib.RongIMClient
function init (params, addPromptInfo) {
    var appkey = params.appkey
    var token = params.token
    var navi = params.navi
    var config = {
        protobuf: Protobuf
    }
    if (navi) {
        config.navi = navi
    }
    RongIMClient.init(appkey, null, config)
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
                case RongIMLib.ConnectionStatus['CONNECTED']:
                case 0:
                    addPromptInfo('连接成功')
                break
                case RongIMLib.ConnectionStatus['CONNECTING']:
                case 1:
                    addPromptInfo('连接中')
                break
                case RongIMLib.ConnectionStatus['DISCONNECTED']:
                case 2:
                    addPromptInfo('当前用户主动断开链接')
                break
                case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
                case 3:
                    addPromptInfo('网络不可用')
                break
                case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
                case 4:
                    addPromptInfo('未知原因，连接关闭')
                break
                case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
                case 6:
                    addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
                break
                case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
                case 12:
                    addPromptInfo('当前运行域名错误，请检查安全域名配置')
                break
            }
        }
    })
    RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            addPromptInfo('新消息 ' + message.targetId + ':' + JSON.stringify(message))
        }
    })
    RongIMClient.connect(token, {
        onSuccess: function(userId) {
            console.log('连接成功,用户id：' + userId);
        },
        onTokenIncorrect: function() {
            this.$toast.error('token 无效');
        },
        onError: function(errorCode){
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    this.$toast.error('超时');
                break;
                case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                    this.$toast.error('不可接受的协议版本');
                break;
                case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                    this.$toast.error('appkey不正确');
                break;
                case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                    this.$toast.error('服务器不可用');
                break;
            }
        }
    },null)
};
export{
    init
}