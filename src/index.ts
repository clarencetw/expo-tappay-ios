// Reexport the native module. On web, it will be resolved to ExpoTappayModule.web.ts
// and on native platforms to ExpoTappayModule.ts
export { default } from './ExpoTappayModule';
export { default as ExpoTappayView } from './ExpoTappayView';
export * from  './ExpoTappay.types';
