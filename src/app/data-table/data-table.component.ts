import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { GetDataService } from '../get-data.service';
import { HttpClient } from '@angular/common/http';
import { filter, map, toArray } from 'rxjs';
import { FormsModule } from '@angular/forms';

export interface Name {
  name: string;
  id: number;
  age: number;
  email: string;
}
var ELEMENT_DATA: Name[] = [
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, FormsModule],
})
export class DataTableComponent implements AfterViewInit, OnInit {
  Name: any = [];
  nameSearch: string = '';
  displayedColumns: string[] = ['id', 'name', 'age', 'email'];
  dataSource = new MatTableDataSource<Name>(ELEMENT_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer, private service: GetDataService, private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get("http://localhost:3000/users")
      .pipe(
        filter((res: any) => {
          const data = res.filter((key: any) => key.name === ' ')
          this.Name = data;
          this.dataSource.data = this.Name;
          return data;
        })
      ).subscribe(
        res=> {
      this.Name = res;
      this.dataSource.data = this.Name;})
    // .subscribe(
    // (res: any) => {
    //   console.log(res);
    //   this.Name = res;
    //   this.dataSource.data = this.Name;
    //   //         ELEMENT_DATA = this.Name;
    //   // this.dataSource.data = ELEMENT_DATA;
    // })
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  searching() {
    if (this.nameSearch == "") {
      return;
    } else {
      this.Name = this.Name.filter((res: any) => { return res.name.toLocaleLowerCase().match(this.nameSearch.toLocaleLowerCase()) })
      this.dataSource.data = this.Name;
    }
  }


}
