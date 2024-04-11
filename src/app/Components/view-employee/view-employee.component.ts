import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewComponent } from 'src/app/PopUpDialog/add-new/add-new.component';
import { UpdateItemComponent } from 'src/app/PopUpDialog/update-item/update-item.component';
import { DataService } from 'src/app/Services/data.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
removeItem() {
throw new Error('Method not implemented.');
}
filterTerm: string = '';
empList: User[] = []; // Populate this array with your items

  get filteredEmpList(): any[] {
    return this.empList.filter(data => {
      return data.empName.toLowerCase().includes(this.filterTerm.toLowerCase());
    });
  }

  
  // this variable is get data from model
  userToModify: User = new User();
  // this variable determines wither we are in changing or creating new user
  creatingMode: boolean = true;

  constructor(private dataService: DataService, private _dialog: MatDialog) {
    this.getAllUsers();
  }

  //Get All Users
  getAllUsers() {
    this.dataService.getAll().subscribe((response: any) => {
      this.empList = response.content; // Assuming response.content is the array of employees
      console.log(this.empList);
    }, error => {
      console.error('Error getting users:', error);
    });
  }


  openAddForm(){
    this._dialog.open(AddNewComponent);
  }

  updateItem(empID: string) {
    this.dataService.getById(empID).subscribe(data => {
      console.log(data)
      this._dialog.open(UpdateItemComponent, {
        data: {
          employee: data // Pass the data to the UpdateItemComponent
        }
      });
    });
  }
  
   //Create new Item
   CreateItem(){
    const newUser = {
       empName : this.userToModify.empName,
       empAddress : this.userToModify.empAddress,
    };
  }
}
