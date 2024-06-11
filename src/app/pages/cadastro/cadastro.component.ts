import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginModel } from '../../Models/LoginModel';
import { CadastrarModel } from '../../Models/CadastrarModel';
import { ToastrService } from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  cadastroForm!: FormGroup;

  constructor (private formBuilder :FormBuilder, private router: Router, private loginService: LoginService, private toastr: ToastrService)
  {
    this.cadastroForm = this.formBuilder.group({
      name:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmaSenha: new FormControl('', [Validators.required]),
      adm: ['']
    }, { validators: this.senhasCombinam });


  }

  senhasCombinam(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmaSenha = group.get('confirmaSenha')?.value;
    return password === confirmaSenha ? null : { senhasNaoCombinam: true };
  }

  submitCadastro() {
    debugger;
    var dadosLogin = this.cadastroForm.getRawValue() as CadastrarModel;
    dadosLogin.adm = dadosLogin.adm?.toString().toUpperCase();
    if(dadosLogin.adm != "TRUE") {
      delete dadosLogin.adm;
    }

    console.log(dadosLogin);
    this.loginService.CadastrarUsuario(dadosLogin).subscribe(
      response => {
        console.log('Resposta da API:', response);
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
        this.cadastroForm.reset();
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Erro ao realizar cadastro!', 'Erro');
        console.error('Erro ao cadastrar usuário', error);
      }
    );
  }
}
