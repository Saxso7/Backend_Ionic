import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { DataStorageService } from 'src/app/services/data-storage.service';




@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.page.html',
  styleUrls: ['./asociados.page.scss'],
})
export class AsociadosPage implements OnInit {
  data: any;
  gyms: any = [];
  permission: boolean = false

  constructor(    
    private http: HttpClient,
    private dataStorage: DataStorageService
    
  ) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  api = inject(ApiService);


  ngOnInit() {
    this.loadDataFromLocalStorage();
    console.log(this.gyms);

  }
  loadDataFromLocalStorage() {
    // Intenta cargar los datos desde el almacenamiento local
    const storedData = this.dataStorage.getDataGym();

    if (storedData) {
      this.gyms = storedData.gyms;
    }
  }

  
  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');
    
    // Llamar al método de signOut de Firebase si es necesario
    this.firebaseServ.signOut();
    
    // Navegar a la página de inicio
    this.router.navigate(['/']);
  }
  openMain() {
    // Abre la página de "Ubicaciones" con un pequeño retraso
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 400); // 300 milisegundos (ajusta este valor según tus necesidades)
  }



}
