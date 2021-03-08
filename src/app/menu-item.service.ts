import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuItemService {
  
  constructor(private http: HttpClient) {}
  
  get(id:Number) {
  
        return this.http.get<MenuItem[]>(`http://127.0.0.1:8080/app/restaurantMenu/${id}`)
      .pipe(
        map((response: MenuItem[]) => {
          return response;
        }),
        catchError(this.handleError)
      );
      
  }

  add(menuItem: MenuItem) {
    ///app/addRestaurantMenuItem/
    menuItem.restaurantId = 1;
    console.log(menuItem);
    return this.http.post('http://127.0.0.1:8080/app/addRestaurantMenuItem', menuItem)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(menuItem: MenuItem) {
    ///app/restaurantMenuItem/:itemId'
    console.log('deleteing id ', menuItem._id);
    return this.http.delete(`http://127.0.0.1:8080/app/restaurantMenuItem/${menuItem._id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }
}

/**
 *     {
        "restaurantId": 1,
        "itemName": "Maggi",
        "itemDescription": "Verry good",
        "itemPrice": 5
    }
 */
export interface MenuItem {
  _id:number;
  restaurantId: number;
  itemName: String;
  itemDescription: String;
  itemPrice: Number;
  menuItemImageUrl:String,
}
