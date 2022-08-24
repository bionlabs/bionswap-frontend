import { createTheme, Palette, PaletteOptions, ThemeOptions } from "@mui/material";
import { ColorPartial } from "@mui/material/styles/createPalette";
import { PartialDeep } from "type-fest";

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PartialDeep<Palette> & {
  extra?: ExtraThemeProp;
};

declare module "@mui/material" {
  interface TypographyVariants {
    h3Samsung: React.CSSProperties,
    h5Samsung: React.CSSProperties,
    h6Samsung: React.CSSProperties,

    h3Poppins: React.CSSProperties,
    h4Poppins: React.CSSProperties,
    h6Poppins: React.CSSProperties,
    bodyPoppins: React.CSSProperties,
    body2Poppins: React.CSSProperties,
    body3Poppins: React.CSSProperties,
    body4Poppins: React.CSSProperties,
    body6Poppins: React.CSSProperties,
    subtitle2Poppins: React.CSSProperties,
    captionPoppins: React.CSSProperties,
    caption6Poppins: React.CSSProperties,
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h3Samsung: React.CSSProperties,
    h5Samsung: React.CSSProperties,
    h6Samsung: React.CSSProperties,

    h3Poppins: React.CSSProperties,
    h4Poppins: React.CSSProperties,
    h6Poppins: React.CSSProperties,
    bodyPoppins: React.CSSProperties,
    body2Poppins: React.CSSProperties,
    body3Poppins: React.CSSProperties,
    body4Poppins: React.CSSProperties,
    body6Poppins: React.CSSProperties,
    subtitle2Poppins: React.CSSProperties,
    captionPoppins: React.CSSProperties,
    caption6Poppins: React.CSSProperties,
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    blue: ColorPartial;
    green: ColorPartial;
    yellow: ColorPartial;
    red: ColorPartial;
    gray: ColorPartial;
    darkGreen: ColorPartial;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3Samsung: true,
    h5Samsung: true,
    h6Samsung: true,

    h3Poppins: true,
    h4Poppins: true,
    h6Poppins: true,
    bodyPoppins: true,
    body2Poppins: true,
    body3Poppins: true,
    body4Poppins: true,
    body6Poppins: true,
    subtitle2Poppins: true,
    captionPoppins: true,
    caption6Poppins: true,
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
  blue: {
    '50': "#F7F7FB",
    '100': "#D6DADE",
    '200': "#B3B3FD",
    '300': "#8484F8",
    '400': "#6E6EF7",
    '500': "#4040F2",
    '600': "#3333D1",
    '700': "#2323BE",
    '800': "#181894",
    '900': "#0D0D54",
  },
  green: {
    "50": "#F6FFF0",
    "100": "#E6FBD9",
    "200": "#C9F884",
    "300": "#A0EC8A",
    "400": "#79D969",
    "500": "#44C13C",
    "600": "#2BA52E",
    "700": "#1E8A29",
    "800": "#0F5B1D",
    "900": "#073E16",
  },
  yellow: {
    "50": "#FFFEEC",
    "100": "#FFF9CF",
    "200": "#FFF19F",
    "300": "#FFE86F",
    "400": "#FFDE4B",
    "500": "#FFCF0F",
    "600": "#DBAD0A",
    "700": "#B78D07",
    "800": "#7B5C03",
    "900": "#4F3903",
  },
  red: {
    "50": "#FFF4EC",
    "100": "#FFE8D7",
    "200": "#FFCCB0",
    "300": "#FFA988",
    "400": "#FF886B",
    "500": "#FF513A",
    "600": "#DB302A",
    "700": "#B71D23",
    "800": "#931222",
    "900": "#7A0B21",
  },
  gray: {
    "50": "#FAFAFA",
    "100": "#F1F1F1",
    "200": "#EAECEE",
    "300": "#D6DADE",
    "400": "#A8B0B9",
    "500": "#717A8D",
    "600": "#4F5B67",
    "700": "#373F47",
    "800": "#242D35",
    "900": "#0C1620",
  },
  darkGreen: {
    "50": "#02B0B0",
    "100": "#029E9E",
    "200": "#017E7E",
    "300": "#016B6B",
    "400": "#015858",
    "500": "#014E4E",
    "600": "#004545",
    "700": "#003939",
    "800": "#013535",
    "900": "#012D2D",
  },
  warning: {
    main: "#FFB21E"
  },
  error: {
    main: "#F93232"
  },
  success: {
    main: "#2BB673"
  },
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
    secondary: "#000000",
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
      first: '#011216',
      second: '#272727',
      third: '#D9D9D9',
      fourth: '#82FFFF',
      fifth: '#000918',
      sixth: '#121116',
      seventh: '#31313B',
      eight: '#535353',
      nineth: '#0C1620',
      tenth: '#014959',
      eleventh: '#0B2029',
      twelfth: '#717D8A',
      thirteenth: '#242D35',
      fourteenth: '#A0EC8A',
      fourteenthOpacity: 'rgba(160, 236, 138, 0.15)',
      fifteenth: '#9A6AFF',
      fifteenthOpacity: 'rgba(154, 106, 255, 0.15)',
      sixteenth: '#2BA52E'
    }
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
      h5Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '24px',
        lineHeight: '30px',
      },
      h6Samsung: {
        fontFamily: 'SamsungSharpSans-Bold',
        fontSize: '20px',
        lineHeight: '30px',
      },

      h3Poppins: {
        fontSize: "32px",
        lineHeight: "180%",
      },
      h4Poppins: {
        fontSize: "28px",
        lineHeight: "100%",
      },
      h6Poppins: {
        fontSize: "20px",
        lineHeight: "40px",
      },
      bodyPoppins: {
        fontSize: "20px",
        lineHeight: "180%",
      },
      body2Poppins: {
        fontSize: "18px",
        lineHeight: "180%",
      },
      body3Poppins: {
        fontSize: "16px",
        lineHeight: "180%",
      },
      body4Poppins: {
        fontSize: "14px",
        lineHeight: "180%",
      },
      body6Poppins: {
        fontSize: "10px",
        lineHeight: "180%",
      },
      subtitle2Poppins: {
        fontSize: "15px",
        lineHeight: "180%",
      },
      captionPoppins: {
        fontSize: '12px',
        lineHeight: '180%',
      },
      caption6Poppins: {
        fontSize: '14px',
        lineHeight: '160%',
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
            // "&.MuiButton-outlined:hover": {
            //   // transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
            //   // backgroundColor: basePalette.primary?.main,
            //   backgroundColor: "transparent",
            //   opacity: 0.9,
            // },
            // "&.MuiButton-contained:hover": {
            //   // transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
            //   backgroundColor: basePalette.primary?.main,
            //   // backgroundColor: "transparent",
            //   opacity: 0.9,
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
          variant: "body3Poppins",
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
      MuiPopover: {
        styleOverrides: {
          root: {
            "& .MuiBackdrop-root": {
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            "&.MuiPopover-paper": {
              backgroundImage: "none",
              backgroundColor: "transparent",
            },
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
  } as ThemeOptions;
};

export const getTheme = (mode: "light" | "dark") => {
  if (mode === "light")
    return createTheme({
      palette: lightPalette as any as PaletteOptions,
      ...(getComponentTheme(lightPalette) as any as ThemeOptions),
    });
  return createTheme({
    palette: darkPalette as any as PaletteOptions,
    ...(getComponentTheme(darkPalette) as any as ThemeOptions),
  });
};
