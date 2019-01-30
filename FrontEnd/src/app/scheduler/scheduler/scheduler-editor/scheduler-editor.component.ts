import {Component, Input, OnInit, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';
import {Extract} from "../models/Extract";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoggerService, MessageBoxDialog} from "eds-angular4";
import {ModuleStateService} from 'eds-angular4/dist/common';
import {Router} from "@angular/router";
import {SchedulerService} from "../scheduler.service";
import {ToastsManager} from 'ng2-toastr';
import {Definition} from "../models/Definition";
import {FileLocationDetails} from "../models/FileLocationDetails";
import {SftpConnectionDetails} from "../models/SftpConnectionDetails";

@Component({
  selector: 'app-scheduler-editor',
  templateUrl: './scheduler-editor.component.html',
  styleUrls: ['./scheduler-editor.component.css']
})
export class SchedulerEditorComponent implements OnInit {

  @Input() selection: Extract;
  @Input() editMode: boolean;
  @Input() existing: boolean;
  @Input() selfEdit: boolean;
  dialogTitle: string;

  @ViewChild('extractId') extractIdBox;
  @ViewChild('extractName') extractNameBox;
  @ViewChild('cohortId') cohortIdBox;
  @ViewChild('codeSetId') codeSetIdBox;
  @ViewChild('datasetId') datasetIdBox;
  @ViewChild('transactionId') transactionIdBox;

  @ViewChild('definition.name') nameBox;
  @ViewChild('definition.id') idBox;
  @ViewChild('definition.projectId') projectIdBox;

  @ViewChild('definition.fileLocationDetails.source') sourceBox;
  @ViewChild('definition.fileLocationDetails.destination') destinationBox;
  @ViewChild('definition.fileLocationDetails.housekeep') housekeepBox;

  @ViewChild('definition.sftpConnectionDetails.hostname') hostnameBox;
  @ViewChild('definition.sftpConnectionDetails.hostPublicKey') hostPublicKeyBox;
  @ViewChild('definition.sftpConnectionDetails.port') portBox;
  @ViewChild('definition.sftpConnectionDetails.username') usernameBox;
  @ViewChild('definition.sftpConnectionDetails.clientPrivateKeyPassword') clientPrivateKeyPasswordBox;
  @ViewChild('definition.sftpConnectionDetails.clientPrivateKey') clientPrivateKeyBox;

  constructor(private log: LoggerService,
              private modal: NgbModal,
              private router: Router,
              private location: Location,
              private state: ModuleStateService,
              protected schedulerService: SchedulerService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    let screen = this.state.getState('extractEdit');
    if (screen == null) {
      this.selection = {} as Extract;
      this.router.navigate(['extract']);
      return;
    }

    this.selection = Object.assign( [], screen.extract);
    this.editMode = screen.editMode;
    this.existing = screen.existing;
    this.selfEdit = screen.selfEdit;

    if (!this.editMode) {
      this.dialogTitle = "Add extract";

      let fileLocationDetails = new FileLocationDetails();
      let sftpConnectionDetails = new SftpConnectionDetails();
      let definition = new Definition();
      definition.fileLocationDetails = fileLocationDetails;
      definition.sftpConnectionDetails = sftpConnectionDetails;

      this.selection = {
        extractId: 0,
        extractName: '',
        cohortId: 0,
        codeSetId: 0,
        datasetId: 0,
        definition: definition,
        transactionId: 0,
      } as Extract;
    }
    else {
      this.dialogTitle = "Edit extract";

      this.selection = {
        extractId: this.selection.extractId,
        extractName: this.selection.extractName,
        cohortId: this.selection.cohortId,
        codeSetId: this.selection.codeSetId,
        datasetId: this.selection.datasetId,
        definition: this.selection.definition,
        transactionId: 0,
      } as Extract;
    }
  }

  isEditMode(){
    return this.editMode;
  }

  save(close: boolean) {
    if (this.validateFormInput()) {
      this.schedulerService.saveExtract(this.selection, this.editMode)
        .subscribe(
          (response) => {
            this.selection = response;
            if (close) {
              this.close(!close);
            } else {
              this.log.success('Extract saved', null, this.dialogTitle)
            }
          },
          (error) => this.log.error('Extract details could not be saved. Please try again.', error, 'Save extract details')
        );
    }
  }

  close(withConfirm: boolean) {
    if (withConfirm)
      MessageBoxDialog.open(this.modal, this.dialogTitle, "Any unsaved changes will be lost. Do you want to close without saving?", "Close without saving", "Continue editing")
        .result.then(
        (result) => this.location.back(),
        (reason) => {}
      );
    else
      this.location.back();
  }

  validateFormInput(){
    let result = true;
    return result;
  }
}
