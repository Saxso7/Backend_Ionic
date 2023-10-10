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
  async signIn(user: User): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(getAuth(), user.email, user.password);
      if (result.user) {
        // Inicio de sesión exitoso
        // Accede al token JWT
        const userToken = await result.user.getIdToken();


  
        // Guarda el token en localStorage para su posterior uso
        localStorage.setItem('userToken', userToken);

        localStorage.setItem('userEmail', user.email);

        
        
        // Navega nuevamente a la página 'main' para recargarla
        this.router.navigateByUrl('/main');
        
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para que se maneje en el componente
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
