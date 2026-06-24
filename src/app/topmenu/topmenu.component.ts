import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { Menu, MenuService } from '../menu.service';

export interface TopmenuState {
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.scss',
  host: {
    class: 'matero-topmenu',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TopmenuComponent implements OnDestroy {
  private readonly menu = inject(MenuService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  menuList: Menu[] = [];
  menuStates: TopmenuState[] = [];

  private menuSubscription = Subscription.EMPTY;
  private routerSubscription = Subscription.EMPTY;

  constructor() {
    this.menuSubscription = this.menu$.subscribe((res: any) => {
      this.menuList = res;
      this.menuList.forEach(item => {
        this.menuStates.push({
          active: this.router.url.split('/').includes(item.route),
          route: item.route,
        });
      });
    });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
      });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
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
