// var CurrentImageInfo: {
// 	type: '',
// 	version: '',
// 	offset: '',
// 	chipType: '',
// 	blockSize: 0
// }
//setbuzzer
export function setBuzzer(option) {
	const byteBuffer = new Uint8Array(20);
	byteBuffer[0] = 0x03;
	if (option === 0) {
		byteBuffer[1] = 0x00;
	} else {
		byteBuffer[1] = 0x01;
	}
	return byteBuffer;
}
//setrgb
export function setRgb(option) {
	const byteBuffer = new Uint8Array(20);
	byteBuffer[0] = 0x02;
	if (option === 0) {
		byteBuffer[1] = 0x00;
	} else {
		byteBuffer[1] = 0x01;
	}
	return byteBuffer;
}
//低功耗定位
export function setLocation(option) {
	const byteBuffer = new Uint8Array(20);
	byteBuffer[0] = 0x01;
	if (option === 0) {
		byteBuffer[1] = 0x01;
	} else {
		byteBuffer[1] = 0x02;
	}
	return byteBuffer;
}

//结束完成的命令
export function getEndCommand() {
	const byteBuffer = new Uint8Array(20);
	byteBuffer[0] = 0x83;
	byteBuffer[1] = 0x12;
	return byteBuffer;
}
//开始的命令 //会收到固件信息的大小
export function getStartCommand() {
	const byteBuffer = new Uint8Array(20);
	byteBuffer[0] = 0x84;
	byteBuffer[1] = 0x12;
	return byteBuffer;
}
//写入数据的格式
export function getProgrammeCommand2(addr, data, offset, programmeLength) {
	const byteBuffer = new Uint8Array(programmeLength + 4);
	byteBuffer[0] = 0x80;
	byteBuffer[1] = programmeLength;
	byteBuffer[2] = addr / 16;
	byteBuffer[3] = (addr / 16) >> 8;
	const len = Math.min(programmeLength, data.length - offset);
	byteBuffer.set(data.subarray(offset, offset + len), 4);
	return byteBuffer;
}
export function getVerifyCommand2(addr, data, offset, programmeLength) {
	const byteBuffer = new Uint8Array(programmeLength + 4);
	byteBuffer[0] = 0x82;
	byteBuffer[1] = programmeLength;
	byteBuffer[2] = addr / 16;
	byteBuffer[3] = (addr / 16) >> 8;
	const len = Math.min(programmeLength, data.length - offset);
	byteBuffer.set(data.subarray(offset, offset + len), 4);
	return byteBuffer;
}
//判断擦除是否成功
// public static CurrentImageInfo parseImageFromResponse(byte[] response){
//        if(response==null || response.length!=20){
//            return null;
//        }
//        CurrentImageInfo imageInfo=new CurrentImageInfo();
//        if(response[0]==(byte) 0x01){
//            imageInfo.setType(ImageType.A);
//        }else if(response[0]==(byte)0x02){
//            imageInfo.setType(ImageType.B);
//        }else {
//            imageInfo.setType(ImageType.UNKNOWN);
//        }
//        //imageInfo.setVersion(String.format(Locale.US,"%02X",response[7]));
//        imageInfo.setOffset(FormatUtil.bytesToIntLittleEndian(response,1));
//        //10/27
//        imageInfo.setBlockSize((response[6] & 0xff)*256+(response[5] & 0xff));
//        //chip type
//        int b1 = response[7] & 0xff;
//        int b2 = response[8] & 0xff;
//        LogUtil.d("response is:"+cn.wch.blelib.utils.FormatUtil.bytesToHexString(response));
//        if(b1==0x83 && b2==0x00){
//            imageInfo.setChipType(ChipType.CH583);
//        }
//        return imageInfo;
//    }

