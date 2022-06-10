const fs = require('fs/promises');
const path = require('path');

const sortFolderByGender = async (read, gender, write) => {
    try {
        const files = await fs.readdir(path.join(__dirname, read));

        for (const file of files) {
            const filePath = path.join(__dirname, read, file);
            const data = await fs.readFile(filePath);
            const user = JSON.parse(data.toString());

            if (user.gender === gender) {
                await fs.rename(filePath, path.join(__dirname, write, file))
            }
        }
    } catch (e) {
        console.log(e);
    }
}

sortFolderByGender('girls','male','boys');
sortFolderByGender('boys','female','girls');