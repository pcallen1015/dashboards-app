import { Output, EventEmitter } from "@angular/core";

export abstract class StarwarsInfoComponent {
    @Output() onReady: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onError: EventEmitter<Error> = new EventEmitter<Error>();

    public abstract reflow(): void;
    public abstract refresh(): void;
}
