import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.page.html',
  styleUrls: ['./asociados.page.scss'],
})
export class AsociadosPage implements OnInit {
  users: any = [];
  permission: boolean = false

  constructor(    
    private http: HttpClient
  ) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);


  ngOnInit() {
    this.permission = true;
    console.log("Holaaaa")
    this.getUsers().subscribe(res=>{
      console.log("Res", res)
      this.users = res;
    }
    );


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
  getUsers(){
    return this.http
    .get("assets/files/asociados.json")
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    )
  }



}
