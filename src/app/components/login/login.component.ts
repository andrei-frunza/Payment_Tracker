import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const auth = getAuth();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  email=new FormControl('',[Validators.required]);
  pass=new FormControl('',[Validators.required]);

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    signInWithEmailAndPassword(auth, this.email.value, this.pass.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    this.router.navigate(['in/inc'])
  })
  .catch((error) => {
    console.log(error)
    this._snackBar.open("Either Email or Pass is invalid","close");
  });
  }

  logGuest(){
    this.router.navigate(['in/inc'])
  }
  
}
