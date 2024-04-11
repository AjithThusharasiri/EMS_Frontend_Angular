import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/data.service';
import { AlertService } from 'src/app/validation/AlertService';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent {
  dataList = {
    empId: '',
    empName: '',
    empAddress: '',
    empMNumber: '',
    status: 1,
    empEPFNumber: 0,
  };
  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<UpdateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Check if data exists in the dialog data
    if (this.data && this.data.employee && this.data.employee.content) {
      this.dataList = {
        empId: this.data.employee.content.empID,
        empName: this.data.employee.content.empName,
        empAddress: this.data.employee.content.empAddress,
        empMNumber: this.data.employee.content.empMNumber,
        status: this.data.employee.content.status,
        empEPFNumber: this.data.employee.content.empEPFNumber,
      };
    }
  }
  
  async save() {
    const confirmed = await this.alertService.showUpdateConfirmation();
    if (confirmed) {
      let datasave = {
        empID: this.dataList.empId,
        empName: this.dataList.empName,
        empAddress: this.dataList.empAddress,
        empMNumber: this.dataList.empMNumber,
        empEPFNumber: this.dataList.empEPFNumber, // Parse as integer
        status: this.dataList.status
      };
  
      this.dataService.updateEmployee(datasave).subscribe(response => {
        // Handle the response if needed
        console.log('Employee data updated successfully!', response);
        // Optionally, close the dialog or perform other actions
        this.dialogRef.close();
        this.alertService.showSuccess("Employee data updated successfully!").then(() => {
          location.reload();
          console.log(response);
        });
      }, error => {
        // Handle the error if the update fails
        console.error('Failed to update employee data:', error);
        // Optionally, display an error message to the user
      });
    }
  }
  
  closeAddForm() {
    this.dialogRef.close();
  }
}
