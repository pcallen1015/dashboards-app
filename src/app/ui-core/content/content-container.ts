import { ContentConfigOption } from './content-config-option';
import { Input } from '@angular/core';
import { ContentConfig } from './content-config';
import { ContentType } from './content-type';

export abstract class ContentContainer {
    @Input() config: ContentConfig = new ContentConfig();
    @Input() editing: boolean = false;
    @Input() debugging: boolean = false;

    /**
     * Get the type of content to be displayed in the container.
     */
    public abstract get type(): ContentType;
    
    /**
     * Retrieve the configuration options for the container.
     */
    public abstract get configurationOptions(): ContentConfigOption[];

    /**
     * Reflow the container (i.e.: "redraw" the container, soft-refresh)
     */
    public abstract reflow(): void;

    /**
     * Refresh the container (i.e.: re-initialize the container entirely)
     */
    public abstract refresh(): void;
}