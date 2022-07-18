import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public deleteThis = false
  constructor(private dialogRef:MatDialogRef<DialogComponent>) { }
  @Input()label!:string
  ngOnInit(): void {
    this.deleteThis=false
  }

  closeDialog(){
    this.deleteThis=false
    this.dialogRef.close();
  }

  confirm(){
    this.deleteThis=true
    this.dialogRef.close();
  }
}
