module.exports = {
    currentVersion: '"3.0.27"',
    NODE_ENV: '"production"',
    platform: JSON.stringify(process.env.PROD_ENV),
    mainHost: (process.env.PROD_ENV === 'app') ? '"http://njust-app.lordar.com"' : '"http://njust-qy.lordar.com"',
    school: JSON.stringify("njust")
}
