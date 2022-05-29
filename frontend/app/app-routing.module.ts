import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesComponent } from './filmes/filmes.component';
const routes: Routes = [
  {
    path: 'filmes',
    component : FilmesComponent,
    data : { title : 'Lista de Cursos' }
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
