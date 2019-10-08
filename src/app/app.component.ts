import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDZ83R9IyzYD1ygE3MMcDsrFaEPpPNZrRk',
      authDomain: 'games-dc9ca.firebaseapp.com',
      databaseURL: 'https://games-dc9ca.firebaseio.com',
      projectId: 'games-dc9ca',
      storageBucket: 'games-dc9ca.appspot.com',
      messagingSenderId: '980253627541',
      appId: '1:980253627541:web:7d75b44b63bb9070ee779c'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
