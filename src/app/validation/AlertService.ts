import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async showSuccess(message: string): Promise<void> {
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      showConfirmButton: true
    });
  }
  
  async showDeleteConfirmation(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
      return result.isConfirmed;
    });
  }
  
  async showUpdateConfirmation(): Promise<boolean> {
    return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        return result.isConfirmed;
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        return false;
      }
      return false;
    });
  }

  async showError(message?: string): Promise<void> {
    if (!message) {
        message = 'Something went wrong!';
    }

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    });
  }
}
