import * as React from 'react';
import { AnalysisDataModel } from '../../models/analysisData-model';
import './Table.css';

export const Table = () => {
    const tableData: AnalysisDataModel = {
        categories: [
            'Total',
            'eNPS',
            'Leadership',
            'Job satisfaction',
            'Meaningfulness',
            'Autonomy',
            'Work situtation',
            'Participation',
            'Personal development',
            'Organizational commitment',
            'Dedication',
            'Custom'
        ],
        rows: [
            {
                name: 'Group 1',
                id: '1fbfa7bb-d68b-4edf-9f93-f1460fdebf41',
                data: [8.6, 75, 9.1, 8, 8.6, 7.9, 9, 8.3, 8.8, 1.1, 9.3, 0]
            },
            {
                name: 'Group 2',
                id: '7fdc3afb-348a-4a0b-9d0e-c5c1fe60b097',
                data: [8.5, 83, 8.1, 8.1, 9.1, 8.6, 7.8, 8.6, 2.5, 9.2, 9, 0]
            },
            {
                name: 'Group 3',
                id: 'd136bec1-88de-46c4-84e1-d68c85e61f69',
                data: [8.7, 67, 7.8, 8.4, 10, 9.4, 7.2, 8.9, 4.6, 9.2, 8.9, 0]
            }
        ]
    };

    const [width, setWidth] = React.useState(window.innerWidth);
    const maxWidth = 1070;

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const setColor = (value: number): string => {
        if (value === undefined || value === null || value === 0) {
            return 'color-grey';
        }

        if (value < 2.0) {
            return 'color-red';
        } else if (value <= 4.0) {
            return 'color-orange';
        } else if (value <= 6.0) {
            return 'color-yellow';
        } else if (value <= 8.0) {
            return 'color-light-green';
        }
        return 'color-green';
    };

    const formatValue = (value: number): string => {
        if (value === 0) {
            return '?';
        }
        return value.toString();
    };

    return (
        <div className="p-2 bkgr-grey">
            <div className="bkgr-white">
                <div className="flex-row underline mb-1">
                    <h3 className="ml-1">Analysis</h3>
                </div>
                {width > maxWidth ? (
                    <table cellSpacing={0} className="table-style">
                        <thead>
                            <tr>
                                <th className="ml-1 ghost-header"></th>
                                {tableData.categories.map((header, index) => (
                                    <th className="header-text pb-1" key={index}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.rows.map(row => (
                                <tr key={row.id}>
                                    <td className="pl-1 underline table-name bold-text">{row.name}</td>
                                    {row.data.map((v, index) => (
                                        <td className={`${setColor(v)} cell table-cell value-text`} key={index}>
                                            <span> {formatValue(v)}</span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <div className="flex-row p-1 wrap">
                            {tableData.rows.map(group => (
                                <div key={group.id} className="flex-column flex-1">
                                    <div className="bold-text m-1 text-center">{group.name}</div>
                                    {group.data.map((v, index) => (
                                        <div key={index} className="flex-row">
                                            <div className="flex-row align-i-center justify-center width-50">
                                                <span className="header-text">{tableData.categories[index]}</span>
                                            </div>
                                            <div className={`${setColor(v)} cell value-text width-50`}>{v}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
