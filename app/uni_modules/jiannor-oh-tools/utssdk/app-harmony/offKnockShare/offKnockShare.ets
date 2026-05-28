import { harmonyShare } from '@kit.ShareKit'
import { AppStorageV2, UIContext } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';


export function offKnockShareNative() {
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
    let capabilityRegistry: harmonyShare.SendCapabilityRegistry = {
      windowId: windowId, // 此值仅为示例 实际使用时请替换正确的windowId
    }

    // 注册鸿蒙碰一碰分享监听
    // 根据官方文档，事件名称应该是 'knockShare'
    harmonyShare.off('knockShare', capabilityRegistry)

    console.log('onKnockShare Native unregistered successfully')
  } catch (error) {
    console.error('Failed to unregister onKnockShare Native:', error)
  }
}