//获取开始擦除的命令
export function getEraseCommand(addr, block) {
	const byteBuffer = new Uint8Array(20);
	byteBuffer[0] = 0x81;
	byteBuffer[1] = 0x00;
	byteBuffer[2] = addr / 16;
	byteBuffer[3] = (addr / 16) >> 8;
	byteBuffer[4] = block;
	byteBuffer[5] = block >> 8;
	return byteBuffer;
}
//下发信息并读取回复
export function writeAndRead() {
	// if (!write(mWrite, data, len)) {
	//     throw new BLELibException("write fail");
	// }
	// return WCHBluetoothManager.getInstance().read(mRead,false);
}
export function parseHexFileStartAddr(filepath) {

}

// export function parseHexFileStartAddr(filepath) {
// 	// const fs=require('fs');
// 	// const file=fs.readFileSync(filepath)
// 	// if (!file || !file.name || (!file.name.endsWith("hex") && !file.name.endsWith("HEX"))) {
// 	// 	throw new Error("This file doesn't exist or is invalid");
// 	// }
// 	// const length = file.size;
// 	// if (length > Number.MAX_SAFE_INTEGER) {
// 	// 	throw new Error("This file is too big");
// 	// }
// 	const reader = new FileReader();
// 	const list = [];
// 	let totalLen = 0;
// 	let minAddr = -1;
// 	let maxAddr = -1;
// 	let maxAddr_Data_Len = 0;

// 		reader.onload = function() {
// 			const hexStr = reader.result;
// 			const lines = hexStr.split("\n");

// 			let l_addr = 0;
// 				for (let i = 0; i < lines.length; i++) {
// 					const hexStr = lines[i].trim();
// 					if (!hexStr.startsWith(":")) {
// 						throw new Error("Hex file doesn't start with ':'");
// 					}
// 					if (!hexStringValid(hexStr.substring(1))) {
// 						throw new Error("Hex file contains invalid characters");
// 					}
// 					if (hexStr.length < 11) {
// 						throw new Error(
// 							"Hex file content is invalid, every line should be at least 11 characters long"
// 						);
// 					}
// 					const fileStruct = {};
// 					fileStruct.length = parseInt(hexStr.substring(1, 3), 16);
// 					fileStruct.offset = parseInt(hexStr.substring(3, 7), 16);
// 					fileStruct.type = parseInt(hexStr.substring(7, 9), 16);
// 					fileStruct.data = hexString2ByteArray(hexStr.substring(9, 9 + fileStruct.length * 2));
// 					fileStruct.check = parseInt(hexStr.substring(9 + fileStruct.length * 2, 9 + fileStruct
// 						.length * 2 + 2), 16);

// 					const type = fileStruct.type;
// 					if (type === 0x00) {
// 						if (fileStruct.format === 0x00) {
// 							l_addr = fileStruct.offset;
// 						} else if (fileStruct.format === 0x02) {
// 							l_addr = (fileStruct.address << 4) + fileStruct.offset;
// 						} else if (fileStruct.format === 0x04) {
// 							l_addr = (fileStruct.address << 16) + fileStruct.offset;
// 						} else {
// 							throw new Error("Invalid type!");
// 						}

// 						if (minAddr < 0) {
// 							minAddr = l_addr;
// 						} else {
// 							minAddr = Math.min(l_addr, minAddr);
// 						}

