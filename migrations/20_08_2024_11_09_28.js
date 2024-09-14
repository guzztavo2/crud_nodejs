const Migration = require("../resources/Migration");

const randomMigration = new class extends Migration {
    table_name = "users_informacao";

    create() {
        return [
            // this.id(),
            this.foreignKey('user_id', 'id', 'user'),
            this.foreignKey('informacao_id', 'id', 'informacoes')
        ];
    }
}

module.exports = randomMigration;