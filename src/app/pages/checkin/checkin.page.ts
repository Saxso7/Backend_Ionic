import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ReservaService } from '../../services/reserva.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  reservas: any[];
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private reservaService: ReservaService,
    private alertController: AlertController,
    private firebaseServ: FirebaseService,
    private router: Router) { }

  

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    console.log('Reservass: ', this.reservas); // Agrega esta línea

    this.reservas = this.reservaService.obtenerReservas();
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
