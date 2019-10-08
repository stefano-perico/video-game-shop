import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GamesService} from '../../services/games.service';
import {Game} from '../../models/game.model';

@Component({
  selector: 'app-admin-game-form',
  templateUrl: './admin-game-form.component.html',
  styleUrls: ['./admin-game-form.component.scss']
})
export class AdminGameFormComponent implements OnInit {

  gameForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9]+(\\.[0-9][0-9]?)?')]],
      synopsis: ''
    });
  }

  onSaveGame() {
    const name = this.gameForm.get('name').value;
    const author = this.gameForm.get('author').value;
    const price = this.gameForm.get('price').value;
    const synopsis = this.gameForm.get('synopsis').value;
    const newGame = new Game(name, author, price);
    newGame.synopsis = synopsis;
    if (this.fileUrl && this.fileUrl !== '') {
      newGame.image = this.fileUrl;
    }

    this.gamesService.createNewGames(newGame);
    this.router.navigate(['/admin', 'books']);
  }

  uploadFile(file: File) {
    this.fileIsUploading = true;
    this.gamesService.uploadFile(file)
      .then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      );
  }

  detectFile(event) {
    this.uploadFile(event.target.files[0]);
  }

}
