import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    //Ng-Zorro
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCalendarModule,
    NzLayoutModule,
    NzMenuModule,
    NzNotificationModule,
    NzBadgeModule,
    NzCardModule,
    NzRadioModule,
    NzModalModule,
  ],
  exports: [
    //Ng-Zorro
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCalendarModule,
    NzLayoutModule,
    NzMenuModule,
    NzNotificationModule,
    NzBadgeModule,
    NzCardModule,
    NzRadioModule,
    NzModalModule,
  ],
})
export class NgZorroModule {}
