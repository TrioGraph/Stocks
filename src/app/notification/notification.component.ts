import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  messages = ['Server Error Reports 1', 'Server Error Reports 2', 'Server Error Reports 3'];
}
