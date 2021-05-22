import { Component, OnInit } from '@angular/core';

import { SeoService } from '@shared/services/seo/seo.service';
import { Tag } from '@shared/models/seo.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setCanonicalLink();
    this.setMetaTags();
  }

  setMetaTags(): void {
    const tags: Tag[] = [
      { name: 'title', content: 'Recipes' },
      { name: 'description', content: 'An Angular 12 application with Ngrx Store, Effects, and Router Store that performs CRUD operations for Food Recipes and using Mock API Calls with JSON Server.' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'author', content: 'KShewengger' }
    ];

    tags.forEach(tag => this.seoService.setTag( tag,'addTag'));
  }

}
