import { colXSmall, colSmall, colMedium, colLarge, colXLarge } from '../../panal.config';

const defaultValues = {
  xs: 3,
  sm: 3,
  md: 6,
  lg: 8,
  xl: 8,
};

export function getGridColConfig() {
  const xsVal = colXSmall < 1 || colXSmall > 12 ? defaultValues.xs : colXSmall;
  const smVal = colSmall < 1 || colSmall > 12 ? defaultValues.sm : colSmall;
  const mdVal = colMedium < 1 || colMedium > 12 ? defaultValues.md : colMedium;
  const lgVal = colLarge < 1 || colLarge > 12 ? defaultValues.lg : colLarge;
  const xlVal = colXLarge < 1 || colXLarge > 12 ? defaultValues.xl : colXLarge;

  return {
    xs: xsVal,
    sm: smVal,
    md: mdVal,
    lg: lgVal,
    xl: xlVal,
  };
}
