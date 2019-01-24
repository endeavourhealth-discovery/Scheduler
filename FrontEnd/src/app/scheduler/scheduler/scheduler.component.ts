import { Component, OnInit } from '@angular/core';
import {LoggerService, MessageBoxDialog} from 'eds-angular4';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SchedulerService} from './scheduler.service';
import {Extract} from "./models/Extract";

@Component({
  selector: 'app-record-viewer',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  extracts: Extract[];
  selection: Extract;

  constructor(private modal: NgbModal,
              private log: LoggerService,
              private service: SchedulerService) { }

  ngOnInit() {
    this.service.getList()
      .subscribe(
        result => {
          this.extracts = result;
          let val:any;
          for(let i = 0; i < this.extracts.length; i++){
            val = this.extracts[i].definition;
            this.extracts[i].definition = JSON.parse(val);
            this.selection = this.extracts[0];
          }
        },
        error => {
          (error) => console.error(error);
        }
      );
  }

  delete(item: Extract) {
    MessageBoxDialog.open(this.modal, 'Delete extract', 'Are you sure that you want to delete <b>' + item.extractName + '</b>?', 'Delete extract', 'Cancel')
      .result.then(
      () => this.doDelete(item),
      () => this.log.info('Delete cancelled')
    );
  }

  doDelete(item: Extract) {
    this.service.deleteExtract(item.extractId)
      .subscribe(
        () => {
          const index = this.extracts.indexOf(item);
          this.extracts.splice(index, 1);
          this.log.success('Extract deleted successfully', item, 'Extract cohort');
        },
        (error) => this.log.error('The extract could not be deleted. Please try again.', error, 'Delete extract')
      );
  }

}
