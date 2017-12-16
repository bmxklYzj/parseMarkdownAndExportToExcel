/**
 * @file 将json数据导出到excel
 * @author yangzongjun
 */

let xlsx = require('node-xlsx');
let fs = require('fs');
let parseMD = require('./parseMD');
// Or var xlsx = require('node-xlsx').default;
// 一个单元格设置为null或undefined都是空

/**
 * 将json数据导出到excel
 *
 * @param {string} readmePath md文件解析位置
 * @param {string} exportPath md文件导出位置
 */
function exportToXLS(readmePath, exportPath) {

    const tableHeader = ['知识点', '类型', '题干', '选项A', '选项B', '选项C', '选项D', '选项E', '选项F',
    '答案（选填ABCDEF，中间不能有空格，判断填A或B，填空题多空用逗号分隔）', '试题解析（选填）', '出题人'];

    let mdParsedData = parseMD(readmePath);
    // 数据兼容处理
    const problemTypeConfig = {
        '一、单选': '1-单选',
        '二、填空': '3-填空（人工判卷）',
        '三、多选': '2-多选',
        '四、判断': '0-判断'
    };
    let excelArray = [];
    excelArray.push(tableHeader);
    mdParsedData.forEach((itemI, indexI) => {
        itemI.type = problemTypeConfig[itemI.type];
        let problemArray = itemI.problemArray;
        problemArray.forEach((itemJ, indexJ) => {

            // 处理options，单选、多选可能不够6个选项，填空、判断 没有options字段
            let problem = [];
            // '知识点', '类型', '题干'
            problem.push(null, itemI.type, itemJ.desc);

            // 6个选项
            let options = itemJ.options || [];
            options.length = 6;
            problem = problem.concat(options);

            // 答案、解析、出题人
            problem.push(itemJ.answer, itemJ.reason || null, '刘斌');

            excelArray.push(problem);

        });
    });


    let buffer = xlsx.build([{
        name: '试题',
        data: excelArray
    }]); // Returns a buffer

    fs.writeFileSync(exportPath, buffer);
}

module.exports = exportToXLS;
