import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavItem } from './nav-item.interface';

@Component({
  selector: 'util-recursive-dropdown-menu',
  templateUrl: './recursive-dropdown-menu.component.html',
  styleUrls: ['./recursive-dropdown-menu.component.scss']
})
export class RecursiveDropdownMenuComponent {
  @Input() items: NavItem[];
  @ViewChild('childMenu') public childMenu;
}
