import { EventEmitter } from 'events';

import { JS_POST_MESSAGE_TO_PROVIDER } from './browserScripts';

/**
 * Module that listens for and responds to messages from an InpageBridge using postMessage for in-app browser
 */
class Port extends EventEmitter {
  private _window: any;

  constructor(browserWindow: any) {
    super();
    this._window = browserWindow;
  }

  postMessage = (msg: any, origin = '*') => {
    console.log(`WB OUTGOING> 2. Port postMessage: ${JSON.stringify(msg, null, 2)}`);
    const js = JS_POST_MESSAGE_TO_PROVIDER(msg, origin);

    if (this._window.webViewRef?.current) {
      console.log(`WB OUTGOING> 3. this._window?.injectJavaScript(js)`);
      this._window?.injectJavaScript(js);
    }
  };
}

export default Port;
