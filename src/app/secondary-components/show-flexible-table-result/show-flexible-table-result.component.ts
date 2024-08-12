import { Component, Input } from '@angular/core';

@Component({
  selector: 'show-flexible-table-result',
  templateUrl: './show-flexible-table-result.component.html',
  styleUrl: './show-flexible-table-result.component.scss'
})
export class ShowFlexibleTableResultComponent {
  @Input() lang!:string
  @Input() tableName!:string
  @Input() columns!:string[]
}
