
export const convertOptions = (data, valueKey, labelKey, defaultValue) => {
  if (!Array.isArray(data)) return [];
  return data.map(item => ({
    value: item[valueKey] || defaultValue.value,
    label: item[labelKey] || defaultValue.label,
  }));
};
export const createOptionsFromData = (data, valueKeys, labelKeys) => {
  const options = [];
  data.forEach((item) => {
    const option = {};
    labelKeys.forEach((labelKey, index) => {
      option[labelKey] = item[valueKeys[index]];
    });
    options.push(option);
  });
  return options;
};