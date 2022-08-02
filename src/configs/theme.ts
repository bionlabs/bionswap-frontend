import {
  createTheme,
  PaletteOptions,
  SimplePaletteColorOptions,
  ThemeOptions,
} from "@mui/material";

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PaletteOptions & {
  extra?: ExtraThemeProp;
};

export const lightPalette: ExtendedPaletteOptions = {
  mode: "light",
  primary: {
    main: "#E7A236",
    light: "#ffc107",
    dark: "#FB8500",
  },
  secondary: {
    main: "#25273d",
  },
  background: {
    default: "#FAFAFA",
    paper: "#FFFFFF",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "#7A858C",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  // error: {},
  // warning: {},
  // info: {},
  // success: {},
  // divider: {}
  // extra: {
  //   buyButton: "red",
  // },
};

export const darkPalette: ExtendedPaletteOptions = {
  mode: "dark",
  primary: {
    main: "#E7A236",
    light: "#ffc107",
    dark: "#FB8500",
  },
  secondary: {
    main: "#25273d",
  },
  background: {
    default: "#303030",
    paper: "#424242",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
  // error: {},
  // warning: {},
  // info: {},
  // success: {},
  // divider: {}
  // extra: {
  //   buyButton: "red",
  // },
};

const getComponentTheme = (
  basePalette: ExtendedPaletteOptions
): ThemeOptions => {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "text",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          // root: {
          //   width: "100%",
          //   p: 1.5,
          //   borderRadius: "8px",
          //   "&.Mui-selected": {
          //     backgroundColor: (
          //       basePalette.primary as SimplePaletteColorOptions
          //     ).light,
          //     boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.24)",
          //     "&:hover": {
          //       backgroundColor: (
          //         basePalette.primary as SimplePaletteColorOptions
          //       ).light,
          //     },
          //   },
          //   "& .MuiTouchRipple-root": {
          //     color: (basePalette.primary as SimplePaletteColorOptions).main,
          //   },
          // },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
          fontFamily: "Inter",
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
      MuiStack: {
        defaultProps: {
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
  };
};

export const getTheme = (mode: "light" | "dark") => {
  if (mode === "light")
    return createTheme({
      palette: lightPalette,
      ...getComponentTheme(lightPalette),
    });
  return createTheme({
    palette: darkPalette,
    ...getComponentTheme(darkPalette),
  });
};
