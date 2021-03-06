import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

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
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Tecnico creado corecto!')
    }, err => {
      if (err.error.error.match('ya registrado')) {
        this.service.message(err.error.error)
      }
    })
  }

  errorValidName() {
    if(this.name.invalid) {
      return 'entre 5 a 100 cracteres!';
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
      return '9 digitos';
    }
    return false;
  }

}