import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userData: any;
  apiUserData: any;
  userEmail: string;
  data: any;
  datos: any;


  constructor(private api: ApiService, 
              private afAuth: AngularFireAuth,
              private alertController: AlertController,
              private storage: AngularFireStorage ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario ha iniciado sesión en Firebase
        this.userData = user;
        this.userEmail = user.email; // Obtenemos el correo del usuario autenticado

        // Llama a la API para obtener todos los usuarios y luego filtra el usuario por correo
        this.api.getUser().subscribe((response) => {
          this.data = response;
          this.datos = this.data.users;

          const usuarioEncontrado = this.datos.find(usuario => {
            return usuario.email === this.userEmail;
          });

          if (usuarioEncontrado) {
            this.apiUserData = usuarioEncontrado;
            console.log(this.apiUserData)
          } else {
            console.log('error');
          }
        });
      } else {
        // El usuario no ha iniciado sesión
        this.userData = null;
      }
    });
  }


  async actualizarCampo() {
    const userId = this.apiUserData.id;

    const alert = await this.alertController.create({
      header: 'Confirmar actualización',
      message: '¿Deseas actualizar la información?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: () => {
            Object.keys(this.apiUserData).forEach(campo => {
              const nuevoValor = this.apiUserData[campo];
              this.api.updateUserField(userId, campo, nuevoValor).subscribe(response => {
                if (response.success) {
                  console.log(`Campo ${campo} actualizado con éxito`);
                  this.apiUserData[campo] = nuevoValor;
                } else {
                  console.error(response.error);
                }
              });
            });
          },
        },
      ],
    });

    await alert.present();
  }
  
  


  
}