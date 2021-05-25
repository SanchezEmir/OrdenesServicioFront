import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/tecnico';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nombre: 'Demo',
    dni: '98746352',
    telefono: '987456345'
  }

  constructor(
    private router: Router,
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.router.navigate(['tecnicos'])
  }

  crear(): void {
    this.service.crear(this.tecnico).subscribe((respuesta) => {
      this.router.navigate(['tecnicos'])
      this.service.mensaje('Tecnico creado correctamente!!')
    }, err => {
      if (err.error.math('Ya esta registrado')) {
        this.service.mensaje(err.error)
      }
    })
  }

}
