import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';

declare var google; 

@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.page.html',
  styleUrls: ['./ubication.page.scss'],
})
export class UbicationPage implements OnInit {
  data: any;

  map: any; // Declara la variable para el mapa
  infoWindows: any = [];
  marcador: any = [];


  constructor() { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  api = inject(ApiService);

  ngOnInit() {
    this.initMap();
    this.api.getGym().subscribe((response) => {
      this.data = response;
      this.marcador = this.data;
      console.log(this.marcador);
    });

  }
  userRole: string = 'usuario'; // Simula el rol del usuario (puedes obtenerlo de tu sistema de autenticación)
  

  // Función para verificar si el usuario tiene el rol "admin"
  isUserAdmin(): boolean {
    return this.userRole === 'admin';
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
  initMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    
    const myLatLng = { lat: -33.03356325015952, lng: -71.53317337493256 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 13
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.addMarkersToMap(this.marcador);
    });
  }

  
  addMarkersToMap(marcador){
    for (let marker of marcador ){
      let position = new google.maps.LatLng(parseFloat(marker.latitud), parseFloat(marker.longitud));
      let mapMarker = new google.maps.Marker({
        position: position,
        nombre: marker.nombre,
        latitud: marker.latitud,
        longitud: marker.longitud,
        direccion: marker.direccion,
        horario: marker.horario
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker)
    }
  }
  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content" class="info-window">' +
      '<h2 id="firstHeading" class="firstHeading">' + marker.nombre + '</h2>' +
      '<p>Direccion: ' + marker.direccion + '</p>' +
      '<p>Horario: ' + marker.horario + '</p>' +     
      '</div>';
  
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
  
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.setContent(infoWindowContent); // Aplica la clase CSS aquí
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  
  
  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }


}
