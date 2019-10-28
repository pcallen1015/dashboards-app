import { ContentTheme } from '../ui-core/content/content-theme';
import { WidgetConfig } from '../widgets/widget-config';
import { NavigatableContentContainer } from "../app-routing/navigatable-content-container";

export class View extends NavigatableContentContainer {

    /**
     * View Configuration Options
     */

    // Whether the View is editable
    private _editable: boolean;

    // How many "lanes" the View will have for its Widget Grid (default: 6)
    private _columns: number;

    /**
     * Widgets
     */

    // The Widgets to display on the View
    private _widgetConfigs: WidgetConfig[] = [];

    constructor(data: any = {}) {
        super(
            data.viewId,
            data.name,
            data.slug,
            data.description,
            data.theme || ContentTheme.default
        );

        this._editable = data.editable || false;
        this._columns = data.columns || 6;

        if (data.widgetConfigs) this._widgetConfigs = data.widgetConfigs.map((data: any) => new WidgetConfig(data));
    }

    public get viewId(): string { return this.id; }

    public get editable(): boolean { return this._editable; }
    
    public get columns(): number { return this._columns; }
    public set columns(columns: number) { this._columns = columns; }

    public get widgetConfigs(): WidgetConfig[] { return this._widgetConfigs; }

    /**
     * Add a new Widget to the View
     * @param config The Widget (Config) to add to the View
     */
    public addWidget(config: WidgetConfig): void { this._widgetConfigs.push(config); }

    /**
     * Get a "payload" (i.e.: savable) version of the View
     */
    public get payload(): any {
        return {
            viewId: this.viewId,
            name: this.name,
            slug: this.slug,
            description: this.description,
            theme: this.theme.toString(),
            editable: this.editable,
            columns: this.columns,
            widgetConfigs: this.widgetConfigs.map((config: WidgetConfig) => config.payload)
        };
    }
    
}