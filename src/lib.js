const { WS, ES, FORMAT } = require("./constants")

const addSpaces = function (string, spaceCount) {
  for (let index = 0; index < spaceCount; index++) {
    string += WS;
  }
  return string;
};

const getRow = function (headers, startPoints, isHeaderRow, obj) {
  let row = ES;
  headers.forEach((header, index) => {
    row += isHeaderRow ? header : obj[header];
    let spaceCount = startPoints[index + 1] - row.length;
    row = addSpaces(row, spaceCount);
  });
  return row;
};

const getRows = function (data, headers, startPoints) {
  let rows = [];
  rows.push(getRow(headers, startPoints, true));
  data.forEach(obj => {
    rows.push(getRow(headers, startPoints, false, obj));
  });
  return rows;
};

const getStartPoint = function (header, data, startPoint) {
  let lengths = [header.length];
  data.forEach(obj => {
    if (obj[header] == null) {
      lengths.push(4);
    } else {
      lengths.push(obj[header].length);
    }
  });
  startPoint += Math.max(...lengths) + 5;
  return startPoint;
};

const getStartPoints = function (data, headers) {
  let startPoints = [0];
  let startPoint = 0;

  headers.forEach(header => {
    startPoint = getStartPoint(header, data, startPoint);
    startPoints.push(startPoint);
  });

  return startPoints;
};

const getData = function (params, fs) {
  if (params.filePath != null)
    return JSON.parse(fs.readFileSync(params.filePath, FORMAT));
  return params.data
}

module.exports = { addSpaces, getRow, getRows, getStartPoint, getStartPoints, getData };
