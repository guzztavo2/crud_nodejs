const Informacao = require('../models/Informacao');
const User = require('../models/User');
const Controller = require('../resources/Controller');
const Validator = require('../resources/Validator');
class IndexController extends Controller {

    title = 'CREATE READ UPDATE DELETE NODE JS'

    async index(request) {
        const user = await User.first();
        const informacoes = await user.informacoes();
        return this.response.view('pages/index', 200);
    }

    login(request) {
        const login_user = request.session.getByKey('login_user');
        if (login_user !== null) {
            request.session.deleteByKey('login_user');
            return this.response.view('pages/login', 200, { 'login_user': login_user });
        }
        return this.response.view('pages/login', 200);
    }

    register(request) {
        return this.response.view('pages/register', 200);
    }
    success(request) {
        return this.response.view('pages/success', 200, { 'usuario': { 'nome': 'Well' } });
    }

    async resetPassword(request) {
        const validator = await (new Validator()).make(request.requestsToObject(), { 'user_email': 'email' });
        const user_email = request.getByKey('user_email') ?? null;

        if (user_email != null && validator.isSuccess) {
            user_email.key = 'input_' + user_email.key;
            return this.response.view('pages/reset_password', 200, user_email.toObject());
        }
        return this.response.view('pages/reset_password', 200);
    }
}

module.exports = IndexController;