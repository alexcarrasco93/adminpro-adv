import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  links!: NodeListOf<Element>;
  constructor(private settingService: SettingsService) {}

  ngOnInit() {
    this.links = document.querySelectorAll('.selector');
    this.settingService.checkCurrentTheme(
      document.querySelectorAll('.selector')
    );
  }

  changeTheme(theme: string) {
    this.settingService.changeTheme(theme, this.links);
  }
}
