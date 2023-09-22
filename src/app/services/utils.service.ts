import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  //Aqui preparamos el loading cuando la funcion de inicio de sesion se este ejecutando

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


}
