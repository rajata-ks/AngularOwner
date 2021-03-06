import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input() menuItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.menuItem);
  }
}
