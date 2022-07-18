import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showFiller = false;
  public isScreenSmall!: boolean;

  constructor(
    private breakpointobservor: BreakpointObserver,
    private router:Router) { }
    @ViewChild(MatSidenav) sidenav!:MatSidenav
  ngOnInit(): void {
    this.breakpointobservor.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state:BreakpointState)=>{
      this.isScreenSmall=state.matches
    })

    
    this.router.events.subscribe(()=>{
      if(this.isScreenSmall){
        //TODO: closer the sidenav when a contact has been clicked
        this.sidenav.close();
      }
    })
  }
  
  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/'])
    }).catch((error) => {
      // An error happened.
    });
  }

}
