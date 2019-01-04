import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { clipboard, nativeImage } from 'electron';
import { DetailComponent } from '../detail/detail.component';
import { PictureComponent } from '../picture/picture.component';
import { ElectronService } from '../../providers/electron.service';

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

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.clipItems = JSON.parse(localStorage.getItem('cb')) || [];
    this.repeat = setInterval(() => {
      this.imageTreatment();
      this.textTreatment();
    }, 500);
  }

  textTreatment() {
    const text = clipboard.readText().trim();
    if (text && text.length > 0) {
      if (!this.clipItems.some(item => item.text === text)) {
        this.clipItems.unshift({
          text,
          time: new Date()
        });
        localStorage.setItem('cb', JSON.stringify(this.clipItems))
      }
    }
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
        localStorage.setItem('cb', JSON.stringify(this.clipItems))
      }
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

  open(clipitem: ClipItem) {
    const dialog = this.dialog.open(DetailComponent, {
      data: clipitem
    });
  }

  openImage(clipitem: ClipItem) {
    const dialog = this.dialog.open(PictureComponent, {
      data: clipitem
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
    if (!this.searchKey || this.searchKey.length <= 3) { return this.clipItems; }
    return this.clipItems.filter(item => item.text && item.text.includes(this.searchKey))
  }

  isCurrent(clip: ClipItem): boolean {
    const text = clip.text && clip.text === clipboard.readText();
    const image = clip.image && clip.image === this.image;
    return text || image ;
  }
}

interface ClipItem {
  text?: string;
  time: Date;
  image?: string //b64
}