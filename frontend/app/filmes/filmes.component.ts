import { Component, OnInit } from '@angular/core';
import { Filmes } from './model/Filmes';
import { ApiService } from './service/api.service'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
      }
}

 let vId : Number;
 let vAutor : String;
 let vTitulo : String;
 let vDescricao : String;


@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})



export class FilmesComponent implements OnInit {
    filmes : Observable<Filmes[]>;
    displayedColumns: string[] = ['id', 'autor', 'titulo','descricao'];
     form: FormGroup;
     

    constructor(private apiService : ApiService,private formBuilder: FormBuilder,public dialog: MatDialog)
       {
          this.filmes = this.apiService.list();
          this.form = this.formBuilder.group({
          id : [],
          autor: [Validators.required],
          titulo: [Validators.required],
          descricao: [Validators.required]
        });
     }

    ngOnInit() : void { }

    onList() : void {
       this.filmes = this.apiService.list();
    }

    onDeletefilme(vId : Number) : void {
      if(confirm("Confirma Exclusão ? ")) {
      this.apiService.delete(vId).subscribe(result => this.onList(), error => this.onError());
    }
 }

  private onError() { }

  openDiaCadastro(filmealterar : Filmes) {
    vId = filmealterar.id;
    vAutor = filmealterar.autor;
    vTitulo = filmealterar.titulo;
    vDescricao = filmealterar.descricao;
 
    const dialogRef = this.dialog.open(FilmesCadastro);
    dialogRef.afterClosed().subscribe(result => {
        this.filmes = this.apiService.list();
        this.onList();
    });
 }

 openDiaDetalhe(filmedetalhe : Filmes) {
    vId = filmedetalhe.id;
    vAutor = filmedetalhe.autor;
    vTitulo = filmedetalhe.titulo;
    vDescricao = filmedetalhe.descricao;
 
    const dialogRef = this.dialog.open(FilmesDetalhe);
    dialogRef.afterClosed().subscribe(result => {
        this.filmes = this.apiService.list();
        this.onList();
    });
 }
}

@Component({
  selector: '../filmecadastro/filmecadastro.component',
  templateUrl: '../filmecadastro/filmecadastro.component.html',
})
export class FilmesCadastro {
   form: FormGroup;
   matcher = new MyErrorStateMatcher();

   constructor(private apiService : ApiService,private formBuilder: FormBuilder,public dialog: MatDialog )
   {
      this.form = this.formBuilder.group({
      id  : new FormControl(vId),
      autor : new FormControl(vAutor, [Validators.required]),
      titulo : new FormControl(vTitulo, [Validators.required]),
      descricao : new FormControl(vDescricao, [Validators.required]),
      imagemfilme : new FormControl('')
    });
 }

   onAdicionarfilme() : void {
     if (!this.form.valid) {
       alert("Formulário inválido");
     }
     else
     {
      if (vId!=0)
        {
          this.apiService.put(vId,this.form.value).subscribe(result =>  alert("Alteracao Efetuada"), error => this.onError());
        }
        else
        {
          this.apiService.save(this.form.value).subscribe(result => alert("Inclusao Efetuada"), error => this.onError());
        }
     }
   }
   private onError() {  }
}


@Component({
  selector: '../filmedetalhe/filmedetalhe.component',
  templateUrl: '../filmedetalhe/filmedetalhe.component.html',
})
export class FilmesDetalhe {
   form: FormGroup;
   matcher = new MyErrorStateMatcher();

   constructor(private apiService : ApiService,private formBuilder: FormBuilder,public dialog: MatDialog )
   {
      this.form = this.formBuilder.group({
      id  : new FormControl(vId),
      autor : new FormControl(vAutor, [Validators.required]),
      titulo : new FormControl(vTitulo, [Validators.required]),
      descricao : new FormControl(vDescricao, [Validators.required])
    });
 }
   private onError() {  }
}




