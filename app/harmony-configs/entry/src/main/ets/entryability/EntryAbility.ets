import { UniEntryAbilityDev } from "@dcloudio/uni-app-runtime";
import { initUniModules } from "../uni_modules/index.generated";
import BuildProfile from "BuildProfile";
import * as hmr from '@uni_modules/hmr-for-uni-app'
import window from '@ohos.window';
import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';

initUniModules();

interface IHmr {
  init: Function
}

export default class EntryAbility extends UniEntryAbilityDev {
  constructor() {
    super("HBuilder", {
      debug: BuildProfile.DEBUG,
    });
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    super.onWindowStageCreate(windowStage)
    hmr.init();
  }
}
