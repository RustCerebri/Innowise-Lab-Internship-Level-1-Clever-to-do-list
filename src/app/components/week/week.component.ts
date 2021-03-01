import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-week',
  templateUrl: 'week.component.html',
  styleUrls: ['week.component.scss']
})


export class WeekComponent {
  @Input() public text = 'Hello';
  @Input() public counter = 0;


}
