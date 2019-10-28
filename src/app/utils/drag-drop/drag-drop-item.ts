export class DragDropItem {
    private _name: string;
    private _scope: string;
    private _children: DragDropItem[];
    private _childDescription: string;

    private _onAdd: Function;
    private _onDelete: Function;

    constructor(
        name: string, 
        scope: string, 
        children: DragDropItem[] = [], 
        childDescription: string = 'Child',
        onAdd: Function = () => {},
        onDelete: Function = () => {},
    ) {
        this._name = name;
        this._scope = scope;
        this._children = children;
        this._childDescription = childDescription;

        this._onAdd = onAdd;
        this._onDelete = onDelete;
    }

    public get name(): string { return this._name; }
    public get scope(): string { return this._scope; }
    public get allScopes(): string[] {
        let allScopes: string[] = [this._scope];
        this._children.forEach((child: DragDropItem) => {
            child.allScopes.forEach((scope: string) => {
                let index: number = allScopes.indexOf(scope);
                if (index === -1) allScopes.push(scope);
            });
        });
        return allScopes;
    }
    public get children(): DragDropItem[] { return this._children; }
    public get childDescription(): string { return this._childDescription; }

    public addChild(item: DragDropItem): void {
        this._children.push(item);
    }

    public removeChild(item: DragDropItem): void {
        let index: number = this._children.indexOf(item);
        if (index > -1) this._children.splice(index, 1);
    }
}