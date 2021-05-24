import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

import { Tag } from '@shared/models';


@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setTag({ name, content }: Tag, action: 'addTag' | 'updateTag'): void {
    this.metaService[action](<any>{ name, content });
  }

  setCanonicalLink(url?: string) {
    const canURL = url == undefined ? this.document.URL : url;
    const link: HTMLLinkElement = this.document.createElement('link');

    link.setAttribute('rel', 'canonical');

    this.document.head.appendChild(link);

    link.setAttribute('href', canURL);
  }

}
