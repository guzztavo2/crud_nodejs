const Controller = require('../resources/Controller');

class UserController extends Controller {

    async login(request) {
        // console.log(request);
        await request.validate({
            'login_user': 'required',
            'password_user': 'required',
            'response.user': 'required'
        },
            {
                'user': { 'required': 'Não foi possível logar com esse usuário' }
            })
        return this.response.data('certo', 200);
    }


}

module.exports = UserController;