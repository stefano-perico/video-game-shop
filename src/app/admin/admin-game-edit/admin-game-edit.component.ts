import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GamesService} from '../../services/games.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../models/game.model';

@Component({
  selector: 'app-admin-game-edit',
  templateUrl: './admin-game-edit.component.html',
  styleUrls: ['./admin-game-edit.component.scss']
})
export class AdminGameEditComponent implements OnInit {

  gameForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  game: Game;
  gameId: number;

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.gameId = this.route.snapshot.params.id;
    this.gamesService.getSingleGame(this.gameId)
      .then(
        (game: Game) => {
          this.game = game;
          this.gameForm.get('name').setValue(game.name);
          this.gameForm.get('author').setValue(game.author);
          this.gameForm.get('price').setValue(game.price);
          this.gameForm.get('synopsis').setValue(game.synopsis);
          this.gameForm.get('image').setValue(game.image);
        }
      );
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9]+(\\.[0-9][0-9]?)?')]],
      synopsis: '',
      image: ''
    });
  }

  onUpdateGame() {
    this.game.name = this.gameForm.get('name').value;
    this.game.author = this.gameForm.get('author').value;
    this.game.price = this.gameForm.get('price').value;
    this.game.synopsis = this.gameForm.get('synopsis').value;

    if (this.fileUrl && this.fileUrl !== '') {
      this.game.image = this.fileUrl;
    }

    this.gamesService.updateGame(this.gameId, this.game);
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
