import request from '../utils/request'

export function verifyMsgCode(data) {
  return request({
    url: `/webUser/verifyMsgCode`,
    method: 'post',
    data
  })
}

export function specialLineProgressListApi(data) {
  return request({
    url: `/web/specialLineProgress/list`,
    method: 'post',
    data
    // params: {...data}
  })
}

//获取用户信息
export function getWebUserInfo() {
  return request({
    url: `/webUser/getWebUserInfo`,
    method: 'post',
  })
}
