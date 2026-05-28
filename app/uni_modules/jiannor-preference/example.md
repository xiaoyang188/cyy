# jiannor-preference 使用示例

这是一个用于鸿蒙平台的Preferences数据存储插件，基于鸿蒙原生API实现。

## 功能特性

- ✅ getPreferences - 获取Preferences实例
- ✅ setPreferences - 设置键值对数据
- ✅ getPreferencesValue - 获取指定键的值
- ✅ deletePreferences - 删除Preferences文件
- ✅ clearPreferences - 清空Preferences所有数据

## 使用方法

### 1. 引入插件

```javascript
import { 
  getPreferences, 
  setPreferences, 
  getPreferencesValue,
  deletePreferences, 
  clearPreferences 
} from "@/uni_modules/jiannor-preference"
```

### 2. 设置数据

```javascript
setPreferences({
  name: 'userSettings',
  key: 'username',
  value: 'john_doe',
  success: (res) => {
    console.log('设置成功:', res)
  },
  fail: (err) => {
    console.error('设置失败:', err)
  }
})
```

### 3. 获取数据

```javascript
getPreferencesValue({
  name: 'userSettings',
  key: 'username',
  defaultValue: '',
  success: (res) => {
    console.log('获取到的值:', res.value)
  },
  fail: (err) => {
    console.error('获取失败:', err)
  }
})
```

### 4. 获取Preferences实例

```javascript
getPreferences({
  name: 'userSettings',
  success: (res) => {
    console.log('获取实例成功:', res.data)
  },
  fail: (err) => {
    console.error('获取实例失败:', err)
  }
})
```

### 5. 清空所有数据

```javascript
clearPreferences({
  name: 'userSettings',
  success: (res) => {
    console.log('清空成功:', res)
  },
  fail: (err) => {
    console.error('清空失败:', err)
  }
})
```

### 5. 删除指定键的值

```javascript
import { deletePreferencesValue } from "@/uni_modules/jiannor-preference"

deletePreferencesValue({
  name: 'myPrefs',
  key: 'username',
  success: (res) => {
    console.log('删除键值成功:', res.success)
  },
  fail: (err) => {
    console.error('删除键值失败:', err.errMsg)
  }
})
```

### 6. 删除Preferences文件

```javascript
import { deletePreferences } from "@/uni_modules/jiannor-preference"

deletePreferences({
  name: 'myPrefs',
  success: (res) => {
    console.log('删除成功:', res.success)
  },
  fail: (err) => {
    console.error('删除失败:', err.errMsg)
  }
})
```

## 错误码说明

- 9010001: 获取Preferences失败
- 9010002: 设置Preferences失败
- 9010003: 删除Preferences失败
- 9010004: 清空Preferences失败
- 9010005: 参数错误
- 9010006: 删除Preferences键值失败

## 注意事项

1. 所有API都是异步的，需要通过回调函数处理结果
2. name参数是必需的，用于标识不同的Preferences文件
3. 设置和获取值时，key参数也是必需的
4. 支持存储各种数据类型（字符串、数字、布尔值、对象等）
5. 数据会持久化存储在设备上