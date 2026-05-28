// enum/command-type.enum.ts

/**
 * 设备指令类型枚举
 * @description 用于控制设备的各种功能
 */
export enum CommandType {
  /**
   * RGB 灯控制
   */
  RGB_LIGHT = 1,
  /**
   * 蜂鸣器控制
   */
  BUZZER = 2,
  /**
   * 连续定位模式
   */
  CONTINUOUS_LOCATION = 4,
  /**
   * 长连接模式
   */
  LONG_CONNECTION = 8,
  /**
   * 触发一次定位
   */
  SINGLE_LOCATION = 16
}
// 导出常量别名，方便使用
export const COMMAND_TYPE = CommandType;