import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { EasterComponent } from './components/easter/easter.component';

const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
    pathMatch: 'full'
  },
  {
    path:'formulario',
    component:FormularioComponent
  },
  {
    path: 'easter', component: EasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
