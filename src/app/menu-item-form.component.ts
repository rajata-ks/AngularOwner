import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemService } from './menu-item.service';

@Component({
  selector: 'mw-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.css']
})
export class MenuItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menuItemService: MenuItemService,
    private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      itemName: this.formBuilder.control(''),
      itemDescription: this.formBuilder.control(''),
      itemPrice: this.formBuilder.control(''),
      menuItemImageUrl: this.formBuilder.control(''),
    });
  }

  onSubmit(menuItem) {
    console.log(menuItem);
    this.menuItemService.add(menuItem)
      .subscribe(() => {
        this.router.navigate(['/', 'all']);
      });
  }
}
