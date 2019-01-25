import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ElectronService } from '../../providers/electron.service';
import { AppConfig } from '../../../environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() clear = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() devtool = new EventEmitter();

  searchKey = new FormControl();
  alwaysOnTop = new FormControl();
  config = AppConfig;

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    const onTop = localStorage.getItem('always-on-top') === 'true' ? true : false;
    this.alwaysOnTop.setValue(onTop);

    this.searchKey.valueChanges
    .pipe(distinctUntilChanged())
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.search.emit(value);
    });

    this.alwaysOnTop.valueChanges.subscribe(value => {
      this.electronService.send('always-on-top', value);
      localStorage.setItem('always-on-top', value);
    });
  }
}
