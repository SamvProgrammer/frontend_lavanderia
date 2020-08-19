const ip:string = "http://localhost:8080";
//const ip:string = "https://lavamax.herokuapp.com";
export const direcciones:any = {
   "usuarios": ip+"/api/usuarios",
   "login":ip+"/api/ingresar",
   "sucursales":`${ip}/api/sucursales`,
   "umedidas":`${ip}/api/umedidas`,
   "proveedores":`${ip}/api/proveedores`,
<<<<<<< HEAD
<<<<<<< HEAD
   "clientes":`${ip}/api/clientes`

   
=======
   "categorias":`${ip}/api/clasificacion`,
   "productos":`${ip}/api/productos`
>>>>>>> 95de3415ece1c07e94c729cf11394cca43ff5441
=======
   "categorias":`${ip}/api/clasificacion`,
   "productos":`${ip}/api/productos`,
   "clientes":`${ip}/api/clientes`

   
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b
}