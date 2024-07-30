import {FactoryConfig} from "./model/FactoryConfig.ts";
import {WorkItem} from "./model/WorkItem.ts";
import {FactoryResult} from "./model/FactoryResult.ts";

const playIteration = async (workField: WorkItem[][], config: FactoryConfig, time: number, statTime: number) => {

    const isAction = statTime >= config.actionTime && statTime < config.actionTime + config.actionLength;
    const actors = isAction ? config.actionActor : config.actor;
    for (let i = actors.length - 1; i >= 0; i--) {
        const moveCnt = Math.min(workField[i * 2].length, actors[i].size - workField[i * 2 + 1].length);
        for (let j = 0; j < moveCnt; j++) {
            const workItem = workField[i * 2].shift()!;
            workItem.actionCountdown = actors[i].time;
            workField[i * 2 + 1].push(workItem);
        }
    }

    {
        const i = actors.length - 1;
        workField[i * 2 + 1].forEach(wi => wi.decActionCountdown());
        while (workField[i * 2 + 1].length > 0 && workField[i * 2 + 1][0].actionCountdown < 1) {
            const workItem = workField[i * 2 + 1].shift()!;
            workItem.endTime = time;
            workField[i * 2 + 2].push(workItem);
        }
    }
    for (let i = actors.length - 2; i >= 0; i--) {
        workField[i * 2 + 1].forEach(wi => wi.decActionCountdown());
        while (workField[i * 2 + 1].length > 0 && workField[i * 2 + 1][0].actionCountdown < 1) {
            workField[i * 2 + 2].push(workField[i * 2 + 1].shift()!);
            if (config.constraintPos === i) {
                workField[0].push(new WorkItem(time));
            }
        }
    }
};

const play = async (config: FactoryConfig) => {

    console.info("Play config for " + config.name);

    const workField = initWorkField(config);

    let time = 0;
    let warmTime = 0;

    // Warm up
    while (warmTime < config.warmTime && time < 1000) {
        time++;
        await playIteration(workField, config, time, 0);
        const readyBuffer = workField[workField.length - 1];
        while (readyBuffer.length > 0 && readyBuffer[0].leadTime < 0) {
            readyBuffer.shift();
        }

        if (readyBuffer.length > 0) {
            warmTime++;
        }
    }
    // Clean ready buffer

    workField[workField.length - 1] = [];

    // Work
    let statTime = 0;
    while (statTime < config.statTime) {
        time++;
        statTime++;
        await playIteration(workField, config, time, statTime);
    }

    const readyBuffer = workField[workField.length - 1];
    const res: FactoryResult = {
        config: config,
        throughput: readyBuffer.length,
        time: statTime,
        leadTimes: {},
        avgLeadTime: 0,
        modeLeadTime: 0
    };

    let leadSum = 0;

    readyBuffer.forEach(wi => {
        if (wi.leadTime in res.leadTimes) {
            res.leadTimes[wi.leadTime]++;
        } else {
            res.leadTimes[wi.leadTime] = 1;
        }
        leadSum += wi.leadTime;
    });

    res.avgLeadTime = leadSum / readyBuffer.length;
    res.modeLeadTime = Number(Object.entries(res.leadTimes)
        .sort((a, b) => a[1] - b[1])
        .map(v => v[0])[0]
    );

    return res;
};

const initWorkField = (config: FactoryConfig): WorkItem[][] => {

    const res: WorkItem[][] = [];

    for (let i = 0; i < config.buffer.length; i++) {
        const buffer: WorkItem[] = [];
        for (let j = 0; j < config.buffer[i]; j++) {
            buffer.push(new WorkItem(-1));
        }
        res.push(buffer);
        res.push([]);
    }
    res.push([]);

    return res;
}

export {FactoryConfig, play};

