import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from '../data.service';
import { Stock } from '../models/stock.model';

@Component({
  selector: 'app-bodyarea',
  templateUrl: './bodyarea.component.html',
  styleUrls: ['./bodyarea.component.scss']
})
export class BodyareaComponent implements OnInit {

  displayedColumns: string[] = ['Symbol', 'Industry','Name','Sector','MarketCap'];
  dataSource = new MatTableDataSource<Stock>();
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService) { 
    data.getStockListing().subscribe((response) => {
      this.dataSource.data = response;
  });
  }

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}