export const createOptionsFromData = (data, valueKey, labelKey) => {
  const options = [];
  data.forEach((item) => {
    const value = valueKey ? item[valueKey] : item;
    const label = labelKey ? item[labelKey] : item;
    options.push({ value, label });
  });
  return options;
};