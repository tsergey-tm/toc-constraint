import {FactoryConfig} from "./FactoryConfig.ts";

export interface FactoryResult {
    config: FactoryConfig;
    time: number;
    throughput: number;
    leadTimes: { [time: number]: number };
    avgLeadTime: number;
    modeLeadTime: number;
}
