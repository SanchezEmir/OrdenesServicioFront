import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cli = '';

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
    private service: ClienteService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  findById():void {
    this.service.findById(this.id_cli).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente actualizado correcto!')
    }, err => {
      console.log(err)
      if (err.error.error.match('ya registrado')) {
        this.service.message(err.error.error)
      }
    })
  }

  errorValidName() {
    if(this.name.invalid) {
      return 'entre 5 a 100 caracteres!';
    }
    return false;
  }

  errorValidCpf() {
    if(this.dni.invalid) {
      return 'dni debe tener 8 digitos';
    }
    return false;
  }

  errorValidTelefone() {
    if(this.telefono.invalid) {
      return 'debe tener 9 digitos!';
    }
    return false;
  }

}
