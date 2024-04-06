import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent {
  constructor(private dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) {}

  empId: string = "";
  empName: string= "";
  empAddress: string ="";
  empMNumber: string ="";
  status : number = 1;
  empEPFNumber: string = "";

  closeAddForm() {
    this.dialog.closeAll();
  }
}
