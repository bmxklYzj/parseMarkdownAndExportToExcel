/**
 * @file 解析markdown为json数据
 * @author yangzongjun
 */

let fs = require('fs');

let problemIdInExam = 0;
// let data = fs.readFileSync('./readme.txt', 'utf8');

/**
 * 入口函数
 *
 * @param {string} path 待解析的md文件路径
 * @return {Array} 返回解析结果
 */
function main(path) {
    let data = fs.readFileSync(path, 'utf8');
    return resolveType(data);
}


// let data = fs.readFileSync('/Users/baidu/Documents/me_document/front-end-exam/exam/util/dist/readme.md', 'utf8');
// let res = resolveType(data);
// res + '';
// console.log(res);

/**
 * 根据四种题目类型解析md全文
 *
 * @param {string} data 待解析的md全文
 * @return {Object} 返回每个大类对应的字符串
 * 返回格式：
 * [
 *      {
 *          type: {string}
 *          data: {string}
 *      }
 * ]
 */
function resolveType(data) {
    const problemTypeConfig = [
        '一、单选',
        '二、填空',
        '三、多选',
        '四、判断'
    ];

    let regString = '';
    for (let i = 0, len = problemTypeConfig.length; i < len; i++) {
        let item = problemTypeConfig[i];
        regString += (item + '([\\s\\S]*)');
    }
    let reg = new RegExp(regString);
    let res = reg.exec(data);

    Array.prototype.slice.call(res);
    let resArray = [];
    for (let i = 1, len = res.length; i < len; i++) {
        let obj = {
            type: problemTypeConfig[i - 1],
            data: res[i]
        };
        resArray.push(obj);
    }

    return resolveProblemToString(resArray);
}


/**
 * 分割每种类型 的每个题目为字符串
 *
 * @param {Array} typeArray 传入的题目类型数组
 * @return {Array} 每种类型题目中 字符串形式的每道题
 * 返回格式：
 * [
 *      {
 *          type: {string}
 *          data: {string}
 *          problemArray: [
 *              {string}, {string}
 *          ]
 *      }
 * ]
 */
function resolveProblemToString(typeArray) {
    for (let i = 0, len = typeArray.length; i < len; i++) {
        let item = typeArray[i].data;

        let reg = /\n\n\d、([\s\S]*?)\n--/g; // 注意设置成非贪婪匹配
        let array = null;
        let problemArray = [];
        while ((array = reg.exec(item)) !== null) {
            // reg.lastIndex -= 2;
            problemArray.push(array[1]);
        }

        let resoleveProblem = extractProblem({
            type: typeArray[i].type,
            data: item,
            problemArray
        });
        typeArray[i] = resoleveProblem;
    }
    return typeArray;
}

/**
 * 传入一种题目类型数据，解析题目的描述、选项、答案、解析
 *
 * @param {Array} problemsOfOneType 一种题目类型对应的数据
 * @return {Object} 一类题目 解析后数据
 *  * 返回格式：
 * [
 *      {
 *          type: {string}
 *          data: {string}
 *          problemArray: [
 *              {
 *                  desc: {string}
 *                  answer: {string}
 *                  reason: {string}
 *                  options: {Array}
 *              }
 *          ]
 *      }
 * ]
 */
function extractProblem(problemsOfOneType) {
    let type = problemsOfOneType.type;
    if (type === '一、单选'
        || type === '三、多选'
    ) {
        let problemArray = problemsOfOneType.problemArray || [];
        for (let i = 0, len = problemArray.length; i < len; i++) {
            let item = problemArray[i];
            // let reg = /([\s\S]*)?\n\n(?:(.+)\n){4,}答案：(.)*\n解析：(.)*/;
            // js 捕获组重复的话只能保留最后一次捕获组 https://codeday.me/bug/20170729/44364.html
            // 因此把选项单独拎出来处理
            let reg = /([\s\S]*)?\n\n([\s\S]*)答案：(.*)\n解析：(.*)/;
            let res = reg.exec(item);

            problemArray[i] = {};
            problemArray[i].desc = res[1];
            problemArray[i].answer = res[3];
            problemArray[i].reason = res[4];

            let problemOptions = [];
            reg = /[A-Za-z]\. (.*)\n/g;
            let regArr = [];
            while ((regArr = reg.exec(res[2])) !== null) {
                problemOptions.push(regArr[1]);
            }
            // let problemOptions = res[2].split('\n');
            // // 最后一个是空格去除
            // if (!problemOptions[problemOptions.length - 1]) {
            //     problemOptions.pop();
            // }
            problemArray[i].options = problemOptions;

        }
        return problemsOfOneType;
    }
    else if (type === '二、填空'
        || type === '四、判断'
    ) {
        let problemArray = problemsOfOneType.problemArray || [];
        for (let i = 0, len = problemArray.length; i < len; i++) {
            let item = problemArray[i];

            let reg = /([\s\S]*)?答案：(.*)\n解析：(.*)/;
            let res = reg.exec(item);

            problemArray[i] = {};
            problemArray[i].desc = res[1];
            problemArray[i].answer = res[2];
            problemArray[i].reason = res[3];
        }
        return problemsOfOneType;
    }
}

module.exports = main;


