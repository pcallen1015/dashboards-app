import { ContentTheme } from '../ui-core/content/content-theme';
import { NavigatableContentContainer } from '../app-routing/navigatable-content-container';

export class Workspace extends NavigatableContentContainer{

    constructor(data?: any) {
        super(
            (data && data.workspaceId) || 'WORKSPACE_ID',
            (data && data.name) || 'WORKSPACE_NAME',
            (data && data.slug) || 'WORKSPACE_SLUG',
            (data && data.description) || 'Description Not Available',
            (data && data.theme) || ContentTheme.default,
            (data && data.moduleIds) || []
        );
    }

    public get workspaceId(): string { return this.id; }
    public get moduleIds(): string[] { return this.childContainerIds; }

    public get payload(): any {
        return {
            workspaceId: this.id,
            name: this.name,
            slug: this.slug,
            description: this.description,
            theme: this.theme,
            moduleIds: this.moduleIds
        };
    }
}