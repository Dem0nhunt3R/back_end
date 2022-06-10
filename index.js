const fs = require('fs/promises');
const path = require('path');

const reader = async (read, folder) => {
    try {
        const files = await fs.readdir(read);

        for (const file of files) {
            const filePath = path.join(read, file);
            const stat = await fs.stat(filePath);

            if (stat.isFile()) {
                await fs.rename(filePath, path.join(__dirname, folder, file));
            }

            if (stat.isDirectory()){
                await reader(filePath,folder);
            }
        }

    } catch (e) {
        console.log(e);
    }
}

reader('folderForRead','exitFolder');