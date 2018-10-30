// import constDevice from 'assets/js/device.js'
const commonFn = {
    j2s(obj) {
        return JSON.stringify(obj)
    },
    cloneJson(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    closeGlobalLoading() {
        setTimeout(() => {
            store.dispatch('showLoading', false)
        }, 0)
    },
    openGlobalLoading() {
        setTimeout(() => {
            store.dispatch('showLoading', true)
        }, 0)
    },
    // 删除左右两端的空格
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    toastMsg(msg, type) {
        var position = 'middle'
        switch (type) {
            case 'normal':
                bus.$vux.toast.text(msg, position)
                break
            case 'success':
                bus.$vux.toast.show({
                    text: msg,
                    type: 'success',
                    position: position
                })
                break
            case 'warning':
                bus.$vux.toast.show({
                    text: msg,
                    type: 'warn',
                    position: position
                })
                break
            case 'error':
                bus.$vux.toast.show({
                    text: msg,
                    type: 'cancel',
                    position: position
                })
                break
            default:
                bus.$vux.toast.text(msg, position)
                break
        }
    },
    checkEmpty: function(v) {
        return !!v.trim()
    },
    checkReg(v, reg) {
        return reg.test(v)
    },
    validate(value, type, attText) {
        var att = ''
        var text = ''
        if (attText != undefined) {
            att = attText + '不能为空'
        } else {
            att = '内容不能为空'
        }
        switch (type) {
            case 'empty':
                text = (!!value.trim() == false) ? att : ''
                break
            case 'mail':
                text = (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value) == false) ? '请输入正确邮箱格式' : ''
                text = (!!value.trim() == false) ? '邮箱内容不能为空' : text
                break
            case 'phone':
                text = (/^1(3|4|5|7|8)\d{9}$/.test(value) == false) ? '请输入正确手机号码格式' : ''
                text = (!!value.trim() == false) ? '手机内容不能为空' : text
                break
            default:
                return true
        }
        if (text != '') {
            common.toastMsg(text)
            return false
        }
        return true
    },
    // 日期补0
    formatDateNum: function(value) {
        if (parseInt(value) < 10) {
            return '0' + parseInt(value)
        } else {
            return parseInt(value) + ''
        }
    },
    sessionSet(name, obj) {
        return sessionStorage.setItem(name, JSON.stringify(obj))
    },
    sessionGet(name) {
        return JSON.parse(sessionStorage.getItem(name))
    },
    wxSetTitle(title) {
        if (title === undefined || window.document.title === title) {
            return
        }
        document.title = title
        var mobile = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe')
            iframe.style.display = 'none'
                // 替换成站标favicon路径或者任意存在的较小的图片即可
            iframe.setAttribute('src', '')
            var iframeCallback = function() {
                setTimeout(function() {
                    // alert(title)
                    // iframe.removeEventListener('load', iframeCallback)
                    document.body.removeChild(iframe)
                }, 5000)
            }
            iframe.addEventListener('load', iframeCallback)
            document.body.appendChild(iframe)
        }
    },
    inAppBrowserOpen(url) {
        if (window.location.href.indexOf('http://') >= 0) {
            window.location.href = url
        } else {
            cordova.ThemeableBrowser.open(url, '_blank', {
                toolbar: {
                    height: 44,
                    color: '#f0f0f0ff'
                },
                title: {
                    color: '#000',
                    showPageTitle: true
                },
                backButton: {
                    image: 'back',
                    imagePressed: 'back',
                    imageDensity: 2,
                    align: 'left',
                    event: 'backPressed'
                },
                backButtonCanClose: true,
                statusbar: {
                    color: '#000000ff'
                }
            }).addEventListener('backPressed', function(e) {
                // alert('back pressed');
            }).addEventListener('helloPressed', function(e) {
                // alert('hello pressed');
            }).addEventListener('sharePressed', function(e) {
                // alert(e.url);
            }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
                console.error(e.message)
            }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
                console.log(e.message)
            })
        }
    },

    queryAppEventLog(info, requestUrl, eventType) {
        let url = constGlobal.HostLog + 'saveAppEventLog'

        let resolution = JSON.parse(sessionStorage.getItem('deviceResolution')) // 分辨率
        let networkingWay = JSON.parse(localStorage.getItem('deviceNetWorkType')) // 联网方式
        let position = JSON.parse(sessionStorage.getItem('deviceLocationInfo')) // 经纬度
        let param = {
            agentId: info.agentId, // 应用ID
            appId: info.appId, // 公众号id
            agentType: info.appType, // 应用类型：0.微信应用，1.自定义应用,2.app应用
            eventType: eventType,
            requestUrl: requestUrl,

            resolution: resolution || '',
            networkingWay: networkingWay || '',
            latitude: position ? position.latitude : '',
            longitude: position ? position.longitude : ''
        }
        if (!constGlobal.isWeChat() && device.uuid) {
            param.device = device.uuid
            param.platform = device.platform
            param.version = device.version
            param.manufacture = device.manufacturer
            param.serial = device.serial
            param.model = device.model
            param.appVersion = constGlobal.currentVersion
        }
        http.apiPost(url, param).then(res => {})
    },
    queryActiveEventLog(eventType, requestUrl) {
        let url = constGlobal.HostLog + 'saveAppEventLog'
        let resolution = JSON.parse(localStorage.getItem('deviceResolution')) // 分辨率
        let networkingWay = JSON.parse(localStorage.getItem('deviceNetWorkType')) // 联网方式
        let position = JSON.parse(sessionStorage.getItem('deviceLocationInfo')) // 经纬度

        var param = {}
        param.eventType = eventType
        param.agentId = -1
        param.requestUrl = requestUrl

        param.resolution = resolution || ''
        param.networkingWay = networkingWay || ''
        param.latitude = position ? position.latitude : ''
        param.longitude = position ? position.longitude : ''

        if (!constGlobal.isWeChat() && device.uuid) {
            param.device = device.uuid
            param.platform = device.platform
            param.version = device.version
            param.manufacture = device.manufacturer
            param.serial = device.serial
            param.model = device.model
            param.appVersion = constGlobal.currentVersion
        }
        http.apiPost(url, param).then(res => {})
    }

}
export default commonFn

