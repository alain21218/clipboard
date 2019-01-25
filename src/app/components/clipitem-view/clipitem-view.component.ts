import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipItem } from '../../models/clip-item';
import { MatDialog } from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { PictureComponent } from '../picture/picture.component';

@Component({
  selector: 'app-clipitem-view',
  templateUrl: './clipitem-view.component.html',
  styleUrls: ['./clipitem-view.component.scss']
})
export class ClipitemViewComponent implements OnInit {
  @Input() clipitem: ClipItem;
  @Input() isCurrent: boolean;
  @Output() favorite = new EventEmitter();
  @Output() cp = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
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
}
