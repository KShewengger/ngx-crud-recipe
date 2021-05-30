import { Component, OnInit } from '@angular/core';

import { SeoService } from '@shared/services/seo/seo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setDefaultSeoTags();
  }

}
