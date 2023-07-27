
export const convertOptions = (options, targetType) => {
  if (targetType === "id-name") {
    return options.map((option) => ({
      id: option.value,
      name: option.label,
    }));
  } else if (targetType === "value-label") {
    return options.map((option) => ({
      value: option.id,
      label: option.name,
    }));
  } else {
    return options;
  }
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