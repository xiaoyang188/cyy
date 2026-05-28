'use strict';

const crypto = require('crypto')
exports.main = async function (event){
  //处理GET请求
  const secret = 'd4as5s1x2as1xc56as4d1a54d5as1d5as1f5df1h561k56i15l;1op5i415opi15io1k,5gh5j1fg5j1fg51h@ffsad45f5as1nhhjabs^klds;,f;asf,a*jmfldksmfaksmfal^jytukuiliul;io;iol.ipo[/.kl.]' // 自己的密钥不要直接使用示例值，且注意不要泄露
  const hmac = crypto.createHmac('sha256', secret);

  let params = event.queryStringParameters
  const sign = params.sign
  delete params.sign
  const signStr = Object.keys(params).sort().map(key => {
    return `${key}=${params[key]}`
  }).join('&')

  hmac.update(signStr);

  if(sign!==hmac.digest('hex')){
    throw new Error('非法访问')
  }

  const {
    access_token,
    openid
  } = params
  const res = await uniCloud.getPhoneNumber({
    provider: 'univerify',
    appid: '__UNI__D34B03B', // DCloud appid
    access_token: access_token,
    openid: openid
  })
  // 返回手机号给自己服务器
  return res
}
