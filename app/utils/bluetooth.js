import {
	$uni
} from './main';

export function setKeepScreenOn(enable){
	return new Promise((resolve,reject)=>{
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		try{
			adapter.setKeepScreenOn({
				keepScreenOn: enable,
				success(res){
					console.log(res)
					resolve(res)
				},
				fail(err){
					console.log(err)
					reject(err)
				}
			});
		}catch(err){
			reject(err)
		}
	})
}

export function getBLEDeviceRSSI(deviceId){
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.getBLEDeviceRSSI({
			deviceId:deviceId,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}

export function setBLEMTU(deviceId, mtu) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.setBLEMTU({
			deviceId: deviceId,
			mtu: mtu,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}
export function createBLEConnection(mac) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.createBLEConnection({
			deviceId: mac,
			timeout: 5000,
			async success(res) {
				uni.setStorageSync("mac", mac)
				console.log(res)
				stopBluetoothDevicesDiscovery()
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				stopBluetoothDevicesDiscovery()
				reject(res)
			}
		})
	})
}

export function closeBLEConnection(mac) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.closeBLEConnection({
			deviceId: mac,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}

export function openBluetoothAdapter() {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.openBluetoothAdapter({
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(err) {
				
				console.log(err)
				reject(err)
			}
		})
	})
}

export function startBluetoothDevicesDiscovery() {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.startBluetoothDevicesDiscovery({
			allowDuplicatesKey: false,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(err) {
				
				console.log(err)
				reject(err)
			}
		})
	})
}

export function stopBluetoothDevicesDiscovery() {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.stopBluetoothDevicesDiscovery({
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}

// export function onBluetoothDeviceFound() {
// 	let info = uni.getDeviceInfo()
// 	const adapter = info.platform == "harmonyos" ? $uni : uni;
// 	adapter.onBluetoothDeviceFound((devices) => {
// 		uni.$emit(BleEmit.FOUND_DEVICE, devices.devices)
// 	})
// }

export function closeBluetoothAdapter() {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.closeBluetoothAdapter({
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}

// export function onBLEConnectionStateChange() {
// 	let info = uni.getDeviceInfo()
// 	const adapter = info.platform == "harmonyos" ? $uni : uni;
// 	adapter.onBLEConnectionStateChange((result) => {
// 		uni.$emit(BleEmit.CONNECTION_STATE, result);
// 	})
// }

// export function onBLECharacteristicValueChange() {
// 	let info = uni.getDeviceInfo()
// 	const adapter = info.platform == "harmonyos" ? $uni : uni;
// 	adapter.onBLECharacteristicValueChange((result) => {
// 		uni.$emit(BleEmit.BLE_VALUE_CHANGE, result);
// 	})
// }

export function getBLEDeviceServices(mac) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.getBLEDeviceServices({
			deviceId: mac,
			async success(res) {
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}

export function getBLEDeviceCharacteristics(mac, serviceId) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.getBLEDeviceCharacteristics({
			deviceId: mac,
			serviceId: serviceId,
			success(res) {
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}
export function notifyBLECharacteristicValueChange(mac, serviceId, characteristicId) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.notifyBLECharacteristicValueChange({
			deviceId: mac,
			serviceId: serviceId,
			characteristicId: characteristicId,
			state: true,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}

export function writeBLECharacteristicValue(deviceId, serviceId, characteristicId, buffer) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.writeBLECharacteristicValue({
			deviceId: deviceId,
			serviceId: serviceId,
			characteristicId: characteristicId,
			value: buffer,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}
export function readBLECharacteristicValue(
	deviceId,
	serviceId,
	characteristicId,
) {
	return new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.readBLECharacteristicValue({
			deviceId: deviceId,
			serviceId: serviceId,
			characteristicId: characteristicId,
			success(res) {
				console.log(res)
				resolve(res)
			},
			fail(res) {
				
				console.log(res)
				reject(res)
			}
		})
	})
}