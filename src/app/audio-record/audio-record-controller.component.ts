import { BehaviorSubject } from 'rxjs';

declare var MediaRecorder: any;

export class AudioRecordController {
  public combined;
  private mediaRecorder;
  private audioChunks: Blob[];
  public isRecording$ = new BehaviorSubject(false);
  public blobRobot: Blob;

  constructor(private mediaStreamObj: MediaStream, innerAudio) {

    const audioStream = innerAudio.captureStream();

    this.combined = new MediaStream([...mediaStreamObj.getTracks(), ...audioStream.getTracks()]);

    this.mediaRecorder = new MediaRecorder(this.combined);
  }

  start() {
    this.audioChunks = [];
    this.mediaRecorder.start();
    this.mediaRecorder.addEventListener('dataavailable', event => {

      this.audioChunks.push(event.data);
    });
    this.isRecording$.next(true);
  }

  stop(): Promise<Blob> {
    return new Promise(resolve => {
      this.mediaRecorder.addEventListener('stop', async () => {
        const audioBlob = new Blob(this.audioChunks);
        resolve(audioBlob);
      });
      this.mediaRecorder.stop();
      this.isRecording$.next(false);
      this.mediaStreamObj.getTracks().forEach(track => {
        track.stop();
      });
    });
  }
}

export class AudioRecordUtil {
  constructor() {}

  async createController(innerAudio) {console.log(innerAudio)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    return new AudioRecordController(stream, innerAudio);
  }
}
