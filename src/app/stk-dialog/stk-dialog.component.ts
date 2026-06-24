import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stk-dialog',
  imports: [],
  templateUrl: './stk-dialog.component.html',
  styleUrl: './stk-dialog.component.scss'
})
export class StkDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }
}
