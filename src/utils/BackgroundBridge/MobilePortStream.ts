import { Buffer } from 'buffer';

import { Duplex } from 'readable-stream';

import Port from '@@utils/BackgroundBridge/Port';

const noop = () => {};

export default class PortDuplexStream extends Duplex {
  private _port: Port;
  private readonly _url: string;

  constructor(port: Port, url: string) {
    super({
      objectMode: true,
    });
    this._port = port;
    this._url = url;
    this._port.addListener('message', this._onMessage.bind(this));
    this._port.addListener('disconnect', this._onDisconnect.bind(this));
  }

  /**
   * Callback triggered when a message is received from
   * the remote Port associated with this Stream.
   *
   * @private
   * @param {Object} msg - Payload from the onMessage listener of Port
   */
  _onMessage = (msg: any) => {
    console.log(`WB INCOMING> 4. MobilePortStream _onMessage`);
    if (Buffer.isBuffer(msg)) {
      // @ts-ignore
      delete msg._isBuffer;
      const data = new Buffer(msg);
      this.push(data);
    } else {
      this.push(msg);
    }
  };

  /**
   * Callback triggered when the remote Port
   * associated with this Stream disconnects.
   *
   * @private
   */
  _onDisconnect = () => {
    this.destroy && this.destroy();
  };

  /**
   * Explicitly sets read operations to a no-op
   */
  _read = noop;

  /**
   * Called internally when data should be written to
   * this writable stream.
   *
   * @private
   * @param {*} msg Arbitrary object to write
   * @param {string} encoding Encoding to use when writing payload
   * @param {Function} cb Called when writing is complete or an error occurs
   */
  _write = (msg: any, encoding: any, cb: any) => {
    console.log(`WB OUTGOING> 1. MobilePortStream _write`);
    try {
      if (Buffer.isBuffer(msg)) {
        const data = msg.toJSON();
        // @ts-ignore
        data._isBuffer = true;
        this._port.postMessage(data, this._url);
      } else {
        this._port.postMessage(msg, this._url);
      }
    } catch (err) {
      return cb(new Error('PortDuplexStream - disconnected'));
    }
    cb();
  };
}
