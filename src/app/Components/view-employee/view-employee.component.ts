import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewComponent } from 'src/app/PopUpDialog/add-new/add-new.component';
import { UpdateItemComponent } from 'src/app/PopUpDialog/update-item/update-item.component';
import { DataService } from 'src/app/Services/data.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/validation/AlertService';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent {
  filterTerm: string = '';
  empList: User[] = []; // Populate this array with your items

  get filteredEmpList(): any[] {
    return this.empList.filter((data) => {
      return data.empName.toLowerCase().includes(this.filterTerm.toLowerCase());
    });
  }

  // this variable is get data from model
  userToModify: User = new User();
  // this variable determines wither we are in changing or creating new user
  creatingMode: boolean = true;

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private _dialog: MatDialog
  ) {
    this.getAllEmp();
  }

  //Get All Users
  getAllEmp() {
    this.dataService.getAll().subscribe(
      (response: any) => {
        this.empList = response.content; // Assuming response.content is the array of employees
        console.log(this.empList);
      },
      (error) => {
        console.error('Error getting users:', error);
      }
    );
  }

  openAddForm() {
    this._dialog.open(AddNewComponent);
  }

  updateEmp(empID: string) {
    this.dataService.getById(empID).subscribe((data) => {
      console.log(data);
      this._dialog.open(UpdateItemComponent, {
        data: {
          employee: data, // Pass the data to the UpdateItemComponent
        },
      });
    });
  }

  //Create new Item
  // CreateItem() {
  //   const newUser = {
  //     empName: this.userToModify.empName,
  //     empAddress: this.userToModify.empAddress,
  //   };
  // }

  async deleteEmp(empID: any) {
    const confirmed = await this.alertService.showDeleteConfirmation();
    if (confirmed) {
      this.dataService.deleteEmployee(empID).subscribe(
        () => {
          this._dialog.closeAll();
          //location.reload();
          this.alertService
            .showSuccess('Employee data delete successfully!')
            .then(() => {
              location.reload();
            });
        },

        (error) => {
          console.error('Failed to delete employee:', error);
          // Display an error message here, e.g., using MatSnackBar
        }
      );
    }
  }

 

  printEmp() {
    content: [
      'pdfmake (since it\'s based on pdfkit) supports JPEG and PNG format',
      'If no width/height/fit is provided, image original size will be used',
      {
        image: 'a.jpg',
      },
    ]
  }
  
  
  
  

  


}
