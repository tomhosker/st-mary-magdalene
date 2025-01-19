/*
This code defines a class which models the properties of the home page.
*/

// Local imports.
const MUtils = require("./mutils.js");

/****************
 ** MAIN CLASS **
 ***************/

class IndexMaker {
    constructor(data, req) {
        this.data = data;
        this.title = "Welcome";
        this.serviceTimes = makeServiceTimes(
            data.serviceTimes.columns,
            data.serviceTimes.rows
        );
        this.parishPriest = makeParishOfficer(data.parishPriest);
        this.deacon = makeParishOfficer(data.parishPriest);
        this.parishChurches = makeLocations(
            data.parishChurches.columns,
            data.parishChurches.rows
        );
        this.linkedChurches = makeLocations(
            data.linkedChurches.columns,
            data.linkedChurches.rows
        );
        this.mostRecentNewsletter = makeMostRecentNewsletter(data.newsletters);
        this.isAdmin = MUtils.isAdmin(req);
    }
}

/**********************
 ** HELPER FUNCTIONS **
 *********************/

// Make the details of an officer for an position which may or may not be
// filled.
function makeParishOfficer(data) {
    let result;

    if (data.rows.length === 0) return null;

    result = MUtils.objectifyRow(data.columns, data.rows[0]);

    return result;
}

// Ronseal.
function makeServiceTimes(columns, rows) {
    let result = [];
    let item;
    let todaysDate = new Date();

    for (let i = 0; i < rows.length; i++) {
        item = {};

        for (let j = 0; j < columns.length; j++) {
            item[columns[j]] = rows[i][j];
        }

        if (hasPassed(item, todaysDate)) continue;

        item.time = MUtils.makeWhenString(
            item.weekday,
            item.day,
            item.month,
            item.year,
            item.hours,
            item.minutes
        );

        result.push(item);
    }

    return result;
}

// Determine whether a given service time has passed.
function hasPassed(serviceTime, todaysDate) {
    if (!serviceTime.year) return false;

    if (serviceTime.year > todaysDate.getFullYear()) return false;
    else if (serviceTime.year < todaysDate.getFullYear()) return true;

    if (serviceTime.month > todaysDate.getMonth()) return false;
    else if (serviceTime.year < todaysDate.getMonth()) return true;

    if (serviceTime.day < todaysDate.getDate()) return true;

    return false;
}

// Ronseal.
function makeLocation(columns, row) {
    let result = MUtils.objectifyRow(columns, row);

    if (result.house_number) {
        result.firstLine = result.house_number + " " + result.road_name;
    } else result.firstLine = result.road_name;

    return result;
}

// As above, but for several locations.
function makeLocations(columns, rows) {
    let result = [];

    for (let i = 0; i < rows.length; i++) {
        result.push(makeLocation(columns, rows[i]));
    }

    return result;
}

// Return an object giving the properties of the most newsletter, if possible.
function makeMostRecentNewsletter(data) {
    let result, mostRecentData, weekBeginning;

    if (!data || data.rows.length === 0) return null;

    mostRecentData = MUtils.objectifyRow(data.columns, data.rows[0]);
    weekBeginning = MUtils.makeMyDateFormat(
        mostRecentData.week_beginning_day,
        mostRecentData.week_beginning_month,
        mostRecentData.week_beginning_year
    );

    result = { weekBeginning: weekBeginning, link: mostRecentData.link };

    return result;
}

// Exports.
module.exports = IndexMaker;
