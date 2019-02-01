import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoggerService, MessageBoxDialog} from 'eds-angular4';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SchedulerService} from './scheduler.service';
import {Extract} from "./models/Extract";
import {ToastsManager} from 'ng2-toastr';
import {ModuleStateService} from "eds-angular4/dist/common";
import {Router} from "@angular/router";

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
              private state: ModuleStateService,
              private router: Router,
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
          }
          if (this.service.getSelectedExtract()) {
            this.selection = this.service.getSelectedExtract();
          } else {
            this.selection = this.extracts[0];
          }
          this.filteredExtracts = this.extracts;
        },
      );
  }

  add() {
    this.state.setState('extractEdit', {extract: null, editMode: false});
    this.router.navigate(['extractEdit']);
  }

  edit(item: Extract) {
    this.service.setSelectedExtract(item);
    this.state.setState('extractEdit', {extract: item, editMode: true});
    this.router.navigate(['extractEdit']);
  }

  delete(item: Extract) {
    this.service.setSelectedExtract(item);
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
          this.log.success('Extract deleted successfully', item, 'Extract');
          this.selection = this.extracts[0];
        },
        (error) => this.log.error('The extract could not be deleted. Please try again.', error, 'Delete extract')
      );
  }

  searchExtracts() {
    this.filteredExtracts = this.extracts;
    this.filteredExtracts = this.filteredExtracts.filter(
      extract => extract.extractName.toUpperCase().includes(this.searchTerm.toUpperCase()) || extract.definition.name.toUpperCase().includes(this.searchTerm.toUpperCase())
    );
    this.selection = this.filteredExtracts[0];
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredExtracts = this.extracts;
  }

}
