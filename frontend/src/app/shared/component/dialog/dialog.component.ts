import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from './dialog-data.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: DialogData,
  ) { }

  ngOnInit(): void {
  }

  confirmDialog(){
    this.dialogData.callbackMethod()
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
