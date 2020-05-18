import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit(): void {
  const s = this.renderer2.createElement('script');
   s.onload = this.loadNextScript.bind(this);
   s.type = 'text/javascript';
   s.src = "https://sdk.scdn.co/spotify-player.js"; // Defines someGlobalObject
   s.text = ``;
   this.renderer2.appendChild(this._document.body, s);
  }
  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.text = `
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'BQDxRdNryuw67PD6ZA3uXhflX-qaRpczhfGkPWHUPD8MMaXCSvgz46C5E-ycIksA9tIsLLNUhjQ561ii__dFGQJegXwpHr_92FdqlHfo6b-OBbMc9eAEvH57wqoXfVnIwaYnqcwD062LSlFKHwck0_X5i2BD9zEEKrD2';
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
 `
    this.renderer2.appendChild(this._document.body, s);
 }

}
