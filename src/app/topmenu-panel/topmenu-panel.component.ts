import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MenuService, MenuChildrenItem } from '../menu.service';
import { TopmenuState } from '../topmenu/topmenu.component';

@Component({
  selector: 'app-topmenu-panel',
  standalone: false,
  templateUrl: './topmenu-panel.component.html',
  styleUrl: './topmenu-panel.component.scss'
})
export class TopmenuPanelComponent {
  private readonly menu = inject(MenuService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild(MatMenu, { static: true }) menuPanel!: MatMenu;

  @Input() items: MenuChildrenItem[] = [];
  @Input() parentRoute: string[] = [];
  @Input() level = 1;
  @Output() routeChange = new EventEmitter<RouterLinkActive>();

  menuStates: TopmenuState[] = [];

  buildRoute = this.menu.buildRoute;

  private routerSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.items.forEach(item => {
      this.menuStates.push({ active: this.checkRoute(item), route: item.route });
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  checkRoute(item: MenuChildrenItem) {
    if (!item.route) {
      return this.checkChildRoute(item.children);
    } else {
      return this.router.url.split('/').includes(item.route);
    }
  }

  checkChildRoute(menuItems: MenuChildrenItem[] = []) {
    return menuItems.some(child => {
      if (this.router.url.split('/').includes(child.route)) {
        return true;
      }
      if (!child.route && child.children) {
        this.checkChildRoute(child.children);
      }
      return false;
    });
  }

  onRouterLinkClick(rla: RouterLinkActive) {
    this.routeChange.emit(rla);
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routeChange.emit(rla);

    this.routerSubscription.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
        setTimeout(() => {
          this.menuStates[index].active = rla.isActive;
          this.cdr.markForCheck();
        });
      });
  }
}
