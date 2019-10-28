import { ContentConfig } from '../../content/content-config';

export class PresentationSlide {
    private _title: string;
    private _contentConfig: ContentConfig;

    constructor(title: string, contentConfig: ContentConfig) {
        this._title = title;

        // COPY the incoming ContentConfig to prevent changes to the original
        this._contentConfig = new ContentConfig(JSON.parse(JSON.stringify(contentConfig.parameters)));
    }

    public get title(): string { return this._title; }
    public get contentConfig(): ContentConfig { return this._contentConfig; }
}