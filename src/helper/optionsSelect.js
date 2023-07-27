export const createOptionsFromData = (data, valueKey, labelKey) => {
  const options = [];
  data.forEach((item) => {
    const value = valueKey ? item[valueKey] : item;
    const label = labelKey ? item[labelKey] : item;
    options.push({ value, label });
  });
  return options;
};
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