declare module 'streamify' {
    import { Readable } from 'stream';
    const streamify: (source: any) => Readable;
    export default streamify;
  }
  