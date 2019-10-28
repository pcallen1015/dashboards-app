import { ContentTheme } from './ui-core/content/content-theme';

export class Application {
    private _applicationId: string;
    private _name: string;
    private _description: string;
    private _theme: ContentTheme;

    private _workspaceIds: string[];

    constructor(data?: any) {
        this._applicationId = (data && data.applicationId) || 'APPLICATION_ID';
        this._name = (data && data.name) || 'APPLICATION_NAME';
        this._description = (data && data.description) || 'APPLICATION_DESCRIPTION';
        this._theme = (data && data.theme) || ContentTheme.default;
        
        this._workspaceIds = (data && data.workspaceIds) || [];
    }

    public get applicationId(): string { return this._applicationId; }
    public get name(): string { return this._name; }
    public get description(): string { return this._description; }
    public get theme(): string { return this._theme; }

    public get workspaceIds(): string[] { return this._workspaceIds; }

    public toString() {
        return 'id: ' + this._applicationId + '\n' + 'name: ' + this._name + '\n' + 'modules: ' + this._workspaceIds.toString();
    }

    public about() {
        console.debug(this);
        alert(this.toString());
    }
}