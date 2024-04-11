import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AllEmployeeFilterPipe'
})
export class AllEmployeeFilterPipe implements PipeTransform {
  transform(data: any[], filter: string): any[] {
    if (!data || !filter) {
      return data;
    }
    return data.filter(item => {
      return (item.empID && item.empID.toString().toLowerCase().includes(filter.toLowerCase())) ||
             (item.empName && item.empName.toLowerCase().includes(filter.toLowerCase())) ||
             (item.empAddress && item.empAddress.toLowerCase().includes(filter.toLowerCase())) ||
             (item.empMNumber && item.empMNumber.toLowerCase().includes(filter.toLowerCase())) ||
             (item.empEPFNumber && item.empEPFNumber.toLowerCase().includes(filter.toLowerCase()));
    });
  }
}
