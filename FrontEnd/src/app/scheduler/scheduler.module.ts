import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DialogsModule, LoggerService } from 'eds-angular4';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulerService } from './scheduler/scheduler.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogsModule,
    NgbModule,
  ],
  declarations: [SchedulerComponent],
  providers: [SchedulerService, LoggerService]
})
export class SchedulerModule { }
