import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

import { Tag, TagAction } from '@core/models';


@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  setDefaultSeoTags(): void {
    const tags: Tag[] = [
      { name: 'title', content: 'Recipes' },
      { name: 'description', content: 'An Angular 12 application with Ngrx Store, Effects, and Router Store that performs CRUD operations for Food Recipes and using Mock API Calls with JSON Server.' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'author', content: 'KShewengger' }
    ];

    this.setSeoTags('Recipes', tags, 'addTag');
  }

  setSeoTags(title: string, tags: Tag[], action: TagAction): void {
    this.titleService.setTitle(title);
    this.setCanonicalLink();

    tags
      .forEach(({ name, content }) =>
        this.metaService[action](<any>{ name, content })
      );
  }

  setCanonicalLink(url?: string) {
    const canURL = url == undefined ? this.document.URL : url;
    const link: HTMLLinkElement = this.document.createElement('link');

    link.setAttribute('rel', 'canonical');

    this.document.head.appendChild(link);

    link.setAttribute('href', canURL);
  }

}
