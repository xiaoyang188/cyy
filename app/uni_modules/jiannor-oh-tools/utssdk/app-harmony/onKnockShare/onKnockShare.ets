import { harmonyShare, systemShare } from '@kit.ShareKit'
import { uniformTypeDescriptor as utd } from '@kit.ArkData';
import { AppStorageV2, UIContext } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';


export function onKnockShareNative(content: string, title: string, description: string, thumbnailUri: string) {
  try {
    if (!canIUse('SystemCapability.Collaboration.HarmonyShare')) {
      console.log("HarmonyShare is not supported on your device")
    }
    let context =
      AppStorageV2.connect(UIContext, 'uiContext', () => new UIContext())?.getHostContext() as common.UIAbilityContext;
    let windowStage = context.windowStage;
    let mainWindow = windowStage.getMainWindowSync();
    let windowId = mainWindow.getWindowProperties().id;
    let capabilityRegistry: harmonyShare.SendCapabilityRegistry = {
      windowId: windowId, // 此值仅为示例 实际使用时请替换正确的windowId
    }
    // 注册设备轻贴'knockShare'监听事件
    harmonyShare.on('knockShare', capabilityRegistry, (sharableTarget: harmonyShare.SharableTarget) => {
      // 构造分享数据
      let shareData: systemShare.SharedData = new systemShare.SharedData({
        utd: utd.UniformDataType.HYPERLINK,
        content: content,
        // 根据title,description,thumbnailUri会生成不同的卡片模板，具体可参考配套分享卡片模板章节。
        title: title ?? '无',
        description: description ?? '无',
        thumbnailUri: thumbnailUri ?? ''
      } as systemShare.SharedRecord);
      sharableTarget.share(shareData);
    });
    console.log('onKnockShare Native registered successfully')
  } catch (err) {
    console.log("NativeOnKnockShare", err);
  }
}