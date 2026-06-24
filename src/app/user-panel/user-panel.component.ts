import { Component, inject, ViewEncapsulation } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-user-panel',
  standalone: false,
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent {
  // private readonly auth = inject(AuthService);

  user!: User;

  ngOnInit(): void {
    // this.auth.user().subscribe(user => (this.user = user));
  }
}
