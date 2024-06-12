const Controller = require('../resources/Controller');
class userController extends Controller {

    constructor(configFile) {
        super(configFile);
    }

    async index(request) {
        return this.response.view('index', 200, {});
    }
}

module.exports = userController;