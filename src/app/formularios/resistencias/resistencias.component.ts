import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resistencias.component.html',
  styleUrls: ['./resistencias.component.css']
})
export default class ResistenciasComponent implements OnInit {
  formularioRes!: FormGroup;
  resultadosGuardados: any[] = [];
  resultado: any = {
    color1: '',
    color2: '',
    color3: '',
    tolerancia: '',
    valor: 0,
    valorMaximo: 0,
    valorMinimo: 0
  };
  colorSeleccionado: any = {
    color1: '',
    color2: '',
    color3: '',
    tolerancia: ''
  };
  
  colorHex: { [key: string]: string } = {
    negro: '#000000',
    marron: '#8B4513',
    rojo: '#FF0000',
    naranja: '#FFA500',
    amarillo: '#FFFF00',
    verde: '#008000',
    azul: '#0000FF',
    violeta: '#EE82EE',
    gris: '#808080',
    blanco: '#FFFFFF'
  };

  valorColor: { [key: string]: number } = {
    negro: 0,
    marron: 1,
    rojo: 2,
    naranja: 3,
    amarillo: 4,
    verde: 5,
    azul: 6,
    violeta: 7,
    gris: 8,
    blanco: 9
  };

  valoresMulti: { [key: string]: number } = {
    negro: 1,
    marron: 10,
    rojo: 100,
    naranja: 1000,
    amarillo: 10000,
    verde: 100000,
    azul: 1000000,
    violeta: 10000000,
    gris: 100000000,
    blanco: 1000000000
  };

  toleValores: { [key: string]: number } = {
    oro: 5,
    plata: 10
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioRes = this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      tolerancia: ['', Validators.required]
    });

    const datosGuardados = localStorage.getItem('resultados');
    if (datosGuardados) {
      this.resultadosGuardados = JSON.parse(datosGuardados);
    }
  }

  actualizarColorSeleccionado() {
    this.colorSeleccionado.color1 = this.formularioRes.get('color1')?.value;
    this.colorSeleccionado.color2 = this.formularioRes.get('color2')?.value;
    this.colorSeleccionado.color3 = this.formularioRes.get('color3')?.value;
    this.colorSeleccionado.tolerancia = this.formularioRes.get('tolerancia')?.value;
}


  registro(): void {
    const color1 = this.formularioRes.get('color1')?.value;
    const color2 = this.formularioRes.get('color2')?.value;
    const color3 = this.formularioRes.get('color3')?.value;
    const tolerancia = this.formularioRes.get('tolerancia')?.value;

    if (color1 === 'negro' && color2 === 'negro' && color3 === 'negro') {
      alert('Las tres bandas son negras, esto representa una resistencia de 0 Ω.');
      this.resultado = {
        color1,
        color2,
        color3,
        tolerancia,
        valor: 0,
        valorMaximo: 0,
        valorMinimo: 0
      };
      return;
    }

    const valorBase = (this.valorColor[color1] * 10) + this.valorColor[color2];
    const valor = valorBase * this.valoresMulti[color3];
    const valorTole = this.toleValores[tolerancia] || 0;
    const valorMaximo = valor + (valor * valorTole) / 100;
    const valorMinimo = valor - (valor * valorTole) / 100;

    this.resultado = {
      color1,
      color2,
      color3,
      tolerancia,
      valor,
      valorMaximo,
      valorMinimo
    };

    this.resultadosGuardados.push(this.resultado);

    // Guardar el array
    localStorage.setItem('resultados', JSON.stringify(this.resultadosGuardados));

    //Resetear la seleccion
    this.colorSeleccionado = {
      color1: '',
      color2: '',
      color3: '',
      tolerancia: ''
    };

    // Reiniciar el formulario
    this.formularioRes.reset();
  }

  imprimir(): void {
    localStorage.removeItem('resultados');
    this.resultadosGuardados = []; // Limpiar resultados guardados en la pantalla
  }
}
