import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    age: new FormControl('',[Validators.required,Validators.maxLength(2)])
  })

  firebaseServ = inject(FirebaseService);
  utilsServ = inject(UtilsService);
  router = inject(Router);
  apiService = inject(ApiService);
  constructor() { }

  ngOnInit() {
  }
  
  enviarDatos() {
    const formData = this.form.getRawValue(); // Obtiene un objeto plano con los valores del formulario
    this.apiService.postData(formData).subscribe(response => {
      console.log('Respuesta de la API:', response);
      // Realiza cualquier acción necesaria con la respuesta
    }, error => {
      console.error('Error al realizar la solicitud POST:', error);
    });
  }
  async submit() {

    if (this.form.valid) {
      const loading = await this.utilsServ.loading();
      await loading.present();

      this.firebaseServ.signUp(this.form.value as User).then(async res => {
        await this.firebaseServ.updateUser(this.form.value.name)
        console.log(res);
        this.utilsServ.presentToast({
          message: 'Usuario creado',
          duration: 3000,
          color: "primary",
          position: "middle",
          icon: "alert-circle-sharp"
        });
        this.router.navigate(['/']);

      }).catch(error => {
        console.log(error);

        this.utilsServ.presentToast({
          message: error.message,
          duration: 3000,
          color: "primary",
          position: "middle",
          icon: "alert-circle-sharp"
        })
      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}
