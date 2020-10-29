//const ip: string = "http://localhost:8080";
const ip:string = "https://lavamax.herokuapp.com";
export const direcciones: any = {
    "usuarios": ip + "/api/usuarios",
    "login": ip + "/api/ingresar",
    "sucursales": `${ip}/api/sucursales`,
    "umedidas": `${ip}/api/umedidas`,
    "proveedores": `${ip}/api/proveedores`,
    "categorias": `${ip}/api/clasificacion`,
    "productos": `${ip}/api/productos`,
    "clientes": `${ip}/api/clientes`,
    "detalle-fichas": `${ip}/api/detalle-fichas`,   
    "roles":`${ip}/api/roles`,
    "fichas": `${ip}/api/serviciodetalles`,
    "ventas":`${ip}/api/servicios/ventas`,
    "inventario":`${ip}/api/inventario`,
    "reportes":`${ip}/reportes`,
    "serviciosdetalles":`${ip}/api/servicio_detalles`


}