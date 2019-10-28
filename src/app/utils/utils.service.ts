import { Injectable } from '@angular/core';
import { ContentType } from '../ui-core/content/content-type';

@Injectable()
export class UtilsService {

  constructor() { }

  public slugify(text: string): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  public guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  public widgetIcon(type: ContentType): string {
    switch (type) {
      case ContentType.DATA_TABLE: return 'icon-tables';
      case ContentType.GRAPH: return 'icon-graph';
      // case ContentType.HEATMAP: return '';
      case ContentType.ROADMAP: return 'icon-transit';
      case ContentType.NOTIFICATION: return 'icon-message';
      // case ContentType.DECORATION: return '';
      case ContentType.CONTAINER: return 'icon-default-app';
      default: return 'icon-plugin';
    }
  }

}
