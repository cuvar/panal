// todo: optional xl param for config
// todo: adapt grid col classes by panal.config  

export default [
  {
    config: {
      type: "link",
      links: [
        {
          href: "https://nextjs.org/",
          title: "NextJS",
          sametab: false
        },
        {
          href: "https://nextjs.org/",
          title: "NextJS",
          sametab: false
        },
        {
          href: "https://nextjs.org/",
          title: "NextJS",
          sametab: false
        },
        {
          href: "https://nextjs.org/",
          title: "NextJS",
          sametab: false
        },
        {
          href: "https://nextjs.org/",
          title: "NextJS",
          sametab: false
        },
      ]
    },
    lg: {
      rowStart: 1,
      colStart: 3,
      rowSpan: 2,
      colSpan: 2,
    },
    md: {
      rowStart: 1,
      colStart: 3,
      rowSpan: 1,
      colSpan: 1,
    },
    sm: {
      rowStart: 1,
      colStart: 3,
      rowSpan: 1,
      colSpan: 1,
    }
  },
  {
    config: {
      type: "datetime",
      time: true,
      // date: true
    },
    lg: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 2,
      colSpan: 2,
    },
    md: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 2,
      colSpan: 2,
    },
    sm: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 2,
      colSpan: 2,
    }
  },
  {
    config: {
      type: "gcalendar",
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