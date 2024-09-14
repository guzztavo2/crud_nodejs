const Model = require("../resources/Model");
const User = require("./User");

class Informacao extends Model {
    table = 'informacoes';

    fillable = [
        'id',
        'data'
    ]

    users(){
        return this.belongsToMany(User, 'users_informacao', 'informacao_id', 'id');
    }
}
module.exports = Informacao;