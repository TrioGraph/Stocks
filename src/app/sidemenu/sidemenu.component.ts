import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, Input } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-sidemenu',
  standalone: false,
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ],
})
export class SidemenuComponent {
  @Input() ripple = false;

  private readonly menu = inject(MenuService);

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;
}

