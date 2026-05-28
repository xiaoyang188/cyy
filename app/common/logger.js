import {
	$uni
} from "@/utils/main.js"
import {
	isExist,
	mkdirDir,
	writeFile,
	directoryFileList,
} from "@/utils/file.js"

// 新建logger.js文件
// 日志存放的文件夹目录
const LOG_DIR = '_doc/logs';
/**
 * 获取当前时间
 */
function getDayStr() {
	var y, m, d, h, mm, s;
	var date = new Date();
	y = date.getFullYear();
	m = date.getMonth() + 1;
	d = date.getDate();
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	// //console.log('日期:',y,m,d)
	// return '20220607' // 生成指定日期
	return '' + y + m + d;
}
/**
 * 获取当前时间，yyyy-mm-dd hh:mm:ss
 * 用于记录日志的时间信息
 */
function getTimeStr() {
	var y, m, d, h, mm, s;
	var date = new Date();
	y = date.getFullYear();
	m = date.getMonth() + 1;
	d = date.getDate();
	h = date.getHours();
	mm = date.getMinutes();
	s = date.getSeconds();
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	mm = mm < 10 ? '0' + mm : mm;
	s = s < 10 ? '0' + s : s;
	var timeStr = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
	return timeStr;
}
/**
 * 日志TXT的名称
 */
function getLogFileName() {
	const txt = LOG_DIR + '/' + getDayStr() + '.txt';
	// //console.log('TXT文件名称:',txt)
	return txt;
}
let tasks = [];
/**
 * @param {Object} tag 标识
 * @param {Object} msg 空格
 */
function writeToTxt(tag) {
	return new Promise((resolve, reject) => {
		let msgs = '';
		for (var i = 1; i < arguments.length; i++) {
			const item = arguments[i];
			if (
				typeof item == 'string' ||
				typeof item == 'number' ||
				typeof item == 'boolean'
			) {
				msgs = msgs + '\t' + item;
			} else {
				msgs = msgs + '\t' + JSON.stringify(item);
			}
		}
		// 获取当前时间
		let txt_msg = getTimeStr() + '\t[' + tag + ']\t' + msgs + '\n';
		tasks.push(txt_msg);
		resolve(true);
	}).then(() => {
		clearTask();
	});
}
// 清空日志到日志文件
function clearTask() {
	// #ifdef APP-PLUS
	if (tasks.length === 0) {
		return;
	}
	const txt_msg = tasks.join('');
	tasks = [];
	const fileName = getLogFileName();
	console.log('into cleartask')
	plus.io.requestFileSystem(
		plus.io.PRIVATE_DOC,
		fs => {
			fs.root.getFile(
				fileName, {
					create: true,
				},
				function(entry) {
					// 写入到本地
					entry.createWriter(
						function(writer) {
							writer.onwrite = function(e) {
								// console.log('文件写入成功，文件URL为：', entry.toLocalURL());
								// console.log('写入本地日志 >>>> ', txt_msg);
							};
							writer.onerror = function(e) {
								if (process.env.NODE_ENV === 'development') {
									console.log(
										'写入本地日志失败 >>>> ',
										JSON.stringify(e),
										txt_msg
									);
								}
							};
							// Write data to the end of file.
							writer.seek(writer.length);
							writer.write(txt_msg);
						},
						function(e) {
							if (process.env.NODE_ENV === 'development') {
								console.log(e.message);
							}
						}
					);
				}
			);
		},
		function(e) {
			if (process.env.NODE_ENV === 'development') {
				console.log('Request file system failed: ' + JSON.stringify(e));
			}
		}
	);
	// #endif
	//#ifdef APP-HARMONY
	if (tasks.length === 0) {
		return;
	}
	const txt_msg = tasks.join('');
	tasks = [];
	const fileName = getLogFileName();
	console.log('into cleartask')

	$uni.getAppPath().then(async (path) => {

		let filepath = path.cacheDir + "/"
		if (await isExist(filepath + LOG_DIR) == false) {
			await mkdirDir(filepath + LOG_DIR)
		}
		await writeFile(filepath + fileName, txt_msg, "utf-8")
	}).catch((err) => {
		console.log("write logs error", err)
	})
	//#endif
}

