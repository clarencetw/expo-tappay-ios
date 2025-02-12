import * as React from 'react';

import { ExpoTappayViewProps } from './ExpoTappay.types';

export default function ExpoTappayView(props: ExpoTappayViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
