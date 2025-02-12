import { NativeModule, requireNativeModule } from 'expo';

import { ExpoTappayModuleEvents } from './ExpoTappay.types';

declare class ExpoTappayModule extends NativeModule<ExpoTappayModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTappayModule>('ExpoTappay');