// 						if (maxAddr < 0) {
// 							maxAddr = l_addr;
// 							maxAddr_Data_Len = fileStruct.data.length;
// 						} else {
// 							maxAddr = Math.max(l_addr, maxAddr);
// 							if (l_addr === maxAddr) {
// 								maxAddr_Data_Len = fileStruct.data.length;
// 							}
// 						}
// 					} else if (type === 0x01) {
// 						fileStruct.format = 0x01;
// 						break;
// 					} else if (type === 0x02) {
// 						if (fileStruct.length !== 0x02) {
// 							throw new Error("Incorrect length for extended segment address record!");
// 						}
// 						if (fileStruct.offset !== 0x0000) {
// 							throw new Error("Incorrect address for extended segment address record!");
// 						}
// 						fileStruct.format = 0x02;
// 						fileStruct.address = (fileStruct.data[0] << 8) | fileStruct.data[1];
// 					} else if (type === 0x03) {
// 						console.log("Start Segment Address record: ignored");
// 					} else if (type === 0x04) {
// 						if (fileStruct.length !== 0x02) {
// 							throw new Error("Incorrect length for extended linear address record!");
// 						}
// 						if (fileStruct.offset !== 0x0000) {
// 							throw new Error("Incorrect address for extended linear address record!");
// 						}
// 						fileStruct.format = 0x04;
// 						fileStruct.address = (fileStruct.data[0] << 8) | fileStruct.data[1];
// 					} else if (type === 0x05) {
// 						console.log("Start Linear Address record: ignored");
// 					} else {
// 						throw new Error("Undefined type!");
// 					}
// 				}
// 		};

// 		reader.onerror = function(event) {
// 			reject(new Error("An error occurred while reading the file"));
// 		};
// 		reader.readAsText(file);
// 		return minAddr;
// }

