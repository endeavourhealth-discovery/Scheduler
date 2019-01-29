import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerEditorComponent } from './scheduler-editor.component';

describe('SchedulerEditorComponent', () => {
  let component: SchedulerEditorComponent;
  let fixture: ComponentFixture<SchedulerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
