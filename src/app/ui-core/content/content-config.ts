export class ContentConfig {
    private _parameters: any;

    constructor(parameters: any = {}) {
        this._parameters = parameters || {};
    }

    public get parameters(): any { return this._parameters; }

    public hasParam(key: string): boolean { return this._parameters.hasOwnProperty(key); }
    public getParam(key: string): any {
        if (!this.hasParam(key)) return null;
        return this._parameters[key];
    }
    public setParam(key: string, value: any): void {
        this._parameters[key] = value;
    }
    
}