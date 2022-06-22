// todo: optional xl param for config
// todo: adapt grid col classes by panal.config  

export default [
  {
    config: {
      type: "datetime",
      time: true,
      date: true
    },
    lg: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 1,
      colSpan: 1,
    },
    md: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 1,
      colSpan: 1,
    },
    sm: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 1,
      colSpan: 1,
    }
  },
  {
    config: {
      type: "datetime"
    },
    lg: {
      rowStart: 1,
      colStart: 2,
      rowSpan: 2,
      colSpan: 2,
    },
    md: {
      rowStart: 1,
      colStart: 2,
      rowSpan: 2,
      colSpan: 2,
    },
    sm: {
      rowStart: 1,
      colStart: 2,
      rowSpan: 2,
      colSpan: 2,
    }
  },
  {
    config: {
      type: "datetime",
      time: true,
      timemode: "12",
      datemode: "de"
    },
    lg: {
      rowStart: 3,
      colStart: 1,
      rowSpan: 1,
      colSpan: 3,
    },
    md: {
      rowStart: 3,
      colStart: 1,
      rowSpan: 1,
      colSpan: 3,
    },
    sm: {
      rowStart: 3,
      colStart: 1,
      rowSpan: 1,
      colSpan: 3,
    }
  },
]