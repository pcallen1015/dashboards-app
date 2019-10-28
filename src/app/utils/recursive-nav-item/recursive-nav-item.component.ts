import { Component, Input } from '@angular/core';
import { NavItem } from '../../ui-core/utils/recursive-dropdown-menu/nav-item.interface';

@Component({
  selector: '[util-recursive-nav-item]',
  templateUrl: './recursive-nav-item.component.html',
  styleUrls: ['./recursive-nav-item.component.scss']
})
export class RecursiveNavItemComponent {
  @Input() item: NavItem;
  private _collapsed: boolean = true;
  public get collapsed(): boolean { return this._collapsed; }

  public hasChildren(): boolean {
    return this.item.children && this.item.children.length > 0;
  }
  
  public get classes(): any {
    return {
      'sidebar__drawer': this.hasChildren(),
      'sidebar__item': !this.hasChildren(),
      'sidebar__drawer--opened': (this.hasChildren() && !this.collapsed),
      'sidebar__drawer--closed': !(this.hasChildren() && !this.collapsed)
    };
  }

  public performAction(): void {
    if (this.item.action) this.item.action();
    if (this.hasChildren()) this._collapsed = !this.collapsed;
  }
}
