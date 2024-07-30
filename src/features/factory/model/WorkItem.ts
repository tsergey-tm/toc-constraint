export class WorkItem {

    private readonly _startTime: number;
    private _endTime: number = 0;
    private _actionCountdown: number = 0;

    constructor(startTime: number) {
        this._startTime = startTime;
    }

    set endTime(endTime: number) {
        this._endTime = endTime;
    }

    set actionCountdown(value: number) {
        this._actionCountdown = value;
    }

    get leadTime() {
        return (this._startTime < 0) ? -1 : this._endTime - this._startTime;
    }

    get actionCountdown() {
        return this._actionCountdown;
    }

    public decActionCountdown(): number {
        this._actionCountdown--;
        return this._actionCountdown;
    }
}