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
      title: "DuocUC Viña del Mar",
      latitude: -33.03356325015952,
      longitude: -71.53317337493256,
      adress: "Álvarez 2336, 2571188 Viña del Mar, Valparaíso",
      horario: "Hora de atención las 08:00 a las 23:00"
    },
    {
      title: "Astros GYM",
      latitude: -33.008514926683375,
      longitude: -71.54258595011295,
      adress: "14 Nte 1141, 2520000 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 08:10 a las 21:30"
    },
	
	{
      title: "Gimnasio Energy",
      latitude: -33.00743526926874,
      longitude: -71.54782162206675,
      adress: "Av. Libertad 1348, Local 400, 2530900 Valparaíso, Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 23:00"
    },
	
	{
      title: "Gimnasio CuerpoMente",
      latitude: -33.013616604147174,
      longitude: -71.55415061993232,
      adress: "8 Nte. 340, 2520104 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 21:00"
    },
	
	{
      title: "Gimnasio Marcos Cafena",
      latitude: -33.017934852064414,
      longitude: -71.5432501230713,
      adress: "5 Ote. 356, 2531112 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:30 a las 22:00"
    },
	
	{
      title: "Sportlife Viña del Mar",
      latitude: -33.006939545460554,
      longitude: -71.54515314603223,
      adress: "Av. Benidorm 961, 2530178 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 22:00"
    },
	
	{
      title: "Gimnasio Polideportivo de Viña del Mar",
      latitude: -33.01530659225186, 
      longitude: -71.53536844909952,
      adress: "Av. Padre Hurtado 300, Viña del Mar, Valparaíso",
      horario: "Hora pick de las 12:00 a las 12:00"
    },
	
	{
      title: "Gimnasio Pacific Sucursal VIÑA DEL MAR",
      latitude: -33.02257538185263,
      longitude: -71.55849981883955,
      adress: "Arlegui 302, 2571494 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 09:00 a las 09:00"
    },
	
	{
      title: "Centro Deportivo Konas",
      latitude: -33.025202074256924,
      longitude: -71.54858637478151,
      adress: "Av. Valparaíso 950, 2520535 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 22:15"
    },
	
	{
      title: "Gimnasio Team Gym Kamakura",
      latitude: -33.0214959111468,
      longitude: -71.56163266532045,
      adress: "Von Schroeder 70, 2571407 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 09:00 a las 23:00"
    },
	
	{
      title: "Gym Leme",
      latitude: -33.02610162293524,
      longitude: -71.56193307303641,
      adress: "Von Schroeder 444, 2580123 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 21:00"
    },
	
	{
      title: "Gimnasio Seven",
      latitude: -33.026245547552676,
      longitude: -71.56334927929417,
      adress: "Bellavista 237, Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 23:00"
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
    const myLatLng = { lat: -33.03356325015952, lng: -71.53317337493256 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 13
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
