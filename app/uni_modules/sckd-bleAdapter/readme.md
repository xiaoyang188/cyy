# sckd-bleAdapter

蓝牙适配器插件，支持蓝牙设备连接、数据传输和位置监听功能。

## 功能特性

### 蓝牙功能
- ✅ 蓝牙适配器管理
- ✅ 设备搜索和连接
- ✅ BLE 设备通信
- ✅ 权限管理
- ✅ 屏幕常亮控制

### 位置监听功能 🆕
- ✅ 实时位置变化监听 (`onLocationChange`)
- ✅ 位置更新控制 (`startLocationUpdate` / `stopLocationUpdate`)
- ✅ 错误处理 (`onLocationChangeError`)
- ✅ 支持 WGS84 和 GCJ02 坐标系
- ✅ 自动坐标系转换
- ✅ 符合 uniapp API 规范

### 应用路径获取功能 🆕
- ✅ 获取应用沙盒内各种路径 (`getAppPath`)
- ✅ 获取特定类型路径 (`getSpecificPath`)
- ✅ 检查路径是否存在 (`checkPathExists`)
- ✅ 支持 7 种路径类型（数据、缓存、临时等）
- ✅ 基于 HarmonyOS Context API

### 文件压缩解压功能 🆕
- ✅ 文件/文件夹压缩为 ZIP 格式 (`compressFile`)
- ✅ ZIP 文件解压 (`decompressFile`)
- ✅ 异步操作模式
- ✅ 自动路径验证和错误处理
- ✅ 沙箱路径支持
- ✅ 压缩级别可配置 (1-9)
- ✅ 基于 HarmonyOS zlib API

### 屏幕方向控制功能 🆕
- ✅ 设置屏幕方向 (`setScreenOrientation`)
- ✅ 获取当前屏幕方向 (`getScreenOrientation`)
- ✅ 快捷锁定竖屏/横屏 (`lockPortrait` / `lockLandscape`)
- ✅ 解锁屏幕方向 (`unlockOrientation`)
- ✅ 支持 12 种屏幕方向模式
- ✅ 完整的错误处理和回调机制
- ✅ 基于 HarmonyOS Window API

### 检查更新功能 🆕
- ✅ 检查应用是否有新版本 (`checkAppUpdate`)
- ✅ 显示系统更新弹窗 (`showUpdateDialog`)
- ✅ 一键检查并显示更新 (`checkAndShowUpdate`)
- ✅ 支持自定义回调处理
- ✅ 基于 HarmonyOS UpdateManager API
- ✅ 自动跳转应用市场更新

## 快速开始

### 位置监听示例

```javascript
import { 
  onLocationChange, 
  startLocationUpdate, 
  stopLocationUpdate 
} from '@/uni_modules/sckd-bleAdapter'

// 监听位置变化
onLocationChange((location) => {
  console.log('位置更新:', {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy: location.accuracy
  })
})

// 开始位置监听
startLocationUpdate({
  type: 'gcj02', // 使用国测局坐标系
  success: () => console.log('位置监听已开始'),
  fail: (err) => console.error('启动失败:', err.errMsg)
})

// 停止位置监听
stopLocationUpdate({
  success: () => console.log('位置监听已停止')
})
```

### 应用路径获取示例

```javascript
import { getAppPath, getSpecificPath } from '@/uni_modules/sckd-bleAdapter'

// 获取所有应用路径
getAppPath().then(pathInfo => {
  console.log('应用数据目录:', pathInfo.filesDir)
  console.log('应用缓存目录:', pathInfo.cacheDir)
})

// 获取特定路径
getSpecificPath('cache').then(cachePath => {
  console.log('缓存目录:', cachePath)
})
```

### 文件压缩解压示例

```javascript
import { 
  compressFile, 
  decompressFile, 
  getCompressCacheDir,
  isValidZipFile 
} from '@/uni_modules/sckd-bleAdapter'

// 压缩文件
async function compressExample() {
  const cacheDir = await getCompressCacheDir()
  
  const result = await compressFile({
    inFile: `${cacheDir}/myfile.txt`,
    outFile: `${cacheDir}/myfile.zip`,
    level: 6 // 压缩级别 1-9
  })
  
  if (result.success) {
    console.log('压缩成功:', result.outputPath)
  } else {
    console.error('压缩失败:', result.message)
  }
}

// 解压文件
async function decompressExample() {
  const cacheDir = await getCompressCacheDir()
  const zipFile = `${cacheDir}/myfile.zip`
  
  // 验证zip文件
  const isValid = await isValidZipFile(zipFile)
  if (!isValid) {
    console.error('无效的zip文件')
    return
  }
  
  const result = await decompressFile({
    inFile: zipFile,
    outDir: `${cacheDir}/extracted`,
    overwrite: true
  })
  
  if (result.success) {
    console.log('解压成功:', result.outputDir)
    console.log('解压文件:', result.extractedFiles)
  } else {
    console.error('解压失败:', result.message)
  }
}
```

### 屏幕方向控制示例

