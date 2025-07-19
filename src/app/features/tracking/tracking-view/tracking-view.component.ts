import { Component } from '@angular/core';
import {TrackingListComponent} from './tracking-list/tracking-list.component';
import {TrackingDetailsComponent} from './tracking-details/tracking-details.component';

@Component({
  selector: 'app-tracking-view',
  imports: [
    TrackingListComponent,
    TrackingDetailsComponent
  ],
  templateUrl: './tracking-view.component.html',
  styleUrl: './tracking-view.component.scss'
})
export class TrackingViewComponent {

}
