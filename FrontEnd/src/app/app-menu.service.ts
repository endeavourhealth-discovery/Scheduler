import {Injectable} from '@angular/core';
import {AbstractMenuProvider} from 'eds-angular4';
import {MenuOption} from 'eds-angular4/dist/layout/models/MenuOption';
import {SchedulerComponent} from './scheduler/scheduler/scheduler.component';
import {Routes} from '@angular/router';
import {SchedulerEditorComponent} from './scheduler/scheduler/scheduler-editor/scheduler-editor.component';

@Injectable()
export class AppMenuService implements  AbstractMenuProvider {
  static getRoutes(): Routes {
    return [
      { path: '', redirectTo : 'scheduler', pathMatch: 'full' }, // Default route
      { path: 'scheduler', component: SchedulerComponent },
      { path: 'extractEdit', component: SchedulerEditorComponent}
    ];
  }
  getApplicationTitle(): string {
    return 'Scheduler';
  }

  getClientId(): string {
    return 'eds-user-manager';
  }

  useUserManagerForRoles(): boolean {
    return false;
  }

  getMenuOptions(): MenuOption[] {
    return [
      {caption: 'Scheduler', state: 'scheduler', icon: 'fa fa-user', role: 'eds-user-manager:user-manager'},
      {caption: 'Configuration', state: 'config', icon: 'fa fa-cogs', role: 'eds-user-manager:user-manager'},
      {caption: 'Delegation', state: 'config', icon: 'fa fa-group', role: 'eds-user-manager:user-manager'},
      {caption: 'Audit', state: 'config', icon: 'fa fa-list', role: 'eds-user-manager:user-manager'}
    ];
  }
}
