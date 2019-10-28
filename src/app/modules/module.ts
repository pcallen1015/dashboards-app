import { ContentTheme } from '../ui-core/content/content-theme';
import { NavigatableContentContainer } from "../app-routing/navigatable-content-container";

export class Module extends NavigatableContentContainer {

    constructor(data?: any) {
        super(
            (data && data.moduleId) || 'MODULE_ID',
            (data && data.name) || 'MODULE_NAME',
            (data && data.slug) || 'MODULE_SLUG',
            (data && data.description) || 'Description Not Available',
            (data && data.theme) || ContentTheme.default,
            (data && data.viewIds) || []
        );
    }

    public get moduleId(): string { return this.id; }
    public get viewIds(): string[] { return this.childContainerIds; }
}