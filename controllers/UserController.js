const User = require('../models/User');
const Controller = require('../resources/Controller');
const Validator = require('../resources/Validator');

class UserController extends Controller {

    async login(request) {
        const login_user = request.getByKey('login_user');

        if (login_user !== null)
            this.session.create('login_user', login_user.value)

        await request.validate({
            'login_user': 'required',
            'password_user': 'required',
            'response.user': 'required'
        });

        return this.response.data('certo', 200);
    }

    async register(request) {
        const validator = await Validator.make(request.requestsToObject(),
            {
                'user_name': 'required|string',
                'user_email': 'required|email',
                'user_password': 'required|string|min:8',
                'user_confirm_password': 'required|string|min:8'
            },
            {
                'user_name': {
                    'required': 'O campo é obrigatório.',
                    'string': 'O campo é obrigatório.'
                },
                'user_email': {
                    'required': 'O campo é obrigatório.',
                    'string': 'O campo é obrigatório.'
                },
                'user_password': {
                    'required': 'O campo é obrigatório.',
                    'string': 'O campo é obrigatório.',
                    'min': 'O campo precisa ter no minímo 8 caracteres.'
                },
                'user_confirm_password': {
                    'required': 'O campo é obrigatório.',
                    'string': 'O campo é obrigatório.',
                    'min': 'O campo precisa ter no minímo 8 caracteres.'
                }
            }
        );
        if (!validator.isSuccess)
            return this.response.back({ errors: validator.errors });

        const inputs = request.requestsToObject();

        if ((!inputs['user_confirm_password'] || !inputs['user_password']) || inputs['user_password'] !== inputs['user_confirm_password'])
            return this.response.back({ 'errors': { 'user_password': 'Os dois campos precisam ser iguais.', 'user_confirm_password': 'Os dois campos precisam ser iguais.' } });
        
        try {
            const user = await User.create({
                'name': inputs['user_name'],
                'email': inputs['user_email'],
                'password': inputs['user_password']
            });
        } catch {
            return this.response.back({ 'errors': { 'message': 'Não foi possível criar a informação.' } });
        }

        return this.response.view('pages/success', 200, user);
    }
}

module.exports = UserController;