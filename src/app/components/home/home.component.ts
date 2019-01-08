import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { clipboard, nativeImage } from 'electron';
import { ElectronService } from '../../providers/electron.service';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { ClipItem } from '../../models/clip-item';
import { AppConfig } from '../../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.retrieve();
    this.repeat = setInterval(() => {
      this.imageTreatment();
      this.textTreatment();
      this.getCurrentClipboard();
    }, 250);
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
  
  save() {
    localStorage.setItem('cb', JSON.stringify(this.clipItems))
  }
  
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
    if(this.text) {
      this.currentClipboard = this.clipItems.find(item => item.text === this.text);
    } else if(this.image) {
      this.currentClipboard = this.clipItems.find(item => item.image === this.image);
    } else {
      this.currentClipboard = null;
    }
  }

  ngOnDestroy() {
    clearInterval(this.repeat);
  }

  copy(clipitem: ClipItem) {
    if(clipitem.text) {
      this.copyText(clipitem.text);
    }

    if(clipitem.image) {
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
    if (confirm('Supprimer tout ?')) {
      localStorage.clear();
      clipboard.clear();
      this.clipItems.length = 0;
    }
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
    this.retrieve(); // update sort
  }

  delete(clipitem: ClipItem) {
    const index = this.clipItems.findIndex(item => item === clipitem);
    this.clipItems.splice(index, 1);
    this.save();
  }
}