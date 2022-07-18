import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payment';
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, deleteDoc, doc } from "firebase/firestore";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';


const app = initializeApp(environment.firebase);
const db = getFirestore(app)

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})

//Creating this as a placeholder for Data
export class IncomeComponent implements OnInit {
  displayedColumns:string[]=['amount','tip','label','date','mode', 'delete'];
  dataSource = new MatTableDataSource<any>();
  filteredData = new MatTableDataSource<any>();
  idRef:any[] = [];
  grossIncome=0;
  tip=0;
  month!:string;
  @ViewChild(MatTable) table!:MatTable<Payment[]>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.month='All';
    //Get the data from the database
    const querySnapshot = getDocs(collection(db,"Roxi"));
    (await querySnapshot).forEach((doc)=>{
      this.dataSource.data.push((doc.data()))
      this.idRef.push({item:doc.data(),id:doc.ref})
      console.log(this.idRef)
    })
    this.table.renderRows()
    this.filteredData.data=this.dataSource.data
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;
    this.filteredData.data.forEach(e=>{
      this.grossIncome=this.grossIncome+Number(e.amount);
      this.tip=this.tip+Number(e.tip);
    })
  }
  
  delete(pay:Payment){
    //this.service.RemovePayment(pay);
    this.idRef.forEach(e=>{
      console.log(e.item)
      if (
        e.item.label === pay.label && 
        e.item.amount=== pay.amount && 
        e.item.tip === pay.tip && 
        String(e.item.date) === String(pay.date) && 
        e.item.mode === pay.mode 
      ) {
        deleteDoc(e.id)
        console.log("We have reached a delete")
      }
    })
    this.filteredData.data.splice(this.filteredData.data.indexOf(pay),1);
    this.filteredData.sort=this.sort;
    this.table.renderRows();
    this.grossIncome=0;
    this.tip=0;
    this.filteredData.data.forEach(e=>{
      this.grossIncome=this.grossIncome+Number(e.amount);
      this.tip=this.tip+Number(e.tip);
    })
  }
  openDialog(pay:Payment){
    let dialogRef = this.dialog.open(DialogComponent, {
      width:'450px',
      height:'200px'
  })
    dialogRef.afterClosed().subscribe(e=>{
      if (dialogRef.componentInstance.deleteThis==true){
        this.delete(pay);
      }
    })
  }
  applyFilter(){
    if(this.month!="All"){
      console.log(this.dataSource.data);
      this.filteredData.data=[];
      this.dataSource.data.forEach(element=>{
        if(new Date(element.date*1000).toDateString().includes(this.month)){
          this.filteredData.data.push(element);
        }
      })
      } else {this.filteredData.data=this.dataSource.data;}
      this.filteredData.sort = this.sort;
      this.table.renderRows()
      this.grossIncome=0;
      this.tip=0;
      this.filteredData.data.forEach(e=>{
        this.grossIncome=this.grossIncome+Number(e.amount);
        this.tip=this.tip+Number(e.tip);
      })
    }
  }


