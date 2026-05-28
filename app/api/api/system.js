import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function upload({filePath,pathPrefix}){
	return request({
		url:WebUrl.UPLOAD,
		hasFile:true,
		multiFile:false,
		filePath:filePath,
		name:"file",
		formData:{
			pathPrefix:pathPrefix
		}
		
	})
}

export function getAppLatest(){
	return request({
		url:WebUrl.APP_LATEST,
		method:"POST",
	})
}

export function getIOSStore(){
	return request({
		url:'https://itunes.apple.com/cn/lookup?bundleId=com.client.chongyueyue',
		method:'GET',
		isToken:false
	})
}