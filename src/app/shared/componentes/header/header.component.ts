import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  router = inject(Router);

  constructor() { }

  ngOnInit() {}
  back() {
    this.router.navigate(['/']);
  }
}

