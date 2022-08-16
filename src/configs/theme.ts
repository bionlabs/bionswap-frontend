import { createTheme, PaletteOptions, SimplePaletteColorOptions, ThemeOptions } from "@mui/material";

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PaletteOptions & {
  extra?: ExtraThemeProp;
};

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h3Samsung: React.CSSProperties;

    h3Poppins: React.CSSProperties;
    h6Poppins: React.CSSProperties;
    bodyPoppins: React.CSSProperties;
    body3Poppins: React.CSSProperties;
    subtitle2Poppins: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h3Samsung: React.CSSProperties;

    h3Poppins: React.CSSProperties;
    h6Poppins: React.CSSProperties;
    bodyPoppins: React.CSSProperties;
    body3Poppins: React.CSSProperties;
    subtitle2Poppins: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h3Samsung: true;

    h3Poppins: true;
    h6Poppins: true;
    bodyPoppins: true;
    body3Poppins: true;
    subtitle2Poppins: true;
  }
}

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
  error: {
    main: "#EB5757",
  },
  warning: {
    main: "rgba(255, 178, 55, 0.2)",
  },
  extra: {
    button: {
      background: "#25273D",
      text: "white",
    },
    swapButton: {
      background: "#07E0E0",
      color: "#000607",
    },
    header: {
      background: "#ffffff",
      color: "#787A9B",
      colorActive: "#0b0b0b",
    },
    input: {
      background: "#FFFFFF",
      color: "#000000",
    },
  },
};

export const darkPalette: ExtendedPaletteOptions = {
  mode: "dark",
  primary: {
    main: "#07E0E0",
    // light: "#ffc107",
    dark: "#000A0D",
  },
  secondary: {
    main: "#6803B8",
  },
  background: {
    default: "#000A0D",
    paper: "#EDEDED",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#FFFFED",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
  extra: {
    text: {
      primary: "#D6DADE",
      secondary: "#E0E0E0",
      subtitle: "#575757",
      highlight: "#6803B8",
    },
    button: {
      background: "white",
      text: "black",
    },
    swapButton: {
      background: "#07E0E0",
      color: "#000607",
    },
    header: {
      background: "#081319",
      color: "#A8B0B9",
      colorActive: "#07E0E0",
    },
    input: {
      background: "#001519",
      color: "#F8F9F9",
    },
    border: {
      color: "#424242",
    },
    divider: {
      background: "#595959",
    },
    other: {
      first: "#011216",
      second: "#272727",
      third: "#D9D9D9",
      fourth: "#82FFFF",
      fifth: "#000918",
      sixth: "#121116",
      seventh: "#31313B",
      eight: "#535353",
    },
  },
};

const getComponentTheme = (basePalette: ExtendedPaletteOptions): ThemeOptions => {
  return {
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontFamily: "SamsungSharpSans-Bold",
        fontSize: "64px",
        lineHeight: "80px",
      },
      h2: {
        fontFamily: "SamsungSharpSans-Bold",
        fontSize: "56px",
        lineHeight: "80px",
      },
      h3: {
        fontWeight: "400",
        fontSize: "24px",
        lineHeight: "180%",
      },
      h4: {
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "180%",
      },
      h6: {
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "30px",
      },
      subtitle1: {
        fontFamily: "AnonymousPro-Bold",
        fontSize: "20px",
        lineHeight: "180%",
      },
      body1: {
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
      },

      h3Samsung: {
        fontFamily: "SamsungSharpSans-Bold",
        fontSize: "32px",
        lineHeight: "180%",
      },

      h3Poppins: {
        fontSize: "32px",
        lineHeight: "180%",
      },
      h6Poppins: {
        fontSize: "20px",
        lineHeight: "40px",
      },
      bodyPoppins: {
        fontSize: "20px",
        lineHeight: "180%",
      },
      body3Poppins: {
        fontSize: "16px",
        lineHeight: "180%",
      },
      subtitle2Poppins: {
        fontSize: "15px",
        lineHeight: "180%",
      },

      button: {
        fontStyle: "italic",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "text",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            boxShadow: "none",
            fontStyle: "normal",
            // "&:hover": {
            //   transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
            // },
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
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              display: "none",
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
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
