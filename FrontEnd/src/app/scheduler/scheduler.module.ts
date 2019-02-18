import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ControlsModule } from 'eds-angular4/dist/controls';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DialogsModule, LoggerService } from 'eds-angular4';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulerService } from './scheduler/scheduler.service';
import { SchedulerEditorComponent } from './scheduler/scheduler-editor/scheduler-editor.component';
import { ModuleStateService } from 'eds-angular4/dist/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogsModule,
    NgbModule,
    ToastModule.forRoot(),
    ControlsModule
  ],
  declarations: [SchedulerComponent, SchedulerEditorComponent],
  entryComponents: [SchedulerEditorComponent],
  providers: [SchedulerService, LoggerService, ModuleStateService]
})
export class SchedulerModule { }
