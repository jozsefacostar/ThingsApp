import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  setDismissResponse(data: any){
    localStorage.setItem("dismiss", JSON.stringify(data))
  }
  getDismissResponse(){
    return JSON.parse(localStorage.getItem("dismiss")!)
  }
  alert(text: string, type: SweetAlertIcon = "success", title?: string,){
    Swal.fire(title,text,type)
  }
  alertSingle(text: string){
    Swal.fire(text)
  }
}
