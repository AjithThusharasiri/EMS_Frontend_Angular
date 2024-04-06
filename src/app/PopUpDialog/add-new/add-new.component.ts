import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Services/data.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { AlertService } from 'src/app/validation/AlertService';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  empId: string = '';
  empName: string = '';
  empAddress: string = '';
  empMNumber: string = '';
  status: number = 1;
  empEPFNumber: string = '';

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  closeAddForm() {
    this.dialog.closeAll();
  }

  saveItem() {
    const itemData = {
      empId: this.empId,
      empName: this.empName,
      empAddress: this.empAddress,
      empMNumber: this.empMNumber,
      empEPFNumber: this.empEPFNumber,
    };

    //   this.dataService.saveEmployee(itemData).subscribe(response => {
    //     console.log('Item saved:', response);
    //     console.log(response);
    //     this.dialog.closeAll();
    //     this.snackBar.open('Item saved successfully', 'Close', {
    //       duration: 3000 // Snackbar duration in milliseconds
    //     });
    //     // Consider updating the UI without reloading the entire page
    //   }, error => {
    //     console.error('Error saving item:', error);
    //     console.log(Response);
    //     this.snackBar.open('Error saving item', 'Close', {
    //       duration: 3000
    //     });
    //   });
    // }

    this.dataService.saveEmployee(itemData).subscribe(
      (response) => {
        // console.log('Approve flow saved:', response);
        this.dialog.closeAll();
        this.alertService.showSuccess("Employee created!").then(() => {
          location.reload();
          console.log(response);
        });
      },
      (error) => {
        console.error('Error saving item:', error);
        this.snackBar.open('Error saving item: ' + error, 'Close');
      }
    );
  }
}
