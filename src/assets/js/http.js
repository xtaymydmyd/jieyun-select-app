import device from 'assets/js/device'
import { appLogOff, toastMsg } from 'assets/js/global'

const apiMethods = {
    methods: {
        apiGet(url, data) {
            return new Promise((resolve, reject) => {
                axios.get(url, data).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    this.handleError(error)
                })
            })
        },
        apiPost(url, data) {
            return new Promise((resolve, reject) => {
                axios.post(url, data).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    this.handleError(error)
                })
            })
        },
        handleError(error) {
            var response = error.response
            var errorContent = ''
            var errorText = {
                error: '页面不存在，请稍后重试',
                timeout: '请求超时，请检查网络',
                permissionError: '暂无权限，请稍后重试',
                serviceException: '系统服务异常，请稍后重试',
                networkException: '网络异常，请检查网络'
            }

            if (!device.wechat() && navigator.connection.type == 'none') { // app无网络连接时
                return
            }
            if (response && response.config.url.indexOf('eventLog')) {
                return
            }
            if (error.response) {
                var status = response.status
                switch (status) {
                    case 401:
                        errorContent = errorText.permissionError
                        break
                    case 404:
                        errorContent = errorText.error
                        break
                    case 525 :
                        appLogOff() // 重新登录
                        break
                    default:
                        errorContent = errorText.serviceException
                }
            } else if (error.request) {
                error.message = '' + error.message
                if (error.message.indexOf('timeout') >= 0) {
                    errorContent = errorText.timeout
                } else if (error.message.indexOf('Error') >= 0) {
                    errorContent = errorText.networkException
                }
            } else {
                error = '' + error
                if (error.indexOf('timeout') >= 0) {
                    errorContent = errorText.timeout
                } else if (error.indexOf('Error') >= 0) {
                    errorContent = errorText.networkException
                }
            }

            if (errorContent == '') return

            if (error.response &&
                response.config.url &&
                (!device.wechat()) &&
                (response.config.url.indexOf('agreement') >= 0 || response.config.url.indexOf('isLogin') >= 0)) {
                navigator.notification.alert(errorContent, function() {}, '', '确认')
            } else {
                toastMsg(errorContent, 'warn')
            }
        }
    },
    computed: {
        showLoading() {
            return store.state.globalLoading
        }
    }
}

export default apiMethods