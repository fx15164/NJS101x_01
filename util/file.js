const fs = require('fs');

const deleteFIle = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            // throw err;
        } 
    })
}

module.exports = deleteFIle;