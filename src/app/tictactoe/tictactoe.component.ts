import {Component} from '@angular/core';

export class TicModel {
  name;
  index;
  player;

  constructor(index) {
    this.name = 'Open';
    this.index = index;
    this.player = -1;
  }
}

@Component({
  selector: 'tic-tac-toe',
  templateUrl: 'tictactoe.component.html',
  styleUrls: ['tictactoe.component.css']
})
export class TicTacToeComponent {
  totalTicBoxes;

  isFirstUser;
  whomToPlay;

  firstPlayerName;
  firstPlayerValue;
  secondPlayerName;
  secondPlayerValue;

  title;
  description;

  constructor() {
    this.title = '';
    this.description = '';

    this.firstPlayerName = 'Player 1';
    this.firstPlayerValue = 0;
    this.secondPlayerName = 'Player 2';
    this.secondPlayerValue = 1;

    this.init();
  }

  init() {
    this.isFirstUser = true;
    this.totalTicBoxes = [[new TicModel(0), new TicModel(1), new TicModel(2)],
      [new TicModel(3), new TicModel(4), new TicModel(5)], [new TicModel(6), new TicModel(7),
        new TicModel(8)]];
    this.toggleUser();
  }

  onResetClick() {
    this.init();
  }

  onBoxClick($event) {
    const index = parseInt($event.target.name);
    const row = Math.floor(index / 3);
    const col = Math.floor(index % 3);

    this.changeRelatedProperty(row, col);
  }

  changeRelatedProperty(row, col) {
    let rowValues = this.totalTicBoxes[row];
    let box = rowValues[col];
    if (box.player == -1) {
      if (this.isFirstUser) {
        box.name = this.firstPlayerName;
        box.player = this.firstPlayerValue;

        if (this.hasWiningCombination(this.firstPlayerValue)) {
          this.showMessage(this.firstPlayerName + ' won the game. Congrats !!!');
          this.init();
          return;
        }
      } else {
        box.name = this.secondPlayerName;
        box.player = this.secondPlayerValue;

        if (this.hasWiningCombination(this.secondPlayerValue)) {
          this.showMessage(this.secondPlayerName + ' won the game. Congrats !!!');
          this.init();
          return;
        }
      }

      if (!this.hasEmptyBox()) {
        this.showMessage('Match Draw');
        this.init();
        return;
      }

      this.isFirstUser = !this.isFirstUser;
      this.toggleUser();
    }
  }

  toggleUser() {
    if (this.isFirstUser) {
      this.whomToPlay = "First Player"
    } else {
      this.whomToPlay = "Second Player";
    }
  }

  hasWiningCombination(sign) {
    if (this.hasSimilarTic(0, 0, sign) && this.hasSimilarTic(0, 1, sign) && this.hasSimilarTic(0, 2, sign))
      return true;
    if (this.hasSimilarTic(0, 0, sign) && this.hasSimilarTic(1, 0, sign) && this.hasSimilarTic(2, 0, sign))
      return true;
    if (this.hasSimilarTic(0, 0, sign) && this.hasSimilarTic(1, 1, sign) && this.hasSimilarTic(2, 2, sign))
      return true;
    if (this.hasSimilarTic(0, 1, sign) && this.hasSimilarTic(1, 1, sign) && this.hasSimilarTic(2, 1, sign))
      return true;
    if (this.hasSimilarTic(0, 2, sign) && this.hasSimilarTic(1, 2, sign) && this.hasSimilarTic(2, 2, sign))
      return true;
    if (this.hasSimilarTic(0, 2, sign) && this.hasSimilarTic(1, 1, sign) && this.hasSimilarTic(2, 0, sign))
      return true;
    if (this.hasSimilarTic(1, 0, sign) && this.hasSimilarTic(1, 1, sign) && this.hasSimilarTic(1, 2, sign))
      return true;
    if (this.hasSimilarTic(2, 0, sign) && this.hasSimilarTic(2, 1, sign) && this.hasSimilarTic(2, 2, sign))
      return true;

    return this.hasSimilarTic(2, 1, sign) && this.hasSimilarTic(1, 1, sign) && this.hasSimilarTic(0, 1, sign);
  }

  hasSimilarTic(row, col, sign): boolean {
    let boxes = this.totalTicBoxes[row];
    let box = boxes[col];
    return box.player == sign && box.player == sign && box.player == sign;
  }

  hasEmptyBox() {
    for (let i = 0; i < this.totalTicBoxes.length; i++) {
      const row = this.totalTicBoxes[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j].player == -1) {
          return true;
        }
      }
    }
    return false;
  }

  showMessage(message) {
    window.alert(message)
  }
}
