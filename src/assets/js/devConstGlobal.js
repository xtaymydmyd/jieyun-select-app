import constDevice from 'assets/js/device.js'
// let mainHost = process.env.mainHost
let mainHost = 'http://lechat.lordar.com:8088/'
var devConstGlobal = {
    MainHost: mainHost,

    HostStaffOrg: 'http://192.168.108.7:9818/staffOrg/',
    // HostStaffOrg: 'http://192.168.108.50:9819/staffOrg/',
    HostSource: ' http://192.168.100.200:8888/',

    Host: mainHost + '/apps/',

    pageSize: 8,
    platform: process.env.platform, // 'Android',
    school: process.env.school, // njust, jit, jsjt, ahcbxy, njgyjx
    currentVersion: process.env.currentVersion, // '3.0.24',
    isWeChat: () => {
        return false
    },
    isAndroid: () => {
        // return constDevice.android()
    },
    isIOS: () => {
        // return constDevice.ios()
    },
    isDebug: () => {
        // return constGlobal.platform == 'Debug'
    }
}
export default devConstGlobal