function getTxtFilePaths(callback) {
	//#ifndef APP-HARMONY
	const dirPath = LOG_DIR; // 请确保这是正确的路径
	plus.io.requestFileSystem(
		plus.io.PRIVATE_DOC,
		function(fs) {
			// 获取到文件系统的根目录
			var root = fs.root;
			// 获取目录对象
			root.getDirectory(dirPath, {
				create: false // 如果目录不存在，不创建新目录
			}, function(entry) {
				// 目录存在，可以查询目录下的文件
				entry.createReader().readEntries(function(entries) {
					// entries 是一个包含目录中所有文件和子目录的数组
					// 初始化文件数组
					let files = [];
					for (var i = 0; i < entries.length; i++) {
						var entry = entries[i];
						if (entry.isDirectory) {
							console.log('Directory: ' + entry.name);
						} else if (entry.isFile && /\.txt$/.test(entry.name)) {

							// 获取文件的本地URL
							var fileURL = entry.toLocalURL();
							console.log('File URL: ' + fileURL);
							let item = {
								name: 'logFile' + i,
								uri: fileURL
							}
							files.push(item);
							if (i === entries.length - 1) {
								callback(files);
							}
						}
					}
				}, function(e) {
					// 读取目录失败
					console.error('Failed to read directory entries: ' + e.message);
				});
			}, function(e) {
				// 获取目录失败，可能是目录不存在
				console.error('Failed to get directory: ' + e.message);
			});
		},
		function(e) {
			// 请求文件系统失败
			console.error('Failed to request file system: ' + e.message);
		}
	);
	//#endif
	//#ifdef APP-HARMONY
	$uni.getAppPath().then(async (path) => {
		let fileDir = path.cacheDir + "/" + LOG_DIR
		if (await isExist(fileDir) == false) {
			console.log("No such file or directory")
			return
		}
		let list = await directoryFileList(path.cacheDir + "/" + LOG_DIR)
		let files = [];
		for (let i = 0; i < list.length; i++) {
			var entry = list[i];
			let filePath = path.cacheDir + "/" + LOG_DIR + "/" + entry
			if (await isFile(filePath) && /\.txt$/.test(entry)) {
				let item = {
					name: 'logFile' + i,
					uri: filePath
				}
				files.push(item);
				if (i == list.length - 1) {
					callback(files);
				}
			}
		}
	}).catch((err) => {
		console.error('Failed to get directory: ' + err);
	})
	//#endif

}


/**
 * 压缩所有的日志为zip
 */
function zipLogDir(callback) {
	// #ifdef APP-PLUS
	var zipFile = '_doc/logs.zip';
	var targetPath = LOG_DIR;

	// 开始压缩文件
	if (process.env.NODE_ENV === 'development') {
		console.log('开始压缩', targetPath, zipFile);
	}
	plus.zip.compress(
		targetPath,
		zipFile,
		function(res) {
			if (process.env.NODE_ENV === 'development') {
				console.log('开始压缩 Compress success!', res);
			}
			if (callback) {
				callback({
					success: true,
					res,
					zipPath: zipFile,
				});
			}
		},
		function(error) {
			if (process.env.NODE_ENV === 'development') {
				console.error('开始压缩 Compress error!', error);
			}
			if (callback) {
				callback({
					success: false,
					error,
				});
			}
		}
	);
	// #endif
	//#ifdef APP-HARMONY
	var zipFile = '_doc/logs.zip';
	var targetPath = LOG_DIR;

	// 开始压缩文件
	if (process.env.NODE_ENV === 'development') {
		console.log('开始压缩', targetPath, zipFile);
	}
	$uni.getAppPath().then((path) => {
		var zipFile = path.cacheDir + "/_doc/logs.zip";
		var targetPath = path.cacheDir + "/" + LOG_DIR;
		$uni.compressFile({
			inFile: targetPath,
			outFile: zipFile
		}).then((res) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('开始压缩 Compress success!', res);
			}
			if (callback) {
				callback({
					success: true,
					res,
					zipPath: zipFile,
				});
			}
		}).catch((err) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('开始压缩 Compress error!', err);
			}
			if (callback) {
				callback({
					success: false,
					err,
				});
			}
		})
	})
	//#endif
}
/**
 * 删除多少天之前的日志文件
 */
