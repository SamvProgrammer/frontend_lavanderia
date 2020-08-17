import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoService implements CanActivate{

  constructor(public UsuariosService:LoginService,public router: Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(this.UsuariosService.mostrarMenu()){
      return true;
    }else {
      this.router.navigate(['/ingresar']
      /*, {
        queryParams: {
          return: state.url
        }}*/
        );
      return false;
    }
  }
}
