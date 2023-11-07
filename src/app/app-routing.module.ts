import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoadingComponent } from './shared/componentes/loading/loading.component';

const routes: Routes = [
  {
    path: 'loading',
    component: LoadingComponent // Carga el componente directamente
  },
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate:[NoAuthGuard]
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule),canActivate:[NoAuthGuard]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule), canActivate:[NoAuthGuard]
  },
  {
    path: 'ubication',
    loadChildren: () => import('./pages/ubication/ubication.module').then( m => m.UbicationPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'asociados',
    loadChildren: () => import('./pages/asociados/asociados.module').then( m => m.AsociadosPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'checkin',
    loadChildren: () => import('./pages/checkin/checkin.module').then( m => m.CheckinPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'reservas',
    loadChildren: () => import('./pages/reservas/reservas.module').then( m => m.ReservasPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'tutoriales',
    loadChildren: () => import('./pages/tutoriales/tutoriales.module').then( m => m.TutorialesPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'dietas',
    loadChildren: () => import('./pages/dietas/dietas.module').then( m => m.DietasPageModule),canActivate:[AuthGuard]
  },  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