function removeFile(durationDay) {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		if (!durationDay || durationDay <= 0) {
			durationDay = 10;
		}
		var dirPath = LOG_DIR;
		plus.io.requestFileSystem(
			plus.io.PRIVATE_DOC,
			function(fs) {
				// 获取到文件系统的根目录
				var root = fs.root;
				// 获取目录对象
				root.getDirectory(dirPath, {
					create: false // 如果目录不存在，不创建新目录
				}, function(entry) {
					// 目录存在，可以查询目录下的文件
					entry.createReader().readEntries(function(entries) {

						let now = getDayStr();
						for (var i = 0; i < entries.length; i++) {
							var entry = entries[i];
							if (entry.isDirectory) {
								console.log('Directory: ' + entry.name);
							} else if (entry.isFile && /\.txt$/.test(entry.name)) {
								let day = entry.name.replace('.txt', '');
								if (parseInt(day) + parseInt(durationDay) < parseInt(now)) {
									console.log('需要删除的日志是', entry.name);
									try {
										entry.remove(
											function() {
												if (process.env.NODE_ENV ===
													'development') {
													console.error('删除日志成功', entry.name);
												}
											},
											function(e) {
												if (process.env.NODE_ENV ===
													'development') {
													console.error('删除日志失败', entry.name,
														e);
												}
											}
										);
									} catch (e) {
										if (process.env.NODE_ENV === 'development') {
											console.error('删除日志失败', entry.name, e);
										}
									}
								} else {
									if (process.env.NODE_ENV === 'development') {
										console.log('保留的日志是', entry.name);
									}
								}
							}
						}
					}, function(e) {
						// 读取目录失败
						console.error('Failed to read directory entries: ' + e.message);

					});
					resolve()
				}, function(e) {
					// 获取目录失败，可能是目录不存在
					console.error('Failed to get directory: ' + e.message);
					resolve()
				});
			},
			function(e) {
				// 请求文件系统失败
				console.error('Failed to request file system: ' + e.message);
				resolve()
			}
		);

	});
	// #endif
	//#ifdef APP-HARMONY
	return new Promise((resolve, reject) => {
		if (!durationDay || durationDay <= 0) {
			durationDay = 10;
		}
		$uni.getAppPath().then(async (path) => {
			var dirPath = path.cacheDir + "/" + LOG_DIR;
			if (await isExist(dirPath) == false) {
				console.log("No such file or directory")
				return
			}
			directoryFileList(dirPath).then(async (list) => {
				let now = getDayStr();
				for (let i = 0; i < list.length; i++) {
					var entry = list[i];
					let filePath = dirPath + "/" + entry
					if (await isFile(filePath) && /\.txt$/.test(entry)) {
						let day = entry.replace('.txt', '');
						if (parseInt(day) + parseInt(durationDay) < parseInt(now)) {
							console.log('需要删除的日志是', entry);

							try {
								deleteFile(dirPath + "/" + entry).then((res) => {
									if (process.env.NODE_ENV ===
										'development') {
										console.log('删除日志成功', entry, res);
									}
								}).catch((err) => {
									if (process.env.NODE_ENV ===
										'development') {
										console.error('删除日志失败', entry.name,
											err);
									}
								})
							} catch (err) {
								if (process.env.NODE_ENV === 'development') {
									console.error('删除日志失败', entry, err);
								}
							}

						} else {
							if (process.env.NODE_ENV === 'development') {
								console.log('保留的日志是', entry);
							}
						}
					}
				}
			})
		})
	})
	//#endif
}

/**
 * 自定义TXT日志
 */
const logger = {
	/**
	 * @param {Object} msg 日志信息的字符串信息
	 */
	debug: function() {
		writeToTxt('DEBUG', ...arguments);
		//production
		if (process.env.NODE_ENV === 'development') {
			console.debug(...arguments);
		}
	},
	log: function() {
		writeToTxt('LOG', ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.log(...arguments);
		}
	},
	info: function() {
		writeToTxt('INFO', ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.info(...arguments);
		}
	},
	warn: function() {
		writeToTxt('WARN', ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.warn(...arguments);
		}
	},
	error: function() {
		writeToTxt('ERROR', ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.error(...arguments);
		}
	},
	/**
	 * @param {String} tag 日志信息的自定义信息
	 */
	tag: function(tag) {
		writeToTxt(tag, ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.log(...arguments);
		}
	},
	/**
	 * @param {Object} msg 日志信息的字符串信息
	 */
	network: function() {
		writeToTxt('NETWORK', ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.log(...arguments);
		}
	},
	/**
	 * @param {Object} msg 日志信息的字符串信息
	 */
	logIpExchange: function(msg) {
		writeToTxt('IpExchange', ...arguments);
		if (process.env.NODE_ENV === 'development') {
			console.log(...arguments);
		}
	},
	/**
	 * 压缩成zip，并返回路径
	 * @param {Object} callback
	 */
	zipLogDir,
	/**
	 * 删除多少${durationDay}天之前的日志文件
	 * @param {Object} durationDay 默认是10天
	 */
	removeFile,
	/**
	 * 主要使用方法。先移除
	 * @param {Object} callback
	 */
	removeFileAndZipLogDir(callback) {
		removeFile().then(() => {
			zipLogDir(callback);
		});
	},
	getTxtFilePaths,
};

export default logger;