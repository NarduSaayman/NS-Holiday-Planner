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
  ],
})
export class NgZorroModule {}
