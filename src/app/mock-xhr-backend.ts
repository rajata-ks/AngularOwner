import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
  private menuItems = [
    {
      id: 1,
      restaurantId: 123,
      itemName: 'Tandoori',
      itemDescription: 'Very tasty',
      itemPrice: 24
    },
    {
      id: 2,
      restaurantId: 123,
      itemName: 'Tandoori Chicken',
      itemDescription: 'Very yummyy',
      itemPrice: 12
    }, {
      id: 3,
      restaurantId: 123,
      itemName: 'Maggi masala',
      itemDescription: 'Very bad',
      itemPrice: 2
    }, {
      id: 4,
      restaurantId: 123,
      itemName: 'Biryani',
      itemDescription: 'Very hot',
      itemPrice: 34
    }, {
      id: 5,
      restaurantId: 123,
      itemName: 'Dosa',
      itemDescription: 'Very pale',
      itemPrice: 22
    }
  ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('mediaitems?menu=') >= 0 || request.url === 'menuitems') {
            let menu;
            if (request.urlWithParams.indexOf('?') >= 0) {
              menu = request.urlWithParams.split('=')[1];
              if (menu === 'undefined') { menu = ''; }
            }
            let menuItems;
            let jsonObject = {};
           // menuItems.forEach(item => jsonObject.push(item));  
            if (menu) {
             // menuItems = this.menuItems.filter(i => i.medium === medium);
            } else {
              menuItems = this.menuItems;
            }
            responseOptions = {
              
             // body: {menuItems: JSON.parse(JSON.stringify(menuItems))},
             body: {menuItems: JSON.parse(JSON.stringify(menuItems))},
              status: 200
            };
          } else {
            let menuItems;
            const idToFind = parseInt(request.url.split('/')[1], 10);
            menuItems = this.menuItems.filter(i => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(menuItems[0])),
              status: 200
            };
          }
          break;
        case 'POST':
          const menuItem = request.body;
          menuItem.id = this._getNewId();
          this.menuItems.push(menuItem);
          responseOptions = {status: 201};
          break;
        case 'DELETE':
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      console.log(responseOptions.body);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }

  _deleteMediaItem(id) {
    const mediaItem = this.menuItems.find(i => i.id === id);
    const index = this.menuItems.indexOf(mediaItem);
    if (index >= 0) {
      this.menuItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this.menuItems.length > 0) {
      return Math.max.apply(Math, this.menuItems.map(mediaItem => mediaItem.id)) + 1;
    } else {
      return 1;
    }
  }
}
