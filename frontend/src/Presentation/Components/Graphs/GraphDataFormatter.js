// This file contains helper functions to format data returned by backend
// into data that can be used by Unovis graphs

function getDefaultStackedData(startDate, endDate) {
  let currentDate = new Date(startDate);
  let end = new Date(endDate);
  let defaultData = {};

  let stringDate = currentDate.toISOString().slice(0, 10);
  defaultData[stringDate] = [];
  while (currentDate <= end) {
    currentDate.setDate(currentDate.getDate() + 1);
    stringDate = currentDate.toISOString().slice(0, 10);
    defaultData[stringDate] = [];
  }
  return defaultData;
}

function getDefaultData(startDate, endDate) {
  let currentDate = new Date(startDate);
  let end = new Date(endDate);
  let defaultData = {};

  let stringDate = currentDate.toISOString().slice(0, 10);
  defaultData[stringDate] = 0;
  while (currentDate <= end) {
    currentDate.setDate(currentDate.getDate() + 1);
    stringDate = currentDate.toISOString().slice(0, 10);
    defaultData[stringDate] = 0;
  }
  return defaultData;
}

export function convertToDateObject(dateString) {
  const dateArray = dateString.split("-"); // Split the date string by hyphens
  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1; // Subtract 1 from month since it's zero-indexed in the Date constructor
  const day = parseInt(dateArray[2]);
  const dateObj = new Date(year, month, day);
  return dateObj;
}

export function getLegend(data) {
  if (!data) return [];
  let labels = [];
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const attrValue = entry["category"];
    if (!labels.includes(attrValue)) {
      labels = [...labels, attrValue];
    }
  }
  let labelsDict = [];
  labels.forEach((val) => {
    labelsDict = [...labelsDict, { name: val }];
  });
  return labelsDict;
}

export function getCategoryData(data, startDate, endDate) {
  if (!data) return;
  let sums = {};
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const attrValue = entry["category"];
    if (attrValue in sums) {
      sums[attrValue] += parseInt(entry.amount);
    } else {
      sums[attrValue] = parseInt(entry.amount);
    }
  }
  let result = [];
  Object.keys(sums).forEach((key) => {
    result.push({ x: key, y: sums[key] });
  });
  return result;
}

export function getStackedData(data, startDate, endDate) {
  if (!data) return;
  let sums = getDefaultStackedData(startDate, endDate);
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const attrValue = entry["transactionDate"];
    if (sums[attrValue][entry.category]) {
      sums[attrValue][entry.category] += parseInt(entry.amount);
    } else {
      sums[attrValue].push(entry.category);
      sums[attrValue][entry.category] = parseInt(entry.amount);
    }
  }
  let result = [];
  Object.keys(sums).forEach((key) => {
    result.push({ x: key, y: sums[key] });
  });
  return result;
}

export function getIncomeData(data, startDate, endDate) {
  if (!data) return;
  let sums = getDefaultData(startDate, endDate);
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const attrValue = entry["transactionDate"];
    if (entry["category"] !== "Income") continue;
    if (attrValue in sums) {
      sums[attrValue] += parseInt(entry.amount);
    } else {
      sums[attrValue] = parseInt(entry.amount);
    }
  }
  let result = [];
  Object.keys(sums).forEach((key) => {
    result.push({ x: key, y: sums[key] });
  });
  return result;
}

export function getExpenseData(data, startDate, endDate) {
  if (!data) return;
  let sums = getDefaultData(startDate, endDate);
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const attrValue = entry["transactionDate"];
    if (entry["category"] === "Income") continue;
    if (attrValue in sums) {
      sums[attrValue] += parseInt(entry.amount);
    } else {
      sums[attrValue] = parseInt(entry.amount);
    }
  }
  let result = [];
  Object.keys(sums).forEach((key) => {
    result.push({ x: key, y: sums[key] });
  });
  return result;
}
