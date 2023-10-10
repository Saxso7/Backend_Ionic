import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
