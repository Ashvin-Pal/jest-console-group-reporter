jest.mock("jest-message-util", () => ({
  formatStackTrace: (val: string): string => val,
}));

jest.mock("chalk", () => {
  function generateColorFn(color: string): (val: string) => string {
    const colorFn = (val: string): string => `[${color}] ${val}`;
    colorFn.bold = (val: string): string => `[Bold-${color}] ${val}`;
    return colorFn;
  }

  return {
    reset: {
      red: generateColorFn("Red"),
      yellow: generateColorFn("Yellow"),
      cyan: generateColorFn("Cyan"),
      blue: generateColorFn("Blue"),
      magenta: generateColorFn("Magenta"),
      gray: generateColorFn("Gray"),
      white: generateColorFn("White"),
    },
  };
});
