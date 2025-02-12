import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoTappayViewProps } from './ExpoTappay.types';

const NativeView: React.ComponentType<ExpoTappayViewProps> =
  requireNativeView('ExpoTappay');

export default function ExpoTappayView(props: ExpoTappayViewProps) {
  return <NativeView {...props} />;
}
