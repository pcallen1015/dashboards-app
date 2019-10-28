import { ContentConfig } from '../ui-core/content/content-config';

/**
 * WidgetConfig is a specific type of ContentConfig that
 * stores additional information related to the Widget's
 * position on a View and the configuration of the Widget
 * "wrapper" (i.e.: header, footer).
 * 
 * Q: Why does WidgetConfig EXTEND ContentConfig instead of
 * a ContentConfig being embedded WITHIN a WidgetConfig?
 * 
 * A: This was done so that we can leverage the same configuration
 * tools to configure BOTH Widgets AND individual ContentComponents.
 */
export class WidgetConfig extends ContentConfig {
    // Position/Sizing
    private _x: number;
    private _y: number;
    private _h: number;
    private _w: number;

    // Header Options
    private _showHeader: boolean;
    private _title: string;

    // Footer Options
    private _showFooter: boolean;

    constructor(data: any = {}) {
        super(data.contentConfig);
        this._x = data.x || 0;
        this._y = data.y || 0;
        this._h = data.h || 1;
        this._w = data.w || 1;

        this._showHeader = data.showHeader || false;
        this._title = data.title || null;
        this._showFooter = data.showFooter || false;
    }

    public get x(): number { return this._x; }
    public set x(x: number) { this._x = x; }

    public get y(): number { return this._y; }
    public set y(y: number) { this._y = y; }

    public get h(): number { return this._h; }
    public set h(h: number) { this._h = h; }

    public get w(): number { return this._w; }
    public set w(w: number) { this._w = w; }

    public get showHeader(): boolean { return this._showHeader; }
    
    public get title(): string { return this._title; }

    public get showFooter(): boolean { return this._showFooter; }

    public hasParam(key: string) {
        if (['showHeader', 'title', 'showFooter'].indexOf(key) > -1) return true;
        return super.hasParam(key);
    }

    public getParam(key: string) {
        if (key === 'showHeader') return this.showHeader;
        if (key === 'title') return this.title;
        if (key === 'showFooter') return this.showFooter;

        return super.getParam(key);
    }

    public setParam(key: string, value: any) {
        if (key === 'showHeader') return this._showHeader = <boolean>value;
        if (key === 'title') return this._title = <string>value;
        if (key === 'showFooter') return this._showFooter = <boolean>value;

        return super.setParam(key, value);
    }

    public get contentConfig(): ContentConfig { return new ContentConfig(this.parameters); }

    public get payload(): any {
        return {
            x: this.x,
            y: this.y,
            h: this.h,
            w: this.w,
            showHeader: this.showHeader,
            title: this.title,
            showFooter: this.showFooter,
            contentConfig: this.contentConfig.parameters
        };
    }
}