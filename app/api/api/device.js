import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function sendCommand({
	uid,
	serialCode,
	commandType,
	commandValue
}) {
	return request({
		url: WebUrl.SEND_COMMAND,
		method: "POST",
		data: {
			uid: uid,
			serialCode: serialCode,
			commandType: commandType,
			commandValue: commandValue
		}
	})
}

export function getCommandInfo(id) {
	return request({
		url: `${WebUrl.GET_COMMAND_INFO}${id}`,
		method: "GET"
	})
}

export function getDeviceInfo(serialCode) {
	return request({
		url: `${WebUrl.GET_DEVICE_INFO}${serialCode}`,
		method: "GET"
	})
}

export function getDeviceWorkMode(serialCode) {
	return request({
		url: `${WebUrl.GET_WORK_MODE}${serialCode}`,
		method: "GET"
	})
}


export function deviceUnbind(serialCode) {
	return request({
		url: `${WebUrl.DEVICE_UNBIND}${serialCode}`,
		method: "GET"
	})
}
export function deviceBind({serialCode, pid}) {
	return request({
		url: `${WebUrl.DEVICE_BIND}`,
		method: "POST",
		data: {
			serialCode: serialCode,
			pid: pid
		}
	})
}

export function deviceFirmwareGet(serialCode) {
	return request({
		url: `${WebUrl.DEVICE_FIRMWARE}${serialCode}`,
		method: "GET"
	})
}

export function getHomeWifi(serialCode){
	return request({
		url:`${WebUrl.GET_HOME_WIFI}${serialCode}`,
		method:"GET"
	})
}
export function setHomeWifi(data){
	return request({
		url:`${WebUrl.SET_HOME_WIFI}`,
		method:"POST",
		data:data
	})
}