export async function parseHexFile(path) {

	let reader = null;
	let buffawait = null;
	//#ifndef APP-HARMONY
	// path="./../myApp.app/www/"+path;
	buffawait = await new Promise((resolve, reject) => {
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {
			let a = fs.root.toURL();
			path = path.substring(5);
			fs.root.getFile(path, {
				create: false
			}, fileEntry => {
				fileEntry.file(function(file) {
					reader = new plus.io.FileReader();
					reader.readAsText(file, 'UTF-8');
					reader.onloadend = function(evt) {
						try {
							const hexStr = evt.target.result;
							// console.log('filepath',path);
							// console.log('evt.target',evt);
							// console.log('all hexStr',hexStr);
							const lines = hexStr.split('\n');
							const list = [];
							let totalLen = 0;
							let minAddr = -1;
							let maxAddr = -1;
							let maxAddrDataLen = 0;
							const fileStruct = {};
							fileStruct.format = 0x00;

							for (const line of lines) {

								const hexStr = line.trim();
								fileStruct.length = parseInt(hexStr
									.substring(1, 3), 16);
								fileStruct.offset = parseInt(hexStr
									.substring(3, 7), 16);
								fileStruct.type = parseInt(hexStr
									.substring(7, 9), 16);
								fileStruct.data = hexString2ByteArray(
									hexStr.substring(9, 9 +
										fileStruct.length * 2));
								fileStruct.check = parseInt(hexStr
									.substring(9 + fileStruct
										.length * 2, 9 + fileStruct
										.length * 2 + 2), 16);
								let l_addr = 0;

								let type = fileStruct.type;
								if (type === 0x00) {
									if (fileStruct.format === 0x00) {
										l_addr = fileStruct.offset;
									} else if (fileStruct.format ===
										0x02) {
										l_addr = (fileStruct.address <<
											4) + fileStruct.offset;
									} else if (fileStruct.format ===
										0x04) {
										l_addr = (fileStruct.address <<
											16) + fileStruct.offset;
									} else {
										throw new Error(
											'Invalid type!');
									}

									if (minAddr < 0) {
										minAddr = l_addr;
									} else {
										minAddr = Math.min(l_addr,
											minAddr);
									}

									if (maxAddr < 0) {
										maxAddr = l_addr;
										maxAddrDataLen = fileStruct
											.data.length;
									} else {
										maxAddr = Math.max(l_addr,
											maxAddr);
										if (l_addr === maxAddr) {
											maxAddrDataLen = fileStruct
												.data.length;
										}
									}
									const hexRec = {
										addr: l_addr,
										len: fileStruct.length,
										data: fileStruct.data,
									};
									list.push(hexRec);
									totalLen += fileStruct.data.length;
								} else if (type === 0x01) {
									// File end record, break the loop
									break;
								} else if (type === 0x02) {
									if (fileStruct.length !== 0x02) {
										throw new Error(
											'Incorrect length for extended segment address record!'
										);
									}
									if (fileStruct.offset !== 0x0000) {
										throw new Error(
											'Incorrect address for extended segment address record!'
										);
									}

									fileStruct.format = 0x02;
									fileStruct.address = (fileStruct
											.data[0] << 8) | fileStruct
										.data[1];
								} else if (type === 0x03) {
									// Start segment address record, ignored
								} else if (type === 0x04) {
									if (fileStruct.length !== 0x02) {
										throw new Error(
											'Incorrect length for extended linear address record!'
										);
									}
									if (fileStruct.offset !== 0x0000) {
										throw new Error(
											'Incorrect address for extended linear address record!'
										);
									}

									fileStruct.format = 0x04;
									fileStruct.address = (fileStruct
											.data[0] << 8) | fileStruct
										.data[1];
								} else if (type === 0x05) {
									// Start linear address record, ignored
								} else {
									throw new Error('Undefined type!');
								}
							}

							console.log('Total size:', totalLen);
							console.log('Min address:', minAddr);
							console.log('Max address:', maxAddr);
							console.log('maxAddrDataLen',
								maxAddrDataLen);
							const realSize = maxAddr - minAddr +
								maxAddrDataLen;
							// console.log('realSize',realSize);
							if (realSize !== totalLen) {
								console.log(
									'Hex file addresses are not continuous:',
									'realSize->', realSize,
									'totalLen', totalLen);
							}
							totalLen = Math.max(realSize, totalLen);

							const buffer2 = new Uint8Array(totalLen);
							for (const element of list) {
								const offset = element.addr - minAddr;
								buffer2.set(element.data, offset);
							}
							// return ;
							resolve(buffer2);
						} catch (error) {
							reject(error);
						}

					};
					reader.onerror = function() {
						console.log(' read error');
					};
				}, function(err) {
					reject(new Error("Failed to get"));
				});
			}, function(err) {
				console.log('Failed to get file entry err', err);
				reject(new Error("Failed to get file entry"));
			})
		}, function(err) {
			reject(new Error("Failed to request file system"));
		})
	})

	return buffawait;
	//#endif
	//#ifdef APP-HARMONY
	return new Promise((resolve, reject) => {
		let manager = uni.getFileSystemManager()
		manager.readFile({
			encoding: "utf-8",
			filePath: path,
			success(result) {
				try {
					const hexStr = result.data;
					const lines = hexStr.split('\n');
					const list = [];
					let totalLen = 0;
					let minAddr = -1;
					let maxAddr = -1;
					let maxAddrDataLen = 0;
					const fileStruct = {};
					fileStruct.format = 0x00;

					for (const line of lines) {

						const hexStr = line.trim();
						fileStruct.length = parseInt(hexStr
							.substring(1, 3), 16);
						fileStruct.offset = parseInt(hexStr
							.substring(3, 7), 16);
						fileStruct.type = parseInt(hexStr
							.substring(7, 9), 16);
						fileStruct.data = hexString2ByteArray(
							hexStr.substring(9, 9 +
								fileStruct.length * 2));
						fileStruct.check = parseInt(hexStr
							.substring(9 + fileStruct
								.length * 2, 9 + fileStruct
								.length * 2 + 2), 16);
						let l_addr = 0;

						let type = fileStruct.type;
						if (type === 0x00) {
							if (fileStruct.format === 0x00) {
								l_addr = fileStruct.offset;
							} else if (fileStruct.format ===
								0x02) {
								l_addr = (fileStruct.address <<
									4) + fileStruct.offset;
							} else if (fileStruct.format ===
								0x04) {
								l_addr = (fileStruct.address <<
									16) + fileStruct.offset;
							} else {
								throw new Error(
									'Invalid type!');
							}

							if (minAddr < 0) {
								minAddr = l_addr;
							} else {
								minAddr = Math.min(l_addr,
									minAddr);
							}

							if (maxAddr < 0) {
								maxAddr = l_addr;
								maxAddrDataLen = fileStruct
									.data.length;
							} else {
								maxAddr = Math.max(l_addr,
									maxAddr);
								if (l_addr === maxAddr) {
									maxAddrDataLen = fileStruct
										.data.length;
								}
							}
							const hexRec = {
								addr: l_addr,
								len: fileStruct.length,
								data: fileStruct.data,
							};
							list.push(hexRec);
							totalLen += fileStruct.data.length;
						} else if (type === 0x01) {
							// File end record, break the loop
							break;
						} else if (type === 0x02) {
							if (fileStruct.length !== 0x02) {
								throw new Error(
									'Incorrect length for extended segment address record!'
								);
							}
							if (fileStruct.offset !== 0x0000) {
								throw new Error(
									'Incorrect address for extended segment address record!'
								);
							}

							fileStruct.format = 0x02;
							fileStruct.address = (fileStruct
									.data[0] << 8) | fileStruct
								.data[1];
						} else if (type === 0x03) {
							// Start segment address record, ignored
						} else if (type === 0x04) {
							if (fileStruct.length !== 0x02) {
								throw new Error(
									'Incorrect length for extended linear address record!'
								);
							}
							if (fileStruct.offset !== 0x0000) {
								throw new Error(
									'Incorrect address for extended linear address record!'
								);
							}

							fileStruct.format = 0x04;
							fileStruct.address = (fileStruct
									.data[0] << 8) | fileStruct
								.data[1];
						} else if (type === 0x05) {
							// Start linear address record, ignored
						} else {
							throw new Error('Undefined type!');
						}
					}

					console.log('Total size:', totalLen);
					console.log('Min address:', minAddr);
					console.log('Max address:', maxAddr);
					console.log('maxAddrDataLen',
						maxAddrDataLen);
					const realSize = maxAddr - minAddr +
						maxAddrDataLen;
					// console.log('realSize',realSize);
					if (realSize !== totalLen) {
						console.log(
							'Hex file addresses are not continuous:',
							'realSize->', realSize,
							'totalLen', totalLen);
					}
					totalLen = Math.max(realSize, totalLen);

					const buffer2 = new Uint8Array(totalLen);
					for (const element of list) {
						const offset = element.addr - minAddr;
						buffer2.set(element.data, offset);
					}
					// return ;
					resolve(buffer2);
				} catch (error) {
					reject(error);
				}
			},
			fail(result) {
				console.log(result)
				reject(result)
			}
		})
	})

	//#endif
}

