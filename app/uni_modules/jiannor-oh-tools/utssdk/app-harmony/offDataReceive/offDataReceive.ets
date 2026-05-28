import { harmonyShare } from "@kit.ShareKit";
import { uniformTypeDescriptor as utd } from '@kit.ArkData';
import { AppStorageV2, UIContext } from '@kit.ArkUI';
import { common } from "@kit.AbilityKit";

export function offDataReceiveNative() {
  try {
    if (!canIUse('SystemCapability.Collaboration.HarmonyShare')) {
      console.log("HarmonyShare is not supported on your device")
      throw new Error("HarmonyShare is not supported on your device")
    }
    let context =
      AppStorageV2.connect(UIContext, 'uiContext', () => new UIContext())?.getHostContext() as common.UIAbilityContext;
    let windowStage = context.windowStage;
    let mainWindow = windowStage.getMainWindowSync();
    let windowId = mainWindow.getWindowProperties().id;
    let capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
      windowId: windowId, // 此值仅为示例 实际使用时请替换正确的windowId
      capabilities: [{
        utd: utd.UniformDataType.FILE, //请注意，只支持文件类型的
        maxSupportedCount: 1
      }]
    }


    harmonyShare.off('dataReceive', capabilityRegistry);
    console.log("offDataReceive Native registered Succesfully")
  } catch (err) {
    console.log("offDataReceive Native registered Error:", err)
  }
}