export const appLogOff = () => {
    var state = JSON.parse(localStorage.getItem('logOffStatus'))
    var content = ''
    if (!state) {
        let url = constGlobal.MainHost + '/getOnlineDeviceInfo'
        http.apiGet(url).then(res => {
            if (res.indexOf(',') >= 0) {
                var resArr = res.split(',')
                content += '你的账号于' + resArr[1] + '在另一台' + resArr[0] + '手机登录了。如非本人操作，则密码可能已泄露，请及时修改密码'
            } else {
                content = '您的账号在另一台手机登录了。如非本人操作，请及时修改密码'
            }
            localStorage.setItem('logOffStatus', 1)
            bus.$vux.alert.show({
                title: '下线通知',
                content: content,
                buttonText: '重新登录',
                onShow() {
                    // console.log('Plugin: I\'m showing')
                },
                onHide() {
                    common.sessionSet('userInfo', null)
                    common.sessionSet('portalMineApps', null)
                    common.sessionSet('portalTagList', null)
                    store.state.token = false
                    Lockr.set('token', '')
                    store.state.ticket = false
                    Lockr.set('ticket', '')
                    window.location.href = 'login.html#/casLogin'
                }
            })
        })
    } else {
        return
    }
}
export const toastMsg = (msg, type) => {
    var position = 'middle'
    switch (type) {
        case 'normal':
            bus.$vux.toast.text(msg, position)
            break
        case 'success':
            bus.$vux.toast.show({
                text: msg,
                type: 'success',
                position: position
            })
            break
        case 'warning':
            bus.$vux.toast.show({
                text: msg,
                type: 'warn',
                position: position
            })
            break
        case 'error':
            bus.$vux.toast.show({
                text: msg,
                type: 'cancel',
                position: position
            })
            break
        default:
            bus.$vux.toast.text(msg, position)
            break
    }
}
