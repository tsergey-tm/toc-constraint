import './App.css'
import {FactoryConfig, play} from "./features/factory";
import {useEffect, useState} from "react";
import {FactoryConfigMaker} from "./features/config";
import {FactoryResult} from "./features/factory/model/FactoryResult.ts";

interface TableResult {
    table: FactoryResult[];
}

const App = () => {

    const [tableResult, setTableResult] = useState<TableResult>({table: []});

    const factoryConfigs = FactoryConfigMaker();

    const addTableResult = async (factoryConfig: FactoryConfig) => {
        const res = structuredClone(tableResult);
        res.table.push(await play(factoryConfig));
        setTableResult(res);
    };

    async function processNextPlay() {
        if (factoryConfigs.length > tableResult.table.length) {
            await addTableResult(factoryConfigs[tableResult.table.length]);
        }
    }

    useEffect(() => {
        processNextPlay().then();
    }, [tableResult]);

    const getThroughputInfo = (factoryResultIndex: number) => {
        const factoryResult = tableResult.table[factoryResultIndex];
        const firstResult = tableResult.table[0];
        let style: string;
        if (factoryResult.throughput === firstResult.throughput) {
            style = "";
        } else if (factoryResult.throughput > firstResult.throughput) {
            style = "DiffGood";
        } else {
            style = "DiffBad";
        }
        return <td className={style}>
            {factoryResult.throughput} за {factoryResult.time} дней
        </td>;
    };

    const getThroughputAvgInfo = (factoryResultIndex: number) => {
        const factoryResult = tableResult.table[factoryResultIndex];
        const firstResult = tableResult.table[0];
        let style: string;
        if (factoryResult.throughput === firstResult.throughput) {
            style = "";
        } else if (factoryResult.throughput > firstResult.throughput) {
            style = "DiffGood";
        } else {
            style = "DiffBad";
        }
        return <td className={style}>
            {(factoryResult.throughput / factoryResult.time).toFixed(1)} за день
        </td>;
    };

    const getLeadTimeAvgInfo = (factoryResultIndex: number) => {
        const factoryResult = tableResult.table[factoryResultIndex];
        const firstResult = tableResult.table[0];
        let style: string;
        if (Math.abs(factoryResult.avgLeadTime - firstResult.avgLeadTime) < 0.0001) {
            style = "";
        } else if (factoryResult.avgLeadTime < firstResult.avgLeadTime) {
            style = "DiffGood";
        } else {
            style = "DiffBad";
        }
        return <td className={style}>
            {factoryResult.avgLeadTime.toFixed(2)} дней/шт
        </td>;
    };

    const getLeadTimeInfo = (factoryResultIndex: number, days: number) => {
        const factoryResult = tableResult.table[factoryResultIndex];
        const firstResult = tableResult.table[0];
        let style: string;
        if (!(days in factoryResult.leadTimes)) {
            style = "";
        } else if (firstResult.modeLeadTime === days) {
            style = "DiffEqual";
        } else if (firstResult.modeLeadTime > days) {
            style = "DiffGood";
        } else {
            style = "DiffBad";
        }
        if (days in factoryResult.leadTimes) {
            return <td className={style}>
                {factoryResult.leadTimes[days]}
            </td>;
        } else {
            return <td className={style}>&nbsp;</td>;
        }
    };

    const getActionInfo = (factoryConfig: FactoryConfig, index: number) => {

        const style = (factoryConfig.actionPos === index) ? (factoryConfig.isGood ? "DiffGood" : "DiffBad") : "";

        if (factoryConfig.actionTime < 0 || factoryConfig.actionPos !== index) {
            return <td className={style}>
                {factoryConfig.actor[index].size} за {factoryConfig.actor[index].time} д.
            </td>
        } else {
            return <td className={style}>
                {factoryConfig.actor[index].size} за {factoryConfig.actor[index].time} д.<br/>
                и на {factoryConfig.actionLength} д.
                по {factoryConfig.actionActor[index].size} за {factoryConfig.actionActor[index].time} д.<br/>
            </td>
        }
    };

    return (
        <>
            <div className="Help">
                <p>Часто возникает вопрос: так ли важно ограничение?<br/>
                    Вот сделали мы систему барабан-буфер-канат.
                    А почему теперь внимание должно быть сосредоточено на ограничении?<br/>
                    Почему улучшения в избыточном ресурсе не дают выигрыша?</p>
                <p>Этот симулятор покажет как изменения в разных узлах влияют на конечный результат.</p>
                <p>Представьте производственную линию из пяти узлов, в котором третий узел - ресурс с меньшей мощностью.<br/>
                    Каждый из узлов берёт детали из склада до него, что-то делает с ними и отдаёт в склад после
                    него.<br/>
                    Мощность каждого узла выражена в числе единиц товара, которые он может параллельно обрабатывать и
                    время обработки каждой единицы товара.<br/>
                    Т.е. запись <strong>6 за 2 д.</strong> означает, что узел параллельно обрабатывает 6 деталей и
                    каждую он делает 2 дня.
                </p>
                <p>Сравнивать мы будем два параметра:
                    <ul>
                        <li>Пропускную способность - сколько единиц товара линия выпускает за отчётный период</li>
                        <li>Время производства - сколько дней делась каждая деталь
                            <ul>
                                <li>среднее время на все детали</li>
                                <li>гистограмма времени производства - число деталей изготовленных за указанное в
                                    столбце
                                    дней
                                </li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <p>Изменять мы будем следующим образом:
                    <ul>
                        <li>Временное изменение - на несколько дней вводятся изменения
                            <ul>
                                <li>улучшение - в полтора раза больше деталей обрабатывается параллельно</li>
                                <li>ускорение - в два раза быстрее обрабатывается каждая деталь</li>
                                <li>ухудшение - в два раза меньше деталей обрабатывается параллельно</li>
                                <li>улучшение - в полтора раза дольше обрабатывается каждая деталь</li>
                            </ul>
                        </li>
                        <li>Постоянное изменение
                            <ul>
                                <li>улучшение - на одну деталь больше обрабатывается параллельно</li>
                                <li>ускорение - на один день быстрее обрабатывается каждая деталь</li>
                                <li>ухудшение - на одну деталь меньше обрабатывается параллельно</li>
                                <li>улучшение - на один день дольше обрабатывается каждая деталь</li>
                            </ul>
                        </li>
                    </ul>
                </p>
            </div>
            <table className="ResultTable">
                <thead>
                <tr>
                    <th rowSpan={2}>Описание</th>
                    <th rowSpan={2}>Склад 1</th>
                    <th rowSpan={2}>Изб. 1</th>
                    <th rowSpan={2}>Склад 2</th>
                    <th rowSpan={2}>Изб. 2</th>
                    <th rowSpan={2}>Буфер</th>
                    <th rowSpan={2}>Огранич.</th>
                    <th rowSpan={2}>Склад 3</th>
                    <th rowSpan={2}>Изб. 3</th>
                    <th rowSpan={2}>Склад 4</th>
                    <th rowSpan={2}>Изб. 4</th>
                    <th colSpan={2}>Пропускная способность</th>
                    <th rowSpan={2}>Среднее время производства</th>
                    <th colSpan={11}>Гистограмма времени производства</th>
                </tr>
                <tr>
                    <th>&nbsp;</th>
                    <th>Сред.</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                    <th>17</th>
                    <th>18</th>
                    <th>19</th>
                    <th>20</th>
                </tr>
                </thead>
                <tbody>
                {factoryConfigs.map((factoryConfig, index) =>
                    <tr>
                        <th>{factoryConfig.name}</th>
                        {factoryConfig.buffer.map((_, i) => <>
                            <td>{factoryConfig.buffer[i]}</td>
                            {getActionInfo(factoryConfig, i)}
                        </>)}

                        {(tableResult.table.length > index) ? getThroughputInfo(index) : <td>...</td>}
                        {(tableResult.table.length > index) ? getThroughputAvgInfo(index) : <td>...</td>}

                        {tableResult.table.length > index && getLeadTimeAvgInfo(index)}

                        {tableResult.table.length > index && getLeadTimeInfo(index, 10)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 11)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 12)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 13)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 14)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 15)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 16)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 17)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 18)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 19)}
                        {tableResult.table.length > index && getLeadTimeInfo(index, 20)}
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};


export default App
