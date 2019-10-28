import { PresentationSlide } from "./presentation-slide/presentation-slide";

export enum PresentationEvent {
    START = 'START',
    RESTART = 'RESTART',
    NEXT_SLIDE = 'NEXT_SLIDE',
    PREVIOUS_SLIDE = 'PREVIOUS_SLIDE',
    END = 'END'
}

export class Presentation {
    private _title: string;
    private _slides: PresentationSlide[] = [];

    constructor(title: string, slides: PresentationSlide[] = []) {
        this._title = title;
        this._slides = slides;
    }

    public get title(): string { return this._title; }
    public get slides(): PresentationSlide[] { return this._slides; }

    public addSlide(slide: PresentationSlide, index: number = this._slides.length): PresentationSlide[] {
        this._slides.splice(index, 0, slide);
        return this._slides;
    }
}