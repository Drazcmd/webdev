
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
    res.send({ headlines: [{
        username: 'sep1',
        headline: 'Headline'}]})
}

const putHeadline = (req, res) => {
    res.send({
        username: 'sep1',
        headline: req.body.headline || 'you did not supply it'
        })
}

const putEmail = (req, res) => {
    res.send({
        username: 'sep1',
        email : req.body.email || 'you did not supply it'})
}

const getEmail = (req, res) => {
    res.send({
        username: 'sep1',
        email: req.body.email || 'you did not supply it'})
}
const getZipcode = (req, res) => {
    res.send({
        username: 'sep1',
        zipcode: '77001'
        })
}

const putZipcode = (req, res) => {
    res.send({
        username: 'sep1',
        zipcode: req.body.zipcode || 'you did not supply it'
    })
}

const getAvatar = (req, res) => {
    res.send({
        username: 'sep1',
        avatars: 'Avata'
    })
}

const putAvatar = (req, res) => {
    res.send({
        username: 'sep1',
        avatars: req.body.avatar || 'you did not supply it'
    })
}
module.exports = app => {
     app.get('/:user?', index)
     app.get('/headlines/:user?', getHeadline)
     app.get('/headline', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?',getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?',getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?',getAvatar)
     app.put('/avatar', putAvatar)
}
