import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = ''

  tecnico: Tecnico = {
    id: '',
    name: '',
    dni: '',
    telefono: ''
  }
  
  name = new FormControl('', [Validators.minLength(5)])
  dni = new FormControl('', [Validators.minLength(8)])
  telefono = new FormControl('', [Validators.minLength(9)])

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void {
    this.service.update(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico actualizado correcto!')
    }, err => {
      if (err.error.error.match('ya egistrado')) {
        this.service.message(err.error.error)
      }
    })
  }
  
  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }
  
  errorValidName() {
    if(this.name.invalid) {
      return 'entre 5 a 100 caracteres!';
    }
    return false;
  }

  errorValidCpf() {
    if(this.dni.invalid) {
      return '8 digitos';
    }
    return false;
  }

  errorValidTelefone() {
    if(this.telefono.invalid) {
      return '9 digitos!';
    }
    return false;
  }

}
