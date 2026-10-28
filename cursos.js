/*
  DATOS DE LA MALLA
  IMPORTANTE: los cursos incluidos son una DEMOSTRACIÓN, no una malla oficial completa.
  Edita este archivo con los nombres, créditos, semestres y requisitos oficiales de la UCR.
  Estado inicial: "pendiente". Estados permitidos: "pendiente", "curso", "aprobado".
*/
const cursos = [
  {id:"ds1", nombre:"Desarrollo de Software I", creditos:4, anio:1, semestre:1, requisitos:[]},
  {id:"calculo1", nombre:"Cálculo I", creditos:4, anio:1, semestre:1, requisitos:[]},
  {id:"intro-ie", nombre:"Introducción a Informática Empresarial", creditos:3, anio:1, semestre:1, requisitos:[]},
  {id:"mate-discretas", nombre:"Matemáticas Discretas", creditos:4, anio:1, semestre:1, requisitos:[]},
  {id:"curso-general1", nombre:"Curso por agregar", creditos:3, anio:1, semestre:1, requisitos:[]},
  {id:"algebra-lineal", nombre:"Álgebra Lineal", creditos:4, anio:1, semestre:2, requisitos:["calculo1"]},
  {id:"ds2", nombre:"Desarrollo de Software II", creditos:4, anio:1, semestre:2, requisitos:["ds1"]},
  {id:"curso-general2", nombre:"Curso por agregar", creditos:3, anio:1, semestre:2, requisitos:[]},
  {id:"ingles1", nombre:"Curso de inglés por confirmar", creditos:3, anio:1, semestre:2, requisitos:[]},
  {id:"curso-general3", nombre:"Curso por agregar", creditos:3, anio:1, semestre:2, requisitos:[]},
  {id:"bd1", nombre:"Bases de Datos I (por confirmar)", creditos:4, anio:2, semestre:1, requisitos:["ds1"]},
  {id:"estadistica", nombre:"Estadística (por confirmar)", creditos:4, anio:2, semestre:1, requisitos:["calculo1"]},
  {id:"arquitectura", nombre:"Arquitectura de Computadores (por confirmar)", creditos:3, anio:2, semestre:1, requisitos:[]},
  {id:"curso-general4", nombre:"Curso por agregar", creditos:3, anio:2, semestre:1, requisitos:[]},
  {id:"curso-general5", nombre:"Curso por agregar", creditos:3, anio:2, semestre:1, requisitos:[]},
  {id:"bd2", nombre:"Bases de Datos II (por confirmar)", creditos:4, anio:2, semestre:2, requisitos:["bd1"]},
  {id:"analisis", nombre:"Análisis de Sistemas (por confirmar)", creditos:4, anio:2, semestre:2, requisitos:["ds2"]},
  {id:"curso-general6", nombre:"Curso por agregar", creditos:3, anio:2, semestre:2, requisitos:[]},
  {id:"curso-general7", nombre:"Curso por agregar", creditos:3, anio:2, semestre:2, requisitos:[]},
  {id:"curso-general8", nombre:"Curso por agregar", creditos:3, anio:2, semestre:2, requisitos:[]},
  {id:"proyecto1", nombre:"Proyecto / curso por confirmar", creditos:4, anio:3, semestre:1, requisitos:["ds2"]},
  {id:"gestion1", nombre:"Gestión empresarial (por confirmar)", creditos:3, anio:3, semestre:1, requisitos:[]},
  {id:"redes", nombre:"Redes (por confirmar)", creditos:3, anio:3, semestre:1, requisitos:[]},
  {id:"curso-general9", nombre:"Curso por agregar", creditos:3, anio:3, semestre:1, requisitos:[]},
  {id:"curso-general10", nombre:"Curso por agregar", creditos:3, anio:3, semestre:1, requisitos:[]},
  {id:"proyecto2", nombre:"Proyecto / curso por confirmar", creditos:4, anio:3, semestre:2, requisitos:["proyecto1"]},
  {id:"seguridad", nombre:"Seguridad (por confirmar)", creditos:3, anio:3, semestre:2, requisitos:[]},
  {id:"gestion2", nombre:"Gestión empresarial (por confirmar)", creditos:3, anio:3, semestre:2, requisitos:["gestion1"]},
  {id:"curso-general11", nombre:"Curso por agregar", creditos:3, anio:3, semestre:2, requisitos:[]},
  {id:"curso-general12", nombre:"Curso por agregar", creditos:3, anio:3, semestre:2, requisitos:[]},
  {id:"electiva1", nombre:"Electiva por confirmar", creditos:3, anio:4, semestre:1, requisitos:[]},
  {id:"electiva2", nombre:"Electiva por confirmar", creditos:3, anio:4, semestre:1, requisitos:[]},
  {id:"practica", nombre:"Práctica / proyecto final por confirmar", creditos:6, anio:4, semestre:2, requisitos:["proyecto2"]},
  {id:"electiva3", nombre:"Electiva por confirmar", creditos:3, anio:4, semestre:2, requisitos:[]}
];
