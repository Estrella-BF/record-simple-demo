import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  template: `
    <audio controls="controls" #audio (loadedmetadata)="handleLoadedMetadata()">
      <source [src]="src" type="audio/mp3" />
    </audio>
  `
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() src: string;
  @ViewChild('audio') audioRef: ElementRef;

  ngAfterViewInit() {}

  handleLoadedMetadata() {
    const aud = this.audioRef.nativeElement;
    if (aud.duration === Infinity) {
      // set it to bigger than the actual duration
      aud.currentTime = Number.MAX_SAFE_INTEGER;
      aud.ontimeupdate = function() {
        aud.ontimeupdate = () => {
          return;
        };
        aud.currentTime = 0.1;
        aud.currentTime = 0;
      };
    }
  }
}
