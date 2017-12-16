/**
 * @file 入口文件
 *
 * @author yangzongjun
 * @date 2017-12-16 16:46:51
 */

let fs = require('fs');
let path = require('path');

let parseMD = require('./parseMD');
let exportXLS = require('./export');

// let currentPath = process.cwd(); // /Users/baidu/Documents/me_document/front-end-exam/exam/util
let currentPath = '../exam_src';

let files = fs.readdirSync(currentPath);
files.forEach(unitDirName => {
    let unitDirPath = path.join(currentPath, unitDirName);

    let stat = fs.statSync(unitDirPath);
    if (stat.isDirectory()) {
        let mdPath = path.join(unitDirPath, '/readme.md');
        let readmeStat = fs.statSync(path.join(mdPath));
        if (readmeStat.isFile()) {
            let targetUnitDirPath = path.join('../exam_dist', unitDirName);
            if (!fs.existsSync(targetUnitDirPath)) {
                fs.mkdirSync(targetUnitDirPath);
            }
            exportXLS(mdPath, path.join('../exam_dist', unitDirName, `${unitDirName}-理论.xlsx`));
        }
    }
});
