import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ZodiacoComponent],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export default class ZodiacoComponent implements OnInit {
  formularioZodiaco!: FormGroup;
  resultado: any = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    fechaNacimiento: '',
    edad: 0,
    signo: '',
    sexo: '',
    imagenAnimal: ''
  };

  signosChinos: { [key: string]: number[] } = {
    'Rata': [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
    'Buey': [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
    'Tigre': [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
    'Conejo': [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
    'Dragón': [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
    'Serpiente': [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
    'Caballo': [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
    'Cabra': [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
    'Mono': [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
    'Gallo': [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
    'Perro': [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
    'Cerdo': [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioZodiaco = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      año: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['Masculino', Validators.required],
    });
  }

  calcularEdad(dia: number, mes: number, anio: number): number {
    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const today = new Date();
    
    let edad = today.getFullYear() - fechaNacimiento.getFullYear();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();

    if (today.getMonth() < mesNacimiento || (today.getMonth() === mesNacimiento && today.getDate() < diaNacimiento)) {
      edad--;
    }

    return edad;
  }

  obtenerSigno(anioNacimiento: number): string {
    for (const signo in this.signosChinos) {
      if (this.signosChinos[signo].includes(anioNacimiento)) {
        return signo;
      }
    }
    return 'Desconocido';
  }

  obtenerImagenAnimal(signo: string): string {
    const imagenesAnimales: { [key: string]: string } = {
      'Rata': 'https://st2.depositphotos.com/1008006/6355/i/450/depositphotos_63553879-stock-illustration-image-two-of-cartoon-mouse.jpg',
      'Buey': 'https://static.vecteezy.com/system/resources/previews/008/078/372/non_2x/cartoon-angry-bull-isolated-on-white-background-free-vector.jpg',
      'Tigre': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRwMAVPQT3_qVuURxS9euc9jrwkFxRHrysKg&s',
      'Conejo': 'https://static.vecteezy.com/system/resources/previews/012/507/322/non_2x/cute-rabbit-cartoon-on-white-background-vector.jpg',
      'Dragón': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IWaBwQPm2itI8WkNsCX5J5PZ9i2_woM_rA&s',
      'Serpiente': 'https://previews.123rf.com/images/frescostudio/frescostudio2212/frescostudio221200256/196009289-linda-peque%C3%B1a-caricatura-de-serpiente-cobra.jpg',
      'Caballo': 'https://www.shutterstock.com/image-vector/vector-isolated-horse-standing-on-600nw-2426901739.jpg',
      'Cabra': 'https://static.vecteezy.com/system/resources/previews/004/589/349/non_2x/goat-cartoon-animal-character-free-vector.jpg',
      'Mono': 'https://static.vecteezy.com/system/resources/previews/009/877/495/non_2x/cute-baby-monkey-cartoon-confused-vector.jpg',
      'Gallo': 'https://previews.123rf.com/images/winarto31/winarto311911/winarto31191100013/135045136-adorable-gallo-caricatura-ilustraci%C3%B3n.jpg',
      'Perro': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtBE2A1My3fhQCpdbyhdpBPhLc64fMhRP1A&s',
      'Cerdo': 'https://img.freepik.com/vector-premium/caricatura-cerdo-sonriente_29190-4229.jpg',
    };
    return imagenesAnimales[signo] || '';
  }

  registro(): void {
    const nombre = this.formularioZodiaco.get('nombre')?.value;
    const apaterno = this.formularioZodiaco.get('apaterno')?.value;
    const amaterno = this.formularioZodiaco.get('amaterno')?.value;
    const dia = this.formularioZodiaco.get('dia')?.value;
    const mes = this.formularioZodiaco.get('mes')?.value;
    const año = this.formularioZodiaco.get('año')?.value;
    const sexo = this.formularioZodiaco.get('sexo')?.value;
    const edad = this.calcularEdad(dia, mes, año);
    const signo = this.obtenerSigno(año);
    const imagenAnimal = this.obtenerImagenAnimal(signo);

    this.resultado = {
      nombre,
      apaterno,
      amaterno,
      fechaNacimiento: `${dia}/${mes}/${año}`,
      edad,
      signo,
      sexo,
      imagenAnimal
    };
  }
}