// function hexStringValid(str) {
//   const hexChars = '0123456789ABCDEFabcdef';
//   for (const char of str) {
//     if (!hexChars.includes(char)) {
//       return false;
//     }
//   }
//   return true;
// }

// function hexString2ByteArray(hexStr) {
//   const bytes = [];
//   for (let i = 0; i < hexStr.length; i += 2) {
//     const byteStr = hexStr.substring(i, i + 2);
//     const byte = parseInt(byteStr, 16);
//     bytes.push(byte);
//   }
//   return bytes;
// }
export function bytesToUtf8String(uint8) {
	let result = '';
	let i = 0;
	let c = 0;
	let c1 = 0;
	let c2 = 0;
	let c3 = 0;

	while (i < uint8.length) {
		c = uint8[i++];
		if (c === 0) {
			break;
		}
		if (c < 0x80) {
			// 0xxxxxxx
			result += String.fromCharCode(c);
		} else if (c < 0xE0) {
			// 110xxxxx 10xxxxxx
			c2 = uint8[i++];
			result += String.fromCharCode(((c & 0x1F) << 6) | (c2 & 0x3F));
		} else if (c < 0xF0) {
			// 1110xxxx 10xxxxxx 10xxxxxx
			c2 = uint8[i++];
			c3 = uint8[i++];
			result += String.fromCharCode(((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F));
		} else if (c < 0xF8) {
			// 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
			c2 = uint8[i++];
			c3 = uint8[i++];
			const c4 = uint8[i++];
			result += String.fromCharCode(((c & 0x07) << 18) | ((c2 & 0x3F) << 12) | ((c3 & 0x3F) << 6) | (c4 & 0x3F));
		} else {
			// Invalid sequence
			throw new Error('Invalid UTF-8 sequence');
		}
	}

	return result;
}
export function hexStringValid(s) {
	var chars = s.split('');
	for (var i = 0; i < chars.length; i++) {
		if (
			('0' <= chars[i] && chars[i] <= '9') ||
			('a' <= chars[i] && chars[i] <= 'f') ||
			('A' <= chars[i] && chars[i] <= 'F')
		) {

		} else {
			return false;
		}
	}
	return true;
}

export function hexString2ByteArray(hexString) {
	try {
		if (hexString == null || hexString === '') {
			return null;
		}
		hexString = hexString.toUpperCase();
		var length = hexString.length / 2;
		var hexChars = hexString.split('');
		var d = new Uint8Array(length);
		for (var i = 0; i < length; i++) {
			var pos = i * 2;
			d[i] = (charToByte(hexChars[pos]) << 4) | charToByte(hexChars[pos + 1]);
		}
		return d;
	} catch (e) {
		return null;
	}
}

export function bytesToHexString(bArr) {
	if (bArr == null || bArr.length === 0) {
		return '';
	}
	var sb = '';
	var sTmp;
	for (var i = 0; i < bArr.length; i++) {
		sTmp = (bArr[i] & 0xff).toString(16);
		if (sTmp.length < 2) {
			sb += '0';
		}
		sb += sTmp.toUpperCase() + ' ';
	}
	return sb;
}

export function charToByte(c) {
	return '0123456789ABCDEF'.indexOf(c);
}

// 调用示例
// const file = document.getElementById('fileInput').files[0];
// parseHexFileStartAddr(file)
// 	.then(minAddr => {
// 		console.log("min address: " + minAddr);
// 	})
// 	.catch(error => {
// 		console.error(error);
// 	});
export function readyWiFiScan() {
	const byteBuffer = new Uint8Array(1);
	byteBuffer[0] = 0x14;
	return byteBuffer;
}
export function stopWiFiScan() {
	const byteBuffer = new Uint8Array(1);
	byteBuffer[0] = 0x15;
	return byteBuffer;
}
//获取开始扫秒wifi
export function getStartWiFiScan() {
	const byteBuffer = new Uint8Array(1);
	byteBuffer[0] = 0x10;
	return byteBuffer;
}
export function getStartWiFiScanStatus() {
	const byteBuffer = new Uint8Array(1);
	byteBuffer[0] = 0x11;
	return byteBuffer;
}
export function resetWiFiScan() {
	const byteBuffer = new Uint8Array(1);
	byteBuffer[0] = 0x20;
	return byteBuffer;
}
export function getWiFiData(number) {
	const byteBuffer = new Uint8Array(2);
	byteBuffer[0] = 0x12;
	byteBuffer[1] = number;
	return byteBuffer;
}
export function getWiFiSsid(number, length) {
	const byteBuffer = new Uint8Array(3);
	byteBuffer[0] = 0x13;
	byteBuffer[1] = number;
	byteBuffer[2] = length;
	return byteBuffer;
}
export default {
	getStartWiFiScan: getStartWiFiScan,
	getStartWiFiScanStatus: getStartWiFiScanStatus,
	getWiFiData: getWiFiData,
	getWiFiSsid: getWiFiSsid,
	bytesToHexString: bytesToHexString,
	bytesToUtf8String: bytesToUtf8String,
	resetWiFiScan: resetWiFiScan,
	readyWiFiScan: readyWiFiScan,
	stopWiFiScan: stopWiFiScan
}