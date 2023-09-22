import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  router = inject(Router);

  //autenticacion
  getAuth() {

    return getAuth();
  }


  //Registrarse
  signUp(user: User) {

    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);


  }

  //Iniciar Sesion

  signIn(user: User) {

    return signInWithEmailAndPassword(getAuth(), user.email, user.password);

    //Actualizar usuarios
  }
  updateUser(displayName: string) {

    return updateProfile(getAuth().currentUser, { displayName })


  }
  //Recuperar contraseña

  sendRecoveryEmail(email: string) {

    return sendPasswordResetEmail(getAuth(), email);
  }

  //Cerrar Sesion
  signOut(){

    getAuth().signOut();
    this.router.navigate(['/']);
    
  }



  constructor() { }
}
