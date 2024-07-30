import {FactoryConfig} from "../factory";
import {Actor} from "../factory/model/FactoryConfig.ts";

export const FactoryConfigMaker = () => {

    const makeBBRConfig = () => new FactoryConfig(
        "Барабан-буфер-канат",
        true,
        [4, 4, 12, 4, 4],
        [new Actor(6, 2), new Actor(6, 2), new Actor(4, 2), new Actor(6, 2), new Actor(6, 2)],
        [new Actor(6, 2), new Actor(6, 2), new Actor(4, 2), new Actor(6, 2), new Actor(6, 2)],
        10,
        30,
        -1,
        -1,
        0,
        2
    );

    const makeTemporaryAddConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(Math.ceil(action[pos].size * 1.5), action[pos].time);
        return new FactoryConfig(name, true, bbk.buffer, bbk.actor, action, bbk.warmTime, bbk.statTime, pos, 2, 4, bbk.constraintPos);
    };

    const makeTemporarySubConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(Math.ceil(action[pos].size * 0.5), action[pos].time);
        return new FactoryConfig(name, false, bbk.buffer, bbk.actor, action, bbk.warmTime, bbk.statTime, pos, 2, 4, bbk.constraintPos);
    };

    const makeTemporaryFastConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(action[pos].size, 1);
        return new FactoryConfig(name, true, bbk.buffer, bbk.actor, action, bbk.warmTime, bbk.statTime, pos, 2, 4, bbk.constraintPos);
    };

    const makeTemporarySlowConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(action[pos].size, 3);
        return new FactoryConfig(name, false, bbk.buffer, bbk.actor, action, bbk.warmTime, bbk.statTime, pos, 2, 4, bbk.constraintPos);
    };

    const makePermanentAddConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(Math.ceil(action[pos].size + 1), action[pos].time);
        return new FactoryConfig(name, true, bbk.buffer, action, action, bbk.warmTime, bbk.statTime, pos, -1, 0, bbk.constraintPos);
    };

    const makePermanentSubConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(Math.ceil(action[pos].size - 1), action[pos].time);
        return new FactoryConfig(name, false, bbk.buffer, action, action, bbk.warmTime, bbk.statTime, pos, -1, 0, bbk.constraintPos);
    };

    const makePermanentFastConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(action[pos].size, 1);
        return new FactoryConfig(name, true, bbk.buffer, action, action, bbk.warmTime, bbk.statTime, pos, -1, 0, bbk.constraintPos);
    };

    const makePermanentSlowConfig = (bbk: FactoryConfig, name: string, pos: number) => {
        const action = [...bbk.actor];
        action[pos] = new Actor(action[pos].size, 3);
        return new FactoryConfig(name, false, bbk.buffer, action, action, bbk.warmTime, bbk.statTime, pos, -1, 0, bbk.constraintPos);
    };

    const bbk = makeBBRConfig();
    return [bbk,
        makeTemporaryAddConfig(bbk, "Временное улучшение в ограничении", 2),
        makeTemporaryFastConfig(bbk, "Временное ускорение в ограничении", 2),
        makeTemporarySubConfig(bbk, "Временное ухудшение в ограничении", 2),
        makeTemporarySlowConfig(bbk, "Временное замедление в ограничении", 2),
        makePermanentAddConfig(bbk, "Постоянное улучшение в ограничении", 2),
        makePermanentFastConfig(bbk, "Постоянное ускорение в ограничении", 2),
        makePermanentSubConfig(bbk, "Постоянное ухудшение в ограничении", 2),
        makePermanentSlowConfig(bbk, "Постоянное замедление в ограничении", 2),

        makeTemporaryAddConfig(bbk, "Временное улучшение в избыточном 1", 0),
        makeTemporaryFastConfig(bbk, "Временное ускорение в избыточном 1", 0),
        makeTemporarySubConfig(bbk, "Временное ухудшение в избыточном 1", 0),
        makeTemporarySlowConfig(bbk, "Временное замедление в избыточном 1", 0),
        makePermanentAddConfig(bbk, "Постоянное улучшение в избыточном 1", 0),
        makePermanentFastConfig(bbk, "Постоянное ускорение в избыточном 1", 0),
        makePermanentSubConfig(bbk, "Постоянное ухудшение в избыточном 1", 0),
        makePermanentSlowConfig(bbk, "Постоянное замедление в избыточном 1", 0),

        makeTemporaryAddConfig(bbk, "Временное улучшение в избыточном 2", 1),
        makeTemporaryFastConfig(bbk, "Временное ускорение в избыточном 2", 1),
        makeTemporarySubConfig(bbk, "Временное ухудшение в избыточном 2", 1),
        makeTemporarySlowConfig(bbk, "Временное замедление в избыточном 2", 1),
        makePermanentAddConfig(bbk, "Постоянное улучшение в избыточном 2", 1),
        makePermanentFastConfig(bbk, "Постоянное ускорение в избыточном 2", 1),
        makePermanentSubConfig(bbk, "Постоянное ухудшение в избыточном 2", 1),
        makePermanentSlowConfig(bbk, "Постоянное замедление в избыточном 2", 1),

        makeTemporaryAddConfig(bbk, "Временное улучшение в избыточном 3", 3),
        makeTemporaryFastConfig(bbk, "Временное ускорение в избыточном 3", 3),
        makeTemporarySubConfig(bbk, "Временное ухудшение в избыточном 3", 3),
        makeTemporarySlowConfig(bbk, "Временное замедление в избыточном 3", 3),
        makePermanentAddConfig(bbk, "Постоянное улучшение в избыточном 3", 3),
        makePermanentFastConfig(bbk, "Постоянное ускорение в избыточном 3", 3),
        makePermanentSubConfig(bbk, "Постоянное ухудшение в избыточном 3", 3),
        makePermanentSlowConfig(bbk, "Постоянное замедление в избыточном 3", 3),

        makeTemporaryAddConfig(bbk, "Временное улучшение в избыточном 4", 4),
        makeTemporaryFastConfig(bbk, "Временное ускорение в избыточном 4", 4),
        makeTemporarySubConfig(bbk, "Временное ухудшение в избыточном 4", 4),
        makeTemporarySlowConfig(bbk, "Временное замедление в избыточном 4", 4),
        makePermanentAddConfig(bbk, "Постоянное улучшение в избыточном 4", 4),
        makePermanentFastConfig(bbk, "Постоянное ускорение в избыточном 4", 4),
        makePermanentSubConfig(bbk, "Постоянное ухудшение в избыточном 4", 4),
        makePermanentSlowConfig(bbk, "Постоянное замедление в избыточном 4", 4)
    ];
}
