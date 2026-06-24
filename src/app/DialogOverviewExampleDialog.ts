import { inject, model } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    animal: string;
    name: string;
  }

export class DialogOverviewExampleDialog {
    readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }