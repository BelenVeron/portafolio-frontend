import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  textLogo: string = "Argentina Programa - #YoProgramo";
  isLogged = false;
  isAdmin = false;
  // if do not want to show edit buttons
  @Input() noButton = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
  }

  onLogOut(): void {
    this.tokenService.logout();
  }

}
