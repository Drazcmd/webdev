
exports.setup = function(app) {
     app.get('/', index)
}

function index(req, res) {
     res.send({hello:'world'})
}

