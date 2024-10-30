import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  pago: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent {
  formularioEmpleado: FormGroup;
  empleados: Empleado[] = [];

  constructor(private fb: FormBuilder) {
    this.formularioEmpleado = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [0],
      horasTrabajadas: [0]
    });
  }

  agregarEmpleado() {
    const horas = this.formularioEmpleado.value.horasTrabajadas;
    const pagoBase = 70;
    const pagoExtra = 140;
    const pago = horas > 40 ? (40 * pagoBase) + ((horas - 40) * pagoExtra) : horas * pagoBase;

    const nuevoEmpleado: Empleado = {
      ...this.formularioEmpleado.value,
      pago
    };

    this.empleados.push(nuevoEmpleado);
    this.formularioEmpleado.reset();
  }
  
  modificarEmpleado(matricula: string) {
    const index = this.empleados.findIndex(e => e.matricula === matricula);
    if (index !== -1) {
      this.empleados[index] = {
        ...this.empleados[index],
        ...this.formularioEmpleado.value,
        pago: this.calcularPago(this.formularioEmpleado.value.horasTrabajadas)
      };
      this.formularioEmpleado.reset();
    }
  }

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(e => e.matricula !== matricula);
  }

  calcularPago(horas: number): number {
    const pagoBase = 70;
    const pagoExtra = 140;
    return horas > 40 ? (40 * pagoBase) + ((horas - 40) * pagoExtra) : horas * pagoBase;
  }
}
