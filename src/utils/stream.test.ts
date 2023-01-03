// @ts-ignore
import ObjectMultiplex from 'obj-multiplex';
import pump from 'pump';
import { PassThrough } from 'readable-stream';

it('setup mux', (done) => {
  const inMux = new ObjectMultiplex();
  const outMux = new ObjectMultiplex();
  const secondOutMux = new ObjectMultiplex();
  // setup substreams
  const inStream = inMux.createStream('hello');
  const outStream = outMux.createStream('hello');
  const secondOutStream = secondOutMux.createStream('hello');
  const inTransport = new PassThrough({ objectMode: true });
  const outTransport = new PassThrough({ objectMode: true });
  const secondOutTransport = new PassThrough({ objectMode: true });

  pump(inMux, inTransport, outMux, outTransport, secondOutMux, secondOutTransport, inMux);

  // pass in messages
  inStream.write('haay');
  inStream.write('wuurl');

  let firstDone = false;
  let secondDone = false;

  bufferToEnd(outStream, (results: any) => {
    console.log(`firstResults:`, results);
    firstDone = true;
    if (firstDone && secondDone) {
      done();
    }
  });

  bufferToEnd(secondOutStream, (results: any) => {
    console.log(`secondResults:`, results);
    secondDone = true;
    if (firstDone && secondDone) {
      done();
    }
  });

  setTimeout(() => inTransport.destroy());
});

function bufferToEnd(stream: any, callback: any) {
  const results: any[] = [];
  stream.on('end', () => {
    callback.call(stream, results);
  });
  stream.on('data', (chunk: any) => {
    console.log(`onData`, chunk);
    results.push(chunk);
  });
}
