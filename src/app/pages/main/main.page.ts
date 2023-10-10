import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  data: any;
  pages = [
    { title: 'Inicio', url: 'main', icon: 'home-outline'},
    { title: 'lugares', url: 'ubication', icon: 'earth-outline'}
  ]

  firebaseServ = inject(FirebaseService);
  utilsServ = inject(UtilsService);
  router = inject(Router);
  api = inject(ApiService);
  constructor( private apiService: ApiService) { }

  ngOnInit() {
    this.api.getData().subscribe((response) => {
      this.data = response;
      console.log(this.data)
    });
  }
  
  ubication(){
     this.router.navigate(['/ubication']);

  }
  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');
    
    // Llamar al método de signOut de Firebase si es necesario
    this.firebaseServ.signOut();
    
    // Navegar a la página de inicio
    this.router.navigate(['/']);
  }

  }
