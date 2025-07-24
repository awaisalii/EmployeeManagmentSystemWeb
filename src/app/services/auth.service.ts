import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../shared/employee.service';
import { jwtDecode } from 'jwt-decode';

export interface IUser {
  email: string;
  name?: string;
  avatarUrl?: string;
  imagepath?:string;
}
export interface IUser1 {
  id?:string;
  email: string;
  name?: string;
  avatarUrl?: string;
  Role:string;
}

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

const defaultPath = '/';
export const defaultUser: IUser = {
  email: 'jheart@dx-email.com',
  name: 'John Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
};

@Injectable()
export class AuthService {
  url=environment.baseUrl;
  private _lastAuthenticatedPath: string = defaultPath;
  public _user: IUser1 | null ;
  constructor(private router: Router , private employeeService:EmployeeService ) {
    this.checkToken();
  }

  private checkToken(): void {
    debugger

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const expiration=decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (expiration < currentTime) {
        // this.logOut();
      }
      this._user = {
        id: decoded.Id,
        email: decoded.Email,
        name: decoded.UserName,
        avatarUrl: decoded.imagePath,
        Role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
      this.employeeService.getEmployeebyId(this._user.id).subscribe(
        response => {
          this._user.id=response.id,
          this._user.email=response.email,
          this._user.name=response.firstName +" "+response.lastName,
          this._user.avatarUrl=response.imagePath
        },
        error => {
          console.error('Error fetching employee data:', error);
          // this.logOut();
        }
      );
    } else {
      // this.logOut();
    }
  }


  get loggedIn(): boolean {
    return !!this._user;
  }
  logout():void{
    this._user=null;
    localStorage.removeItem('token');
  }




  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  async logIn(email: string, password: string) {
    try {

      this.employeeService.Login(email, password).subscribe(
        response => {
          try {
            this._user = {
              id:response.id,
              email: response.email,
              name: response.userName,
              avatarUrl: response.imagePath,
              Role:''
            };
            localStorage.setItem("token", response.token);
            this.router.navigate(["dashboard"]);
          } catch (error) {
            console.error('Error during login processing:', error);
          }
        },
        error => {
          console.error('Login failed:', error);
        }
      );


      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        message: 'Authentication failed',
      };
    }
  }

  async getUser() {
    try {
      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      this.router.navigate(['/auth/create-account']);
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('token');
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }
    return isLoggedIn || isAuthForm;
  }
}

// if(this.authGService.isAuthenticated){
//   this.authGService.router.navigateByUrl("auth");
//   return false;
// }
