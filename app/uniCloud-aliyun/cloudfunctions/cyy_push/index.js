'use strict';

const uniPush = uniCloud.getPushManager({appId: '__UNI__D34B03B'})
// const db = uniCloud.database({
// 	provider: 'aliyun',
// 	spaceId: 'mp-398a75d7-2b7f-478b-b0aa-39cba4d5314a'
// });

exports.main = async (event, context) => {
	//event为客户端上传的参数
	let resp;
	try {
		let data_object = JSON.parse(event.body)
		// const data_object = {
		// 	'push_clientid': obj.push_clientid,
		// 	'title': obj.title,
		// 	'content': obj.content,
		// 	'payload': obj.payload
		// }
		
		resp = await uniPush.sendMessage(data_object)		
		// const result = await db.collection('msg').add(data_object)
		// console.log('resp: ', resp, 'db exec result: ', result)
		
	} catch(err) {
		console.error(err)
	}
	
	//返回数据给客户端
	return resp
};
