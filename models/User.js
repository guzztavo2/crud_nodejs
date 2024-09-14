const Model = require("../resources/Model");
class User extends Model {
    table = 'user';
    Informacao = require('../models/Informacao');

    fillable = [
        'id',
        'name',
        'email'
    ]

    hidden = [
        'password'
    ]

    cast = {
        "items": "object"
    }
    items() {
        return this.belongsToMany(this.Items, 'items', 'item_id', 'id');
    }
    informacoes() {
        return this.belongsToMany(this.Informacao, 'users_informacao', 'user_id', 'id');
    }


}
module.exports = User;