```javascript
import { 
  setScreenOrientation, 
  getScreenOrientation, 
  lockPortrait, 
  lockLandscape, 
  unlockOrientation,
  ScreenOrientation 
} from '@/uni_modules/sckd-bleAdapter'

// 锁定为竖屏
lockPortrait({
  success: () => {
    console.log('已锁定为竖屏')
  },
  fail: (error) => {
    console.error('锁定失败:', error)
  }
})

// 锁定为横屏
lockLandscape({
  success: () => {
    console.log('已锁定为横屏')
  }
})

// 解锁屏幕方向（允许自动旋转）
unlockOrientation({
  success: () => {
    console.log('已允许自动旋转')
  }
})

// 设置特定屏幕方向
setScreenOrientation({
  orientation: ScreenOrientation.LANDSCAPE_INVERTED, // 反向横屏
  success: () => {
    console.log('设置屏幕方向成功')
  },
  fail: (error) => {
    console.error('设置失败:', error)
  }
})

// 获取当前屏幕方向
getScreenOrientation({
  success: (result) => {
    console.log('当前屏幕方向:', result.orientation)
    if (result.orientation === ScreenOrientation.PORTRAIT) {
      console.log('当前是竖屏模式')
    } else if (result.orientation === ScreenOrientation.LANDSCAPE) {
      console.log('当前是横屏模式')
    }
  }
})
```

### 检查更新示例

```javascript
import { 
  checkAppUpdate, 
  showUpdateDialog, 
  checkAndShowUpdate,
  UpdateAvailableCode,
  ShowUpdateResultCode
} from '@/uni_modules/sckd-bleAdapter'

// 检查应用更新
checkAppUpdate({
  success: (result) => {
    if (result.updateAvailable === UpdateAvailableCode.LATER_VERSION_EXIST) {
      console.log('发现新版本')
      // 显示更新弹窗
      showUpdateDialog({
        success: (resultCode) => {
          if (resultCode === ShowUpdateResultCode.SHOW_DIALOG_SUCCESS) {
            console.log('更新弹窗显示成功')
          }
        }
      })
    } else {
      console.log('当前已是最新版本')
    }
  },
  fail: (error) => {
    console.error('检查更新失败:', error.message)
  }
})

// 一键检查并显示更新
checkAndShowUpdate({
  autoShowDialog: true,
  success: (result) => {
    console.log('检查更新完成:', result.updateAvailable)
  },
  dialogOptions: {
    success: (resultCode) => {
      console.log('弹窗显示结果:', resultCode)
    }
  }
})
```

## 文档链接

- [位置监听使用说明](./位置监听使用说明.md)
- [应用路径获取使用说明](./应用路径获取使用说明.md)
- [压缩解压使用说明](./压缩解压使用说明.md) 🆕
- [屏幕方向控制使用说明](./屏幕方向控制使用说明.md) 🆕
- [检查更新使用说明](./检查更新使用说明.md) 🆕
- [位置监听测试文件](./test-location.js)
- [应用路径测试文件](./test-apppath.js)
- [压缩解压示例文件](./compress-example.js) 🆕
- [屏幕方向控制示例文件](./screen-orientation-example.js) 🆕

### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS uni-app兼容模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[UTS 标准模式组件](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-vue-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)

## 权限配置

在 HarmonyOS Next 平台使用位置功能需要在 `harmony-configs/entry/src/main/module.json5` 中配置权限：

```json
{
  "requestPermissions": [
    {
      "name": "ohos.permission.APPROXIMATELY_LOCATION",
      "reason": "$string:location_permission_reason",
      "usedScene": {
        "abilities": ["EntryAbility"],
        "when": "inuse"
      }
    },
    {
      "name": "ohos.permission.LOCATION",
      "reason": "$string:precise_location_permission_reason",
      "usedScene": {
        "abilities": ["EntryAbility"],
        "when": "inuse"
      }
    }
  ]
}
```

## 版本历史

### v1.3.0 (最新)
- 🆕 新增文件压缩解压功能
- 🆕 支持 `compressFile` / `decompressFile` 异步操作
- 🆕 基于 Promise 的异步操作
- 🆕 支持压缩级别配置 (1-9)
- 🆕 支持 ZIP 文件验证 (`isValidZipFile`)
- 🆕 基于 HarmonyOS zlib API 实现
- 📝 完善压缩解压文档和示例

### v1.2.0
- 🆕 新增应用路径获取功能
- 🆕 支持 `getAppPath` / `getSpecificPath` / `checkPathExists`
- 🆕 支持获取应用沙盒内 7 种路径类型
- 🆕 基于 HarmonyOS Context API 实现
- 📝 完善文档和测试用例

### v1.1.0
- 🆕 新增位置变化监听功能
- 🆕 支持 `onLocationChange` / `offLocationChange`
- 🆕 支持 `startLocationUpdate` / `stopLocationUpdate`
- 🆕 支持 `onLocationChangeError` / `offLocationChangeError`
- 🆕 支持 WGS84 和 GCJ02 坐标系转换
- 📝 完善文档和使用示例