import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AudioRecordController, AudioRecordUtil } from '../audio-record/audio-record-controller.component';

@Component({
  selector: 'app-grabacion-voz',
  styleUrls: ['./grabacion-voz.component.scss'],
  templateUrl: './grabacion-voz.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GrabacionVozComponent implements OnInit, OnChanges, OnDestroy {

  public audioRecordController;
  public audioSrc$ = new BehaviorSubject(null);

  @ViewChild('audioPolly') audioPolly;

  constructor(private audioRecord: AudioRecordUtil) {}

  ngOnInit(): void {}

  ngOnChanges() {
  }

  ngOnDestroy() {
  }

  async btnGrabar() {
    this.audioRecordController = await this.audioRecord.createController(this.audioPolly.nativeElement);
    this.audioRecordController.start();

    setTimeout(() => {
      this.audioPolly.nativeElement.play();
    }, 1000);
    this.audioSrc$.next(null);
  }

  async btnDetener() {
    this.detenerGrabacion();
    const audioBlob = await this.audioRecordController.stop();
    /*
    const payload = this.payloadGuardarGrabacion(audioBlob);
    this.guardarGrabacion(payload);
*/
  }


  private detenerGrabacion = () => {
    this.audioPolly.nativeElement.currentTime = 0;
    this.audioPolly.nativeElement.pause();

    this.audioPolly.nativeElement.pause();

  };




}
