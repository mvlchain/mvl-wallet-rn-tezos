// @ts-ignore
import eos from 'end-of-stream';
// @ts-ignore
import ObjectMultiplex from 'obj-multiplex';
import pump from 'pump';
import { PassThrough } from 'readable-stream';

it('setup mux', (done) => {
  const mux = new ObjectMultiplex();
  const stream = mux.createStream('foo');
  const secondStream = mux.createStream('bar');
  const passthrough = new PassThrough({ objectMode: true });
  mux.on('data', (chunk: any) => {
    console.log(`mux onData`, chunk);
  });
  stream.on('data', (chunk: any) => {
    console.log(`stream onData`, chunk);
  });
  secondStream.on('data', (chunk: any) => {
    console.log(`secondStream onData`, chunk);
  });
  passthrough.on('data', (chunk: any) => {
    console.log(`passthrough onData`, chunk);
  });
  // pump(stream, passthrough, secondStream);
  pump(stream, passthrough, stream);

  mux.write({ name: 'foo', data: 'msg1' });
  // stream.write('msg2');
  // secondStream.write('msg3');

  mux.on('end', () => {
    done();
  });
  setTimeout(() => {
    mux.destroy();
  }, 800);
});

// it('setup mux', (done) => {
//   const inMux = new ObjectMultiplex();
//   const outMux = new ObjectMultiplex();
//   const secondOutMux = new ObjectMultiplex();
//   // setup substreams
//   const inStream = inMux.createStream('hello');
//   const outStream = outMux.createStream('hello');
//   const secondOutStream = secondOutMux.createStream('hello');
//   const inTransport = new PassThrough({ objectMode: true });
//   const secondInTransport = new PassThrough({ objectMode: true });
//   const outTransport = new PassThrough({ objectMode: true });
//   const secondOutTransport = new PassThrough({ objectMode: true });
//
//   inMux.write('aa');
//   pump(inMux, inTransport, outMux, outTransport, inMux);
//   pump(inMux, inTransport, secondOutStream, secondOutTransport, inMux);
//
//   // pass in messages
//   inStream.write('haay');
//   inStream.write('wuurl');
//
//   let firstDone = false;
//   let secondDone = false;
//
//   bufferToEnd(outStream, (err: any, results: any) => {
//     console.log(`firstResults:`, results);
//     firstDone = true;
//     if (firstDone && secondDone) {
//       done();
//     }
//   });
//
//   bufferToEnd(secondOutStream, (err: any, results: any) => {
//     console.log(`secondResults:`, results);
//     secondDone = true;
//     if (firstDone && secondDone) {
//       done();
//     }
//   });
//
//   setTimeout(() => inTransport.destroy());
// });

function bufferToEnd(stream: any, callback: any) {
  const results: any[] = [];
  eos(stream, (err: any) => callback(err, results));

  stream.on('data', (chunk: any) => {
    console.log(`onData`, chunk);
    results.push(chunk);
  });
}
