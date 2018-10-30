import constDevice from 'assets/js/device.js'
import devConstGlobal from 'assets/js/devConstGlobal.js'

var mainHost = ''

if (process.env.platform === 'app') {
    mainHost = process.env.mainHost
} else {
    mainHost = 'http://' + window.location.host
}

let NODE_ENV = process.env.NODE_ENV
const prodConstGlobal = {
    MainHost: mainHost,

    HostCampusInfo: mainHost + '/apps/campusInfo/',
    HostCampusLife: mainHost + '/apps/campusLife/',
    HostCampusStudy: mainHost + '/apps/campusStudy/',
    HostCampusWork: mainHost + '/apps/campusWork/',
    HostConsult: mainHost + '/apps/consult/', // 交流平台
    HostSelfRepair: mainHost + '/apps/selfRepair/', // 自助报修
    HostProfile: mainHost + '/apps/appPersonalCenter/',
    HostPortal: mainHost + '/apps/microPortal/',
    HostSource: mainHost + '/',
    HostNewsauto: mainHost + '/apps/newsauto/', // 南理工新闻定制
    HostBooking: mainHost + '/apps/booking/', // 预约
    HostVersion: mainHost + '/apps/version/',
    HostSchedule: mainHost + '/apps/schedule/',
    HostJSAPISignature: mainHost + '/apps/payuser/', // 微信JSSDK签名
    HostNewsDetail: 'http://njust-app.lordar.com/njustbot',
    HostPayUser: mainHost + '/apps/payuser',
    HostPayUserV2: mainHost + '/api/v2/payuser/',
    HostLog: mainHost + '/apps/eventLog/',
    HostAuth: mainHost + '/personalcenter/',
    Host: mainHost + '/apps/',
    HostCampusEle: mainHost + '/apps/electric/',

    // HostNetworkRecharge: mainHost + '/networkRecharge/',   // 网费充值
    HostNetworkRecharge: mainHost + '/api/v2/networkRecharge/', // 网费充值
    HostExamRegistrationApp: mainHost + '/api/v2/examRegistration/', // 考试报名移动端

    HostImgUrl: mainHost + '/', // 图片回显
    HostAppGym: mainHost + '/api/v2/appGym/', // 体育场馆预订app(顾)

    pageSize: 16,
    platform: process.platform, // 'Android',
    school: process.env.school, // njust, jit, jsjt, ahcbxy, njgyjx
    currentVersion: process.env.currentVersion, // '3.0.24',
    isWeChat: () => {
        return constDevice.wechat()
    },
    isAndroid: () => {
        return constDevice.android()
    },
    isIOS: () => {
        return constDevice.ios()
    },
    isDebug: () => {
        return constGlobal.platform == 'Debug'
    }
}

let constGlobal = (NODE_ENV == 'production') ? prodConstGlobal : devConstGlobal

export default constGlobal