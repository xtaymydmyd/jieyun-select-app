// Save the previous value of the device variable.
const previousDevice = window.device

const device = {}

const changeOrientationList = []

// Add device as a global object.
window.device = device

// The <html> element.
const documentElement = window.document.documentElement

// The client user agent string.
// Lowercase, so we can use the more efficient indexOf(), instead of Regex
const userAgent = window.navigator.userAgent.toLowerCase()

// Main functions
// --------------
device.macos = function() {
    return find('mac')
}

device.ios = function() {
    return device.iphone() || device.ipod() || device.ipad()
}

device.iphone = function() {
    return !device.windows() && find('iphone')
}

device.ipod = function() {
    return find('ipod')
}

device.ipad = function() {
    return find('ipad')
}

device.android = function() {
    return !device.windows() && find('android')
}

device.androidPhone = function() {
    return device.android() && find('mobile')
}

device.androidTablet = function() {
    return device.android() && !find('mobile')
}

device.blackberry = function() {
    return find('blackberry') || find('bb10') || find('rim')
}

device.blackberryPhone = function() {
    return device.blackberry() && !find('tablet')
}

device.blackberryTablet = function() {
    return device.blackberry() && find('tablet')
}

device.windows = function() {
    return find('windows')
}

device.windowsPhone = function() {
    return device.windows() && find('phone')
}

device.windowsTablet = function() {
    return device.windows() && (find('touch') && !device.windowsPhone())
}

device.cordova = function() {
    return window.cordova && location.protocol === 'file:'
}

device.nodeWebkit = function() {
    return typeof window.process === 'object'
}

device.mobile = function() {
    return (
        device.androidPhone() ||
        device.iphone() ||
        device.ipod() ||
        device.windowsPhone() ||
        device.blackberryPhone()
    )
}

device.tablet = function() {
    return (
        device.ipad() ||
        device.androidTablet() ||
        device.blackberryTablet() ||
        device.windowsTablet()
    )
}

device.desktop = function() {
    return !device.tablet() && !device.mobile()
}

device.wechat = function() {
    return find('micromessenger')
}

device.portrait = function() {
    return window.innerHeight / window.innerWidth > 1
}

device.landscape = function() {
    return window.innerHeight / window.innerWidth < 1
}

// Public Utility Functions
// ------------------------

// Run device.js in noConflict mode,
// returning the device variable to its previous owner.
device.noConflict = function() {
    window.device = previousDevice
    return this
}

// Private Utility Functions
// -------------------------

// Simple UA string search
function find(needle) {
    return userAgent.indexOf(needle) !== -1
}

// Check if documentElement already has a given class.
function hasClass(className) {
    return documentElement.className.match(new RegExp(className, 'i'))
}

// Add one or more CSS classes to the <html> element.
function addClass(className) {
    let currentClassNames = null
    if (!hasClass(className)) {
        currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '')
        documentElement.className = `${currentClassNames} ${className}`
    }
}

// Remove single CSS class from the <html> element.
function removeClass(className) {
    if (hasClass(className)) {
        documentElement.className = documentElement.className.replace(
            ` ${className}`,
            ''
        )
    }
}

// Orientation Handling
// --------------------

// Public functions to get the current value of type, os, or orientation
// ---------------------------------------------------------------------

function findMatch(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (device[arr[i]]()) {
            return arr[i]
        }
    }
    return 'unknown'
}

device.type = findMatch(['mobile', 'tablet', 'desktop'])
device.os = findMatch([
    'ios',
    'iphone',
    'ipad',
    'ipod',
    'android',
    'blackberry',
    'windows'
])
export default device