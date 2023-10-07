import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getIdToken } from 'firebase/auth';
import { User } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  router = inject(Router);

  constructor() { }

  // Obtener la instancia de autenticación de Firebase
  getAuth() {
    return getAuth();
  }

  // Registrarse en Firebase
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Iniciar sesión en Firebase
  async signIn(user: User) {
    try {
      const result = await signInWithEmailAndPassword(getAuth(), user.email, user.password);
      if (result.user) {
        // Inicio de sesión exitoso
        // Accede al token JWT
        const userToken = await result.user.getIdToken();

        // Guarda el token en localStorage para su posterior uso
        localStorage.setItem('userToken', userToken);
        // Registra el token en la consola para verificar
        console.log('Token JWT:', userToken);
        
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejo de errores de inicio de sesión
    }
  }
  // Actualizar el perfil del usuario en Firebase
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // Enviar correo electrónico de recuperación de contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Cerrar sesión en Firebase
  signOut(){
    getAuth().signOut();
    this.router.navigate(['/']);
  }
}
