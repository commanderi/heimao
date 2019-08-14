// import{ RongIMLib }from '../../../static/js/RongIMLib-2.5.0.js';
// import{ Protobuf }from '../../../static/js/protobuf-2.3.5.min.js';

RongIMLib.RongIMClient.init(this.appkey);
RongIMClient.connect(this.RcToken, {
    onSuccess: function(userId) {
        console.log('连接成功,用户id为:', userId);// 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
    },
    onTokenIncorrect: function() {
        console.log('连接失败, 失败原因: token 无效');
    },
    onError: function(errorCode) {
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                console.log('连接超时');
            break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                console.log('不可接受的协议版本');
            break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                console.log('appkey 不正确');
            break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                console.log('服务器不可用');
            break;
            default:
                console.log('连接失败, 失败原因: ', info);
            break;
        }
    }
});
RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        // status 标识当前连接状态
        switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('连接成功');
            break;
            case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在连接');
            break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
            break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登录, 本端被踢');
            break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确, 请至开发者后台查看安全域名配置');
            break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.log('网络不可用, 此时可调用 reconnect 进行重连');
            break;
            default:
                console.log('连接状态为', status);
            break;
        }
    }
});
RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        let messageContent = message.content;
        // 判断消息类型
        switch(message.messageType) {
            case RongIMClient.MessageType.TextMessage: // 文字消息
                // console.log('文字消息：', messageContent.content);
            break;
            case RongIMClient.MessageType.ImageMessage: // 图片消息
                console.log('图片缩略图 base64', messageContent.content); 
                console.log('原图 url', messageContent.imageUri);
            break;
            case RongIMClient.MessageType.HQVoiceMessage: // 音频消息
                console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
                console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
                console.log('音频 时长', messageContent.duration);
            break;
            case RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
                console.log('文本内容', messageContent.content);
                console.log('图片 base64', messageContent.imageUri);
                console.log('原图 url', messageContent.url);
            break;
            case RongIMClient.MessageType.UnknownMessage: // 未知消息
                console.log('未知消息, 请检查消息自定义格式是否正确', message);
            break;
            default:
                console.log('收到消息', message);
            break;
        }
    }
});