import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GrabacionVozComponent } from './grabacion-voz/grabacion-voz.component';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './player-audio/player-audio.component';
import { AudioRecordUtil } from './audio-record/audio-record-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    GrabacionVozComponent,
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [AudioRecordUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
