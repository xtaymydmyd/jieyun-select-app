module.exports = {
    currentVersion: '"3.0.29"',
    NODE_ENV: '"production"',
    platform: JSON.stringify(process.env.PROD_ENV),
    mainHost: (process.env.PROD_ENV === 'app') ? '"http://lechat.lordar.com:8088"' : '"http://jieyun.lordar.com:18096"',
    school: '""'
}