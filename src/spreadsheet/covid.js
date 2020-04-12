const { google } = require('googleapis');
const client = require('redis').createClient(process.env.REDIS_URL);

const CovidSheetData = (token) => {
    const sheets = google.sheets({ version: 'v4', token });

    sheets.spreadsheets.values.get(
        {
            auth: process.env.GOOGLE_API_KEY,
            spreadsheetId: process.envSPREADSHEET_ID,
            range: 'Main!A1:G35',
        },
        (err, res) => {
            if (err) return console.log('The API returned an error: ', err);

            const rows = res.data.values.filter((data) => data.length !== 0);
            if (rows.length) {
                let headers = rows[0]
                    .concat(rows[1])
                    .filter(
                        (i) =>
                            i.length !== 0 &&
                            i !== 'MOHFW Data' &&
                            i !== 'State/Region'
                    );
                let totalOfCovid = rows[rows.length - 1].filter(
                    (i) => i.length !== 0
                );
                let dataNumbers = rows.slice(2).slice(0, -1);
                let states = dataNumbers.map(
                    (item) => item.filter((i) => isNaN(parseInt(i)))[0]
                );

                let covidnumbers = dataNumbers.map((item) => item.slice(2));
                covidnumbers.map((item) => {
                    let itemToAppend = 5 - item.length;
                    for (let i = 0; i < itemToAppend; i++) {
                        item.push('');
                    }
                });

                const zip = (a1, a2) => {
                    return a1.map((_, i) => [a1[i], a2[i]]);
                };

                let covidStates = {};
                covidnumbers.map((item, index) => {
                    covidStates = {
                        [states[index]]: {
                            ...Object.fromEntries(
                                zip(headers, item, states[index])
                            ),
                        },
                        ...covidStates,
                    };
                });

                let totalValueData = Object.fromEntries(
                    zip(headers, totalOfCovid)
                );
                covid19 = {
                    statesData: covidStates,
                    total: totalValueData,
                };
                getOthers(token);
            } else {
                console.log('No data found.');
            }
        }
    );
};
const getOthers = (token) => {
    const sheets = google.sheets({ version: 'v4', token });
    sheets.spreadsheets.values.get(
        {
            auth: process.env.GOOGLE_API_KEY,
            spreadsheetId: process.envSPREADSHEET_ID,
            range: 'Main!A38:G38',
        },
        (err, res) => {
            let data = res.data.values[0].filter((item) => item.length !== 0);
            let values = data[0].split(': ');
            let source = {
                link: values[1].trim(),
            };
            covid19 = {
                ...covid19,
                source,
            };
            let redisData = {};
            redisData.items = { value: JSON.stringify(covid19) };
            try {
                client.hmset('items', redisData.items);
            } catch (error) {
                console.log('Error while storing data in redis', error);
            }
        }
    );
};

module.exports = { CovidSheetData };
