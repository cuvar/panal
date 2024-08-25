const codes = Object.freeze({
  UNKNOWN_ISSUE: "UNKNOWN_ISSUE",
  // repository

  REPOSITORY_MISSING_CREDENTIALS: "REPOSITORY_MISSING_CREDENTIALS",
  REPOSITORY_MISSING: "REPOSITORY_MISSING",
  REPOSITORY_INVALID: "REPOSITORY_INVALID",
  REPOSITORY_NOT_IMPLEMENTED: "REPOSITORY_NOT_IMPLEMENTED",
  REPOSITORY_WRONG_CONFIGURATION: "REPOSITORY_WRONG_CONFIGURATION",
  REPOSITORY_INVALID_RESPONSE: "REPOSITORY_INVALID_RESPONSE",
  REPOSITORY_PARSE_FILE_CONTENT_FAILED: "REPOSITORY_PARSE_FILE_CONTENT_FAILED",
  REPOSITORY_EMPTY_CONTENT: "REPOSITORY_EMPTY_CONTENT",

  // config repo
  REPOSITORY_SET_CONFIG_FAILED: "REPOSITORY_SET_CONFIG_FAILED",
  REPOSITORY_SET_ALL_CONFIG_FAILED: "REPOSITORY_SET_ALL_CONFIG_FAILED",
  REPOSITORY_GET_CONFIG_FAILED: "REPOSITORY_GET_CONFIG_FAILED",
  REPOSITORY_GET_ALL_CONFIG_FAILED: "REPOSITORY_GET_ALL_CONFIG_FAILED",

  // layout repo
  REPOSITORY_SET_LAYOUT_FAILED: "REPOSITORY_SET_LAYOUT_FAILED",
  REPOSITORY_SET_MANY_LAYOUT_FAILED: "REPOSITORY_SET_MANY_LAYOUT_FAILED",
  REPOSITORY_SET_ALL_LAYOUT_FAILED: "REPOSITORY_SET_ALL_LAYOUT_FAILED",
  REPOSITORY_GET_LAYOUT_FAILED: "REPOSITORY_GET_LAYOUT_FAILED",
  REPOSITORY_GET_ALL_LAYOUT_FAILED: "REPOSITORY_GET_ALL_LAYOUT_FAILED",
  // widget
  WIDGET_NOT_FOUND: "WIDGET_NOT_FOUND",
  WIDGET_NONE_FOUND: "WIDGET_NONE_FOUND",
  // config
  WIDGET_CONFIG_MISSING: "WIDGET_CONFIG_MISSING",
  WIDGET_CONFIG_INVALID: "WIDGET_CONFIG_INVALID",
  WIDGET_CONFIG_ADJUSTED_MISSING: "WIDGET_CONFIG_ADJUSTED_MISSING",
  WIDGET_CONFIG_PARSE_ISSUE: "WIDGET_CONFIG_PARSE_ISSUE",
  // layout
  WIDGET_LAYOUT_NOT_AVAILABLE: "WIDGET_LAYOUT_NOT_AVAILABLE",
  WIDGET_LAYOUT_MISSING: "WIDGET_LAYOUT_MISSING",
  WIDGET_LAYOUT_INVALID: "WIDGET_LAYOUT_INVALID",
  // i/o
  IO_READ_FAILED: "IO_READ_FAILED",
  IO_WRITE_FAILED: "IO_WRITE_FAILED",
  // fetch
  FETCH_FAILED: "FETCH_FAILED",
  // services
  SERVICE_TRANSFORM_CONFIG_FAILED: "SERVICE_TRANSFORM_CONFIG_FAILED",
  SERVICE_HIDE_FAILED: "SERVICE_HIDE_FAILED",
  SERVICE_ADD_MISSING_LAYOUT_FAILED: "SERVICE_ADD_MISSING_LAYOUT_FAILED",
  SERVICE_REPLACEMENT_SCREEN_FAILED: "SERVICE_REPLACEMENT_SCREEN_FAILED",
  SERVICE_UPDATE_LAYOUT_MISSING_LAYOUTS:
    "SERVICE_UPDATE_LAYOUT_MISSING_LAYOUTS",
  SERVICE_UPDATE_LAYOUT_MISSING_SCREENSIZE:
    "SERVICE_UPDATE_LAYOUT_MISSING_SCREENSIZE",
  SERVICE_UPDATE_LAYOUT_MISSING_BREAKPOINT:
    "SERVICE_UPDATE_LAYOUT_MISSING_BREAKPOINT",
  // CALENDAR
  WIDGET_CAL_ICS_FETCH_FAILED: "WIDGET_CAL_ICS_FETCH_FAILED",
});

export type ErrorCodes = (typeof codes)[keyof typeof codes];

export { codes };
