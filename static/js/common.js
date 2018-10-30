
; (function (window , document , undefined ) {

    var commonScript = function(){};

    commonScript.prototype = {

        /**
         * 动态加载cordova.js
        */
        dynamicLoadingJS:function(){
            if (window.location.href.indexOf("file:///")>= 0) {
                document.write("<script src=cordova.js></script>");  
            }
        },

        /**
         * 监听APP中设备加载
        */
        deviceReady:function(){
            if (window.location.href.indexOf("file:///")>= 0) {
                document.addEventListener("deviceready", HandlerCommon.onDeviceReady, false);
            }
        },

        /**
         * APP中设备加载完成
        */
        onDeviceReady:function(){
            // document.addEventListener("pause", onPause, false);
            document.addEventListener("resume", HandlerCommon.onResume, false);
        
            if(navigator.connection.type == 'none'){ 
                navigator.notification.alert(
                    '网络连接不可用，请检查网络', function(){}, '', '确认'
                );
            }
        },

        /**
         * 进程从前台切换到后台
        */
        onPause:function(){
            common.queryActiveEventLog("app_pause", window.location.href)
        },

        /**
         * 进程从前台切换到后台
        */
        onPause:function(){
            common.queryActiveEventLog("app_pause", window.location.href)
        },

        /**
         * 进程从后台切换到前台
        */
        onResume:function(){
            setTimeout(function() {
                common.queryActiveEventLog("app_resume", window.location.href)
            }, 0);
        },

        /**
         * 获取版本
        */
        getChcpInfo:function(){
            if (window.location.href.indexOf("file:///")>= 0) {
                
            }
        },
    }

    var HandlerCommon = new commonScript();
    HandlerCommon.dynamicLoadingJS();
    HandlerCommon.deviceReady();
    HandlerCommon.getChcpInfo();
})(window , document);


