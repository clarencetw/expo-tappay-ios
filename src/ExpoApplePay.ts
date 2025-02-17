import { requireNativeModule } from 'expo-modules-core';

export default requireNativeModule('ExpoTappay') || {
  isApplePayAvailable(): boolean {
    return false;
  },
  addListener() {
    return Promise.resolve();
  },
  removeListeners() {
    return Promise.resolve();
  },
};