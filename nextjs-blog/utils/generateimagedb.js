const fs = require('fs');
const imagesFolder = './public/sd/';
var dir = './images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
fs.readdir(imagesFolder, (err, files) => {
    files.forEach(file => {
        fs.writeFile("./images/" + file.replace(".jpeg", ".md"), `---
title: "${file.replace(".jpeg", "").replaceAll("_", " ")}"
date: "${Date.now()}"
img: "${file}"
---
        `, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`File ${file.replace("jpeg", "md")} created!`);
        });
    });
});

