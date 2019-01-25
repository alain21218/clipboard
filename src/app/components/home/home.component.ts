import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { clipboard, nativeImage } from 'electron';
import { ElectronService } from '../../providers/electron.service';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { ClipItem } from '../../models/clip-item';
<<<<<<< HEAD
import { animations } from '../../shared/animations';
import { Observable } from 'rxjs';
import { ConfirmationService } from '../confirmation/confirmation.service';
=======
import { AppConfig } from '../../../environments/environment.prod';
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
<<<<<<< HEAD
  styleUrls: ['./home.component.scss'],
  animations
})
export class HomeComponent implements OnInit {
  load = true;
  loadObs = new Observable();

=======
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  repeat: NodeJS.Timer;
  clipItems: ClipItem[];
  searchKey: string;
  nativeImage = nativeImage;

  image: string; // current clipboard image b64
  text: string; // current clipboard text
  currentClipboard: ClipItem;

  sortBy = new SortByPipe();

  constructor(
    private snackbar: MatSnackBar,
<<<<<<< HEAD
    private electronService: ElectronService,
    private confirm: ConfirmationService
  ) { }

  ngOnInit() {
    this.startSpinner(1000);
    this.retrieve();

=======
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.retrieve();
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
    this.repeat = setInterval(() => {
      this.imageTreatment();
      this.textTreatment();
      this.getCurrentClipboard();
    }, 250);
<<<<<<< HEAD

  }

  startSpinner(time: number) {
    this.load = true;
    this.debounce(time).then(() => this.load = false);
  }

  debounce(time: number) {
    let timeout = null;
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        resolve();
      }, time);
    });
=======
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  }

  retrieve() {
    this.clipItems = JSON.parse(localStorage.getItem('cb')) || [];
  }

  textTreatment() {
    this.text = clipboard.readText().trim();
    if (this.text && this.text.length > 0) {
      if (!this.clipItems.some(item => item.text === this.text)) {
        this.clipItems.unshift({
          text: this.text,
          time: new Date()
        });
        this.save();
      }
    } else { this.text = null; }
  }
<<<<<<< HEAD

  save() {
    localStorage.setItem('cb', JSON.stringify(this.clipItems))
  }

=======
  
  save() {
    localStorage.setItem('cb', JSON.stringify(this.clipItems))
  }
  
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  imageTreatment() {
    const imageNative = clipboard.readImage();
    this.image = imageNative.toDataURL();
    if (imageNative && !imageNative.isEmpty()) {
      if (!this.clipItems.some(item => item.image && item.image === this.image)) {
        this.clipItems.unshift({
          image: this.image,
          time: new Date()
        });
        this.save();
      }
    } else { this.image = null; }
  }

  getCurrentClipboard() {
<<<<<<< HEAD
    if (this.text) {
      this.currentClipboard = this.clipItems.find(item => item.text === this.text);
    } else if (this.image) {
=======
    if(this.text) {
      this.currentClipboard = this.clipItems.find(item => item.text === this.text);
    } else if(this.image) {
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
      this.currentClipboard = this.clipItems.find(item => item.image === this.image);
    } else {
      this.currentClipboard = null;
    }
  }

  ngOnDestroy() {
    clearInterval(this.repeat);
  }

  copy(clipitem: ClipItem) {
<<<<<<< HEAD
    if (clipitem.text) {
      this.copyText(clipitem.text);
    }

    if (clipitem.image) {
=======
    if(clipitem.text) {
      this.copyText(clipitem.text);
    }

    if(clipitem.image) {
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
      this.copyImage(clipitem.image);
    }
  }

  copyText(text: string) {
    clipboard.writeText(text);

    this.snackbar.open('Texte copié', null, {
      duration: 3000
    });
  }

  copyImage(image: string) {
    const nativeImage = this.nativeImage.createFromDataURL(image);
    clipboard.writeImage(nativeImage);

    this.snackbar.open('Image copiée', null, {
      duration: 3000
    });
  }

  clear() {
<<<<<<< HEAD
    this.confirm.ask('Supprimer les éléments marqués (☆) ?', () => {
      this.confirm.ask('Tout supprimer ?', () => {
        localStorage.clear();
        clipboard.clear();
        this.clipItems.length = 0;
      });
    }, () => {
      this.clipItems = this.clipItems.filter(item => item.favorite);
      this.save();
    });
=======
    if (confirm('Supprimer tout ?')) {
      localStorage.clear();
      clipboard.clear();
      this.clipItems.length = 0;
    }
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  }

  search($event) {
    this.searchKey = $event;
  }

  devtool() {
    this.electronService.send('devtool');
  }

  get cbfiltered() {
    const removeCurrent = this.clipItems.filter(item => !this.isCurrent(item));

    if (!this.searchKey || this.searchKey.length <= 3) { return removeCurrent; }

    return removeCurrent.filter(item => item.text && item.text.includes(this.searchKey));
  }

  isCurrent(clip: ClipItem): boolean {
    return clip === this.currentClipboard;
  }

  favorite(item: ClipItem) {
    item.favorite = !item.favorite;
    this.save();
<<<<<<< HEAD
=======
    this.retrieve(); // update sort
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  }

  delete(clipitem: ClipItem) {
    const index = this.clipItems.findIndex(item => item === clipitem);
    this.clipItems.splice(index, 1);
    this.save();
  }
}