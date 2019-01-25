import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipitemViewComponent } from './clipitem-view.component';

describe('ClipitemViewComponent', () => {
  let component: ClipitemViewComponent;
  let fixture: ComponentFixture<ClipitemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipitemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipitemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
