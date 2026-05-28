import { harmonyShare, systemShare } from "@kit.ShareKit";
import { uniformTypeDescriptor as utd } from '@kit.ArkData';
import { AppStorageV2, UIContext } from '@kit.ArkUI';
import { common } from "@kit.AbilityKit";

export function onDataReceiveNative(dataReceive:Function,receiveEnd:Function) {
  try {
    if (!canIUse('SystemCapability.Collaboration.HarmonyShare')) {
      console.log("HarmonyShare is not supported on your device")
	  throw new Error("HarmonyShare is not supported on your device")
    }
    let context = AppStorageV2.connect(UIContext, 'uiContext', () => new UIContext())?.getHostContext() as common.UIAbilityContext;
    let windowStage = context.windowStage;
    let mainWindow = windowStage.getMainWindowSync();
    let windowId = mainWindow.getWindowProperties().id;
    let capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
      windowId: windowId, // 此值仅为示例 实际使用时请替换正确的windowId
      capabilities: [{
        utd: utd.UniformDataType.FILE,
        maxSupportedCount: 1
      }]
    }


    harmonyShare.on('dataReceive', capabilityRegistry, (receivableTarget: harmonyShare.ReceivableTarget) => {
      let context = AppStorageV2.connect(UIContext, 'uiContext', () => new UIContext())?.getHostContext() as common.UIAbilityContext;
      receivableTarget.receive(context.filesDir, {
        // 此路径仅为示例 使用时请替换实际路径
        onDataReceived: (sharedData: systemShare.SharedData) => {
          let sharedRecords = sharedData.getRecords();
          sharedRecords.forEach((record: systemShare.SharedRecord) => {
            // 处理分享数据
            dataReceive(record.content)
          });
        },
        onResult(resultCode: harmonyShare.ShareResultCode) {
          if (resultCode === harmonyShare.ShareResultCode.SHARE_SUCCESS) {
            // To do things.
            receiveEnd()
          }
        }
      });
    });
    console.log("onDataReceive Native registered Succesfully")
  }catch (err){
    console.log("onDataReceive Native registered Error:", err)
  }
}