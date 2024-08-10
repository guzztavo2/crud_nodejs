const Migration = require("../resources/Migration");

const randomMigration = new class extends Migration {
    table_name = "informacoes";

    create() {
        return [
            this.id(),
            this.foreignKey('user_id', 'user', 'id')
        ];
    }
}

module.exports = randomMigration;