import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItemService, MenuItem } from './menu-item.service';

@Component({
  selector: 'mw-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})
export class MenuItemListComponent implements OnInit {
  menu = '';
  menuItems: MenuItem[];

  constructor(
    private menuItemService: MenuItemService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(paramMap => {
        let menu = paramMap.get('menu');
        if (menu.toLowerCase() === 'all') {
          menu = '';
        }
        this.getMenuItems();
      });
  }

  onMenuItemDelete(menuItem: MenuItem) {
    this.menuItemService.delete(menuItem)
      .subscribe(() => {
        this.getMenuItems();
      });
  }

  // getMenuItems(menu: string) {
  //   this.menu = menu;
  //   this.menuItemService.get(menu)
  //     .subscribe(menuItems => {
  //       console.log(menuItems);
  //       //this.menuItems = menuItems;
  //     });
  // }

  getMenuItems() {
    //searchResult: MenuItem[];
    this.menuItemService.get(1) //model._id;
      .subscribe(menuItems => {
        console.log(JSON.parse(JSON.stringify(menuItems)));
        //JSON.parse(JSON.stringify(menuItems))
        this.menuItems = JSON.parse(JSON.stringify(menuItems));
      });
  }
}
