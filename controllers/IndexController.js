const Controller = require('../resources/Controller');
class IndexController extends Controller {

    title = 'CREATE READ UPDATE DELETE NODE JS'

    index(request) {
        return this.response.view('pages/index', 200);
    }
    login(request) {
        return this.response.view('pages/login', 200);
    }
    register(request) {
        return this.response.view('pages/register', 200);
    }
    resetPassword(request) {
        return this.response.view('pages/reset_password', 200);
    }
}

module.exports = IndexController;