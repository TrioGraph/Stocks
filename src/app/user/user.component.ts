import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { User } from '../User';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  // private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);

  user!: User;

  ngOnInit(): void {
    // this.auth
    //   .user()
    //   .pipe(
    //     tap(user => (this.user = user)),
    //     debounceTime(10)
    //   )
    //   .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    // this.auth.logout().subscribe(() => {
    //   this.router.navigateByUrl('/auth/login');
    // });
  }

  restore() {
    // this.settings.reset();
    window.location.reload();
  }
}
function inject(ChangeDetectorRef: any) {
  throw new Error('Function not implemented.');
}

function tap(arg0: (user: any) => any): any {
  throw new Error('Function not implemented.');
}

function debounceTime(arg0: number): any {
  throw new Error('Function not implemented.');
}

