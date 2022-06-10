const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json')

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dbPath);
            return data.toString()
                ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id)
                : [];
        } catch (e) {
            console.log(e);
        }
    },
    writer: async (users) => {
        await fs.writeFile(dbPath, JSON.stringify(users));
    }
}
