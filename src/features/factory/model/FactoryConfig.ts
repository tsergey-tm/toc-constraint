export class FactoryConfig {

    private readonly _name: string;
    private readonly _good: boolean;
    private readonly _buffer: number[];
    private readonly _actor: Actor[];
    private readonly _actionActor: Actor[];
    private readonly _warmTime: number;
    private readonly _statTime: number;
    private readonly _actionPos: number;
    private readonly _actionTime: number;
    private readonly _actionLength: number;
    private readonly _constraintPos: number;

    constructor(
        name: string,
        good: boolean,
        buffer: number[],
        actor: Actor[],
        actionActor: Actor[],
        warmTime: number,
        statTime: number,
        actionPos: number,
        actionTime: number,
        actionLength: number,
        constraintPos: number
    ) {
        this._name = name;
        this._good = good;
        this._buffer = buffer;
        this._actor = actor;
        this._actionActor = actionActor;
        this._warmTime = warmTime;
        this._statTime = statTime;
        this._actionPos = actionPos;
        this._actionTime = actionTime;
        this._actionLength = actionLength;
        this._constraintPos = constraintPos;
    }

    get name(): string {
        return this._name;
    }

    get isGood(): boolean {
        return this._good;
    }

    get buffer(): number[] {
        return this._buffer;
    }

    get actor(): Actor[] {
        return this._actor;
    }

    get actionActor(): Actor[] {
        return this._actionActor;
    }

    get warmTime(): number {
        return this._warmTime;
    }

    get actionPos(): number {
        return this._actionPos;
    }

    get actionTime(): number {
        return this._actionTime;
    }

    get constraintPos(): number {
        return this._constraintPos;
    }

    get statTime(): number {
        return this._statTime;
    }

    get actionLength(): number {
        return this._actionLength;
    }
}

export class Actor {
    private readonly _size: number;
    private readonly _time: number;

    constructor(size: number, time: number) {
        this._size = size;
        this._time = time;
    }

    get size(): number {
        return this._size;
    }

    get time(): number {
        return this._time;
    }

    equals(other: Actor) {
        return this.size === other.size && this.time === other.time;
    }
}