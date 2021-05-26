import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
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
    private service: ClienteService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  create(): void {
    this.service.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente creado corectamente')
    }, err => {
      console.log(err)
      if (err.error.error.match('ya registrado')) {
        this.service.message(err.error.error)
      }
    })
  }

  errorValidName() {
    if (this.name.invalid) {
      return 'solo 100 caracteres!';
    }
    return false;
  }

  errorValidCpf() {
    if (this.dni.invalid) {
      return '8 digitos';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefono.invalid) {
      return '9 digitos';
    }
    return false;
  }

}
