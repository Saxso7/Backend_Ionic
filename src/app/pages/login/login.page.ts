import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  firebaseServ = inject(FirebaseService);
  utilsServ = inject(UtilsService);
  router = inject(Router);
  constructor() { }

  ngOnInit() {
  }

  async submit(){

    if (this.form.valid){
      const loading = await this.utilsServ.loading();
      await loading.present();

      this.firebaseServ.signIn(this.form.value as User).then(res =>
        {
          console.log(res);
          this.utilsServ.presentToast({
            message: 'Bienvenido: ' + this.form.value.email,
            duration: 3000,
            color: "primary",
            position: "middle",
            icon: "alert-circle-sharp"
          })
          this.router.navigate(['/main']);
        }).catch(error => {
          console.log(error);
          this.utilsServ.presentToast({
            message: 'Error en el usuario y/o contraseña',
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
