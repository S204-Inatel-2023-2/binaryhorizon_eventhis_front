import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  
  @Input() componentType: 'search-bar' | 'logo' | 'just-text' = 'logo';
  @Input() isBackButton: 'true' | 'false' = 'false';

  constructor() { }

  ngOnInit() {}

}
