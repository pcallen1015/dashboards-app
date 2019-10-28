import { ContentTheme } from '../ui-core/content/content-theme';

export class NavigatableContentContainer {
    private _id: string;
    private _name: string;
    private _slug: string;

    private _description: string;
    private _theme: ContentTheme;
    private _childContainerIds: string[];

    constructor(
        id: string, 
        name: string, 
        slug: string, 
        description: string = 'Description Not Available', 
        theme: ContentTheme = ContentTheme.default,
        childContainerIds: string[] = []) {
        this._id = id;
        this._name = name;
        this._slug = slug;
        this._description = description;
        this._theme = theme;
        this._childContainerIds = childContainerIds;
    }

    public get id(): string { return this._id; }

    public get name(): string { return this._name; }
    public set name(name: string) { this._name = name; }

    public get slug(): string { return this._slug; }
    public set slug(slug: string) { this._slug = slug; }

    public get description(): string { return this._description; }
    public set description(description: string) { this._description = description; }

    public get theme(): ContentTheme { return this._theme; }
    public set theme(theme: ContentTheme) { this._theme = theme; }

    public get childContainerIds(): string[] { return this._childContainerIds; }
}