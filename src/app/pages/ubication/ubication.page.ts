import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
declare var google; 
@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.page.html',
  styleUrls: ['./ubication.page.scss'],
})
export class UbicationPage implements OnInit {
  map: any; // Declara la variable para el mapa
  infoWindows: any = [];
  markers: any = [
    {
      title: "Mi casa",
      latitude: -33.02072985301783,
      longitude: -71.50881024970636,
      adress: "manuel novoa 35, Miraflores Viña del mar",
      horario: "Hora pick de las 18:00 a las 12:00"
    }
  ];

  constructor() { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);

  ngOnInit() {
    this.initMap();
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
    const myLatLng = { lat: -33.02072985301783, lng: -71.50881024970636 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.addMarkersToMap(this.markers);
    });
  }

  
  addMarkersToMap(markers){
    for (let marker of markers ){
      let position = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        adress: marker.adress,
        horario: marker.horario
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker)
    }
  }
  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content" class="info-window">' +
      '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p>Direccion: ' + marker.adress + '</p>' +
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
