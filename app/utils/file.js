import {$uni} from "@/utils/main.js"
export function isExist(path) {
	return new Promise((resolve, reject) => {
		try {
			//#ifdef APP-PLUS
			plus.io.resolveLocalFileSystemURL(path, () => {
				resolve(true)
			}, (err) => {
				if (String(err.message || '').toLowerCase().includes('not') || err.code === 5) {
					resolve(false)
				} else {
					reject(err)
				}
			})
			return
			//#endif
			//#ifdef APP-HARMONY
			let manager = uni.getFileSystemManager();
			manager.access({
				path: path,
				success(res) {
					console.log("isisisisis", res)
					if (res.errMsg == "access:ok") {
						resolve(true)
					} else {
						reject(res)
					}
				},
				fail(err) {
					console.log("isisisiserr", err)
					if (String(err.errMsg || '').includes("No such file")) {
						resolve(false)
					} else {
						reject(err)
					}
				}
			})
			//#endif
		} catch (e) {
			reject(e)
		}
	})
}


export function mkdirDir(path) {
	return new Promise((resolve, reject) => {
		let manager = uni.getFileSystemManager();
		manager.mkdir({
			dirPath: path,
			recursive: true,
			success(res) {
				console.log("mmmmmmmm", res)
				resolve(true)

			},
			fail(err) {
				console.log("mmmeemmmm", err)
				if (err.errCode == 1301005) {
					resolve(false)
				} else {
					reject(err)
				}

			}
		})
	})
}

export function writeFile(path, value, encode) {
	return new Promise((resolve, reject) => {
		let manager = uni.getFileSystemManager()
		manager.writeFile({
			filePath: path,
			data: value,
			encoding: "utf-8",
			success(res) {
				resolve(res)
				console.log("write logs success", res)
			},
			fail(err) {
				reject(err)
				console.log("write logs error", err)
			}
		})
	})
}
export function directoryFileList(path) {
	return new Promise((resolve, reject) => {
		let manager = uni.getFileSystemManager()
		manager.readdir({
			dirPath: path,
			success(res) {
				resolve(res.files)
				console.log("dddddddd", res)
			},
			fail(err) {
				reject(err)
				console.log("ddddddddd", err)
			}
		})
	})
}

export function isFile(path) {
	return new Promise((resolve, reject) => {
		let manager = uni.getFileSystemManager()
		manager.stat({
			path: path,
			recursive: false,
			success(res) {
				console.log("fffffff", res)
				resolve(res.stats[0].stats.mIsFile)

			},
			fail(err) {
				console.log("fffffff", err)
				reject(err)
			}
		})
	})
}

export function deleteFile(path) {
	return new Promise((resolve, reject) => {
		let manager = uni.getFileSystemManager();
		try {
			manager.unlink({
				filePath: path,
				success(res) {
					console.log("dddddddd", res)
					resolve(res)
				},
				fail(err) {
					console.log("ddddddddd", err)
					reject(err)
				}
			})
		} catch (err) {
			reject(err)
		}
	})
}

export function deleteFileSync(path) {
	let manager = uni.getFileSystemManager();
	try {
		manager.unlinkSync({
			filePath: path
		})
	} catch (err) {
		console.log(err)
	}
}
export function getStaticOh(url) {
	let path=url
	if(getApp().globalData.staticPath=='' || !getApp().globalData.staticPath){
		return path
	}
	if(path.startsWith("/static")){
		path=`${getApp().globalData.staticPath}${url}`
	}
	// let path = $uni.getStaticPath(url)
	console.log("getStaticOh", path)
	return path
}
