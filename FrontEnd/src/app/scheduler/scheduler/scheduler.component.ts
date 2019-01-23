import { Component, OnInit } from '@angular/core';
import {MessageBoxDialog} from 'eds-angular4';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SchedulerService} from './scheduler.service';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  tableData: any[];
  selection: any;

  constructor(private modal: NgbModal,
              private service: SchedulerService) { }

  ngOnInit() {
    this.service.getList()
      .subscribe(
        result => {
          this.tableData = result;
        },
        error => {
          (error) => console.error(error);
        }
      );

    this.selection = this.tableData[0];
  }

  showDialog() {
    MessageBoxDialog.open(this.modal, 'Delete user', 'Are you sure that you want to delete this user?', 'Delete user', 'Cancel');
  }
}
