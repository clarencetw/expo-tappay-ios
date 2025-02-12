import { registerWebModule, NativeModule } from 'expo';

import { ExpoTappayModuleEvents } from './ExpoTappay.types';

class ExpoTappayModule extends NativeModule<ExpoTappayModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoTappayModule);
