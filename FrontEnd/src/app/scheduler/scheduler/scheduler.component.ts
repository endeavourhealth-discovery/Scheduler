import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoggerService, MessageBoxDialog} from 'eds-angular4';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SchedulerService} from './scheduler.service';
import {Extract} from "./models/Extract";
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  extracts: Extract[];
  filteredExtracts : Extract[];
  selection: Extract;
  searchTerm: string;

  constructor(private modal: NgbModal,
              private log: LoggerService,
              private service: SchedulerService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.service.getList()
      .subscribe(
        result => {
          this.extracts = result;
          let val:any;
          for(let i = 0; i < this.extracts.length; i++){
            val = this.extracts[i].definition;
            this.extracts[i].definition = JSON.parse(val);
            this.filteredExtracts = this.extracts;
            this.selection = this.filteredExtracts[0];
          }
        },
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
          this.selection = this.extracts[0];
        },
        (error) => this.log.error('The extract could not be deleted. Please try again.', error, 'Delete extract')
      );
  }

  searchExtracts() {
    this.filteredExtracts = this.extracts;
    this.filteredExtracts = this.filteredExtracts.filter(
      extract => extract.extractName.includes(this.searchTerm) || extract.definition.name.includes(this.searchTerm)
    );
    this.selection = this.filteredExtracts[0];
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredExtracts = this.extracts;
  }

}
