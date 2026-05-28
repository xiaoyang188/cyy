// enum/command-type.enum.ts

/**
 * 设备指令类型枚举
 * @description 用于控制设备的各种功能
 */
export enum CommandType {

  SYSTEM = 0,
  USER=1,
  DEVICE=2
 
}
// 导出常量别名，方便使用
export const MREEAGE_TYPE = CommandType;