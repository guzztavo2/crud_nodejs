const Controller = require('../resources/Controller');

class UserController extends Controller {

    login(request){
        console.log(request);
        request.validate()
        return this.response.data('certo', 200);
    }


}

module.exports = UserController;