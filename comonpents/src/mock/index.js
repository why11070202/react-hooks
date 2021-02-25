// 首先引入Mock
const Mock = require('mockjs')
const Random = Mock.Random
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});

Random.extend({
  phone: function () {
    const phonePrefixs = ['132', '133', '134', '135', '136', '137', '138', '180', '187', '189'];
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})
/**
 *
 */


Mock.mock(RegExp('/web/specialLineProgress/list' + ".*"), 'post', {
  "msg": "操作成功",
  "code": 200,
  'total|18-30': 24,
  'rows|20': [{
    'id': Random.id(),
    'number|+1': 0,
    'orderStatus|1': ["0", "1", "2"],
    'commented|1': [0, 1],
    'Number|10-22': 20,  //数量
    'percent': function () {
      return this.Number + '%'
    },
    'productType': '传输专线',
    'productCode': () => Random.string('number', 8),
    'customerManagerName': () => Random.cname(),
    'customerManagerPhone': () => Random.phone(),
    'specialLineAddress': "地址",
  }]
});


// Mock.mock(RegExp('/web/noticeMsg/list'), 'post', {
//   "code": 200,
//   'total': 14,
//   'rows|7': [{
//     'msgId': Random.id(),
//     'content': () => Mock.mock('@cparagraph'),
//     'alreadyRead|1': [0, 1],
//     'createTime': () => Mock.mock('@datetime(yyyy-MM-dd HH:mm)')
//   }]
// });

// Mock.mock(RegExp('/web/handle/list' + ".*"), 'post', {
//   "msg": "操作成功",
//   "code": 200,
//   'total': 24,
//   breakdownRate: '0.00%',
//   'specialLineCount|24-42': 34,  //数量
//   'rows|20': [{
//     'id': Random.id(),
//     'number|+1': 0,
//     'breakDownStatus|1': [1, 2],
//     groupCode: '15565555',
//     'status|1': [0, 1],//运行状态
//     'customerLevel|1': ['金牌', '银牌', '铜牌'], //类别
//     'groupName': () => {
//       return Random.ctitle(3, 5) + '有限公司'
//     },
//     'specialLineProgressCount': 20,  //数量
//     'breakdownRate': function () {
//       return '0.00%'
//     },
//     'productType': '传输专线',
//     'address': () => Mock.mock('@city(true)'),
//     'productCode': () => Random.string('number', 8),
//     'customerManagerName': () => Random.cname(),
//     'customerManagerPhone': () => Random.phone(),
//     'openTime': Random.datetime(),
//     'finishTime': Random.datetime()
//   }]
// });
// Mock.mock(RegExp('/web/handle/group' + ".*"), 'post', {
//   "code": 200,
//
//   'id': Random.id(),
//   'orderStatus|1': [0, 1],
//   'status|1': [0, 1],//运行状态
//   'goldType|1': [0, 1, 2], //等级类别
//   'customerName': () => {
//     return Random.ctitle(3, 5) + '有限公司'
//   },
//   'rows|20': [{
//     'id': Random.id(),
//     'number|+1': 0,
//     'breakDownStatus|1': [1, 2],
//     groupCode: '15565555',
//     'status|1': [0, 1],//运行状态
//     breakdownHandleStatus:'二级处理中',
//     'customerLevel|1': ['金牌', '银牌', '铜牌'], //类别
//     'groupName': () => {
//       return Random.ctitle(3, 5) + '有限公司'
//     },
//     'specialLineProgressCount': 20,  //数量
//     'breakdownRate': function () {
//       return '0.00%'
//     },
//     'productType': '传输专线',
//     'address': () => Mock.mock('@city(true)'),
//     'productCode': () => Random.string('number', 8),
//     'customerManagerName': () => Random.cname(),
//     'customerManagerPhone': () => Random.phone(),
//     'openTime': Random.datetime(),
//     'finishTime': Random.datetime()
//   }],
//   'groupCode': Random.string('number', 10),
//   groupName: '有限公司',
//   'productType': '传输专线',
//   'specialLineAddress': '广州/天河区',
//   'productCode': Random.string('number', 8),
//   'customerManagerName': Random.cname(),
//   'customerManagerPhone': Random.phone(),
//   'value1|10-22': 20,  //数量
//   'value2': '10%',//比例
//   'openTime': Random.datetime(),
//   'finishTime': Random.datetime(),
//   'level|1-4': 'A'
//
// });



