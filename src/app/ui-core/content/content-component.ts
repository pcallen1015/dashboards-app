import { ContentTheme } from './content-theme';
import { ContentContainer } from './content-container';
import { ContentConfig } from './content-config';
import { SimpleChanges, OnChanges } from '@angular/core';

export abstract class ContentComponent extends ContentContainer implements OnChanges {

    private syncContentComponentId(): void {
        this.config = this.config || new ContentConfig();
        this.config.setParam('contentComponentId', this.componentId);
    }

    constructor() {
        super();
        this.syncContentComponentId();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('config')) this.syncContentComponentId();
    }

    public get class(): any { return this.constructor; }
    public get componentName(): string { return this.class.name; }
    public get componentId(): string { return this.componentName; }

    public abstract get name(): string;
    public abstract get description(): string;
    public abstract get theme(): ContentTheme;
}
