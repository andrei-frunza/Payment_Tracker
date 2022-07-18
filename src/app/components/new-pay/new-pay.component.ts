import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';



const app = initializeApp(environment.firebase);
const db = getFirestore(app)

@Component({
  selector: 'app-new-pay',
  templateUrl: './new-pay.component.html',
  styleUrls: ['./new-pay.component.scss']
})
export class NewPayComponent implements OnInit {
  item$!: Observable<any>
  date!:Date;
  label=new FormControl('',[Validators.required]);
  amount=new FormControl('',[Validators.required]);
  tip=new FormControl('',[Validators.required]);
  mode!:string;

  
  constructor(private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
  }

  save(){
    let pay = new Payment;
    pay = {label:this.label.value, amount:Number(this.amount.value), date:this.date, mode:this.mode, tip:this.tip.value}
    console.log(pay)
    const docRef = addDoc(collection(db,"Roxi"),{
      label:this.label.value,
      date:this.date,
      amount:this.amount.value,
      tip:this.tip.value,
      mode:this.mode
    })
    .catch(error=>{
      console.log(error);
      this._snackBar.open("Payment could not be made","close")
    })
    this._snackBar.open("A New Payment was added","close");
  }

}
