import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  firebaseServ = inject(FirebaseService);
  utilsServ = inject(UtilsService);
  router = inject(Router);
  constructor() { }

  ngOnInit() {
  }
  
  signOut(){
    this.firebaseServ.signOut();
    this.router.navigate(['/']);
  }
}
