import { createTheme, Palette, PaletteOptions, ThemeOptions } from '@mui/material';
import { ColorPartial, SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { PartialDeep } from 'type-fest';

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PartialDeep<Palette> & {
  extra?: ExtraThemeProp;
};

declare module '@mui/material' {
  interface TypographyVariants {
    h2Samsung: React.CSSProperties;
    h3Samsung: React.CSSProperties;
    h4Samsung: React.CSSProperties;
    h5Samsung: React.CSSProperties;
    h6Samsung: React.CSSProperties;
    h7Samsung: React.CSSProperties;
    h8Samsung: React.CSSProperties;
    body3Samsung: React.CSSProperties;

    h0Poppins: React.CSSProperties;
    h1Poppins: React.CSSProperties;
    h3Poppins: React.CSSProperties;
    h5Poppins: React.CSSProperties;
    h4Poppins: React.CSSProperties;
    h6Poppins: React.CSSProperties;
    bodyPoppins: React.CSSProperties;
    body2Poppins: React.CSSProperties;
    body3Poppins: React.CSSProperties;
    body4Poppins: React.CSSProperties;
    body6Poppins: React.CSSProperties;
    subtitle2Poppins: React.CSSProperties;
    captionPoppins: React.CSSProperties;
    caption6Poppins: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h2Samsung: React.CSSProperties;
    h3Samsung: React.CSSProperties;
    h4Samsung: React.CSSProperties;
    h5Samsung: React.CSSProperties;
    h6Samsung: React.CSSProperties;
    h7Samsung: React.CSSProperties;
    h8Samsung: React.CSSProperties;
    body3Samsung: React.CSSProperties;

    h0Poppins: React.CSSProperties;
    h1Poppins: React.CSSProperties;
    h3Poppins: React.CSSProperties;
    h5Poppins: React.CSSProperties;
    h4Poppins: React.CSSProperties;
    h6Poppins: React.CSSProperties;
    bodyPoppins: React.CSSProperties;
    body2Poppins: React.CSSProperties;
    body3Poppins: React.CSSProperties;
    body4Poppins: React.CSSProperties;
    body6Poppins: React.CSSProperties;
    subtitle2Poppins: React.CSSProperties;
    captionPoppins: React.CSSProperties;
    caption6Poppins: React.CSSProperties;
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
    h2Samsung: true;
    h3Samsung: true;
    h4Samsung: true;
    h5Samsung: true;
    h6Samsung: true;
    h7Samsung: true;
    h8Samsung: true;
    body3Samsung: true;

    h0Poppins: true;
    h1Poppins: true;
    h3Poppins: true;
    h5Poppins: true;
    h4Poppins: true;
    h6Poppins: true;
    bodyPoppins: true;
    body2Poppins: true;
    body3Poppins: true;
    body4Poppins: true;
    body6Poppins: true;
    subtitle2Poppins: true;
    captionPoppins: true;
    caption6Poppins: true;
  }
}

export const lightPalette: ExtendedPaletteOptions = {
  mode: 'light',
  primary: {
    main: '#3671E9',
    light: '#00A3FF',
    dark: '#3671E9',
  },
  secondary: {
    main: '#09B1EC',
    light: '#65C2F5',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#000000',
    secondary: '#565656',
    disabled: 'rgba(0, 0, 0, 0.2)',
  },
  success: {
    main: '#2BB673',
  },
  error: {
    main: '#EB5757',
  },
  warning: {
    main: '#FFB21E',
  },
  extra: {
    darkest: {
      main: '#EAEAEA'
    },
    primaryButton: {
      background: 'linear-gradient(93.49deg, #0463CA 0.54%, #00A3FF 100%)',
      color: '#ffffff'
    },
    plainButton: {
      background: '#f2f2f2b2',
      color: '#000000'
    },
    card: {
      background: '#FFF',
      light: '#F1F1F1',
      hover: '#EAEAEA',
      divider: '#ebebeb',
      disable: '#D6DADE',
      boxShadow: '0 1px 8px rgba(29,32,35, .04), 0 4px 20px rgba(29,32,35, .02)'
    },
    swapPanel: {
      background: '#FFF',
      panel: '#f8f8f8',
      hover: '#EAEAEA',
      divider: '#ebebeb',
      boxShadow: '0 1px 8px rgba(29,32,35, .04), 0 4px 20px rgba(29,32,35, .02)'
    },
    table: {
      background: '#FFF',
      light: '#FFF',
      hover: '#EAEAEA',
      divider: '#ebebeb',
      disable: '#D6DADE',
      boxShadow: '0 1px 8px rgba(29,32,35, .04), 0 4px 20px rgba(29,32,35, .02)'
    },
    background: {
      alt: '#f7f9fd',
      linear: '#FFF',
      secondary: '#f8f8f8'
    },
    button: {
      backgroundGreenOpacity: 'rgba(54, 113, 233, .1)',
      lighter: 'rgba(0,0,0, .02)',
      linear: 'linear-gradient(93.49deg, #0463CA 0.54%, #00A3FF 100%)',
      divider: 'rgba(0,0,0,.12)'
    },
    profileButton: {
      background: '#f2f2f2b2',
    },
    text: {
      linear: 'linear-gradient(133.2deg, #b33ee7 2.95%, #32c1ce 48.27%, #3cff5c 100%)',
    },
    walletModal: {
      background: '#ffffff',
      divider: '#ebebeb',
      textPrimary: '#000A0D',
      textSecondary: '#929292',
      hover: '#f2f2f2b2',
    },
    toggle: {
      background: '#f2f2f2b2',
      selected: '#FFFFFF',
      color: '#000000'
    },
    ranks: {
      oval: '#2BB673',
      axeton: '#EF5DA8',
      viserium: '#F93232',
      nemesis: '#1890FF',
      immortal: '#FFB21E'
    }
  },
};

export const darkPalette: ExtendedPaletteOptions = {
  mode: 'dark',
  warning: {
    main: '#FFB21E',
  },
  error: {
    main: '#F93232',
  },
  success: {
    main: '#2AC89F',
  },
  primary: {
    main: '#3671E9',
    light: '#00A3FF',
    dark: '#3671E9',
  },
  secondary: {
    main: '#09B1EC',
    light: '#65C2F5',
  },
  background: {
    default: '#18181C',
    paper: '#23242A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#949698',
    disabled: 'rgba(255, 255, 255, 0.2)',
  },
  extra: {
    darkest: {
      main: '#000000'
    },
    primaryButton: {
      background: 'linear-gradient(93.49deg, #0463CA 0.54%, #00A3FF 100%)',
      color: '#ffffff'
    },
    plainButton: {
      background: '#32353D',
      color: '#FFFFFF'
    },
    card: {
      background: '#23242A',
      light: '#2E3038',
      hover: '#32353D',
      divider: '#393B44',
      disable: '#4F5B67',
      opacityBackground: 'rgba(0, 163, 255, 0.05)',
      boxShadow: '0 1px 8px rgba(61, 63, 64, .05), 0 4px 20px rgba(61, 63, 64, .05)'
    },
    swapPanel: {
      background: '#23242A',
      panel: '#2E3038',
      hover: '#32353D',
      divider: '#393B44',
      boxShadow: '0 1px 8px rgba(61, 63, 64, .05), 0 4px 20px rgba(61, 63, 64, .05)',
    },
    table: {
      background: '#23242A',
      light: '#2E3038',
      hover: '#32353D',
      divider: '#393B44',
      disable: '#4F5B67',
      boxShadow: '0 1px 8px rgba(61, 63, 64, .05), 0 4px 20px rgba(61, 63, 64, .05)'
    },
    button: {
      backgroundGreenOpacity: 'rgba(54, 113, 233, .2)',
      lighter: 'rgba(255,255,255, .01)',
      linear: 'linear-gradient(93.49deg, #0463CA 0.54%, #00A3FF 100%)',
      divider: '#4F5B67'
    },
    profileButton: {
      background: '#32353D',
    },
    background: {
      alt: '#18181C',
      secondary: '#23242A'
    },
    text: {
      linear: 'linear-gradient(133.2deg, #D184F3 2.95%, #87D3DA 48.27%, #8CF99E 100%)',
    },
    walletModal: {
      background: '#ffffff',
      divider: '#ebebeb',
      textPrimary: '#000A0D',
      textSecondary: '#929292',
      hover: '#f2f2f2b2',
    },
    toggle: {
      background: '#000000',
      selected: '#2E3038',
      color: '#FFFFFF'
    },
    ranks: {
      oval: '#2BB673',
      axeton: '#EF5DA8',
      viserium: '#F93232',
      nemesis: '#1890FF',
      immortal: '#FFB21E'
    }
  },
};

const getComponentTheme = (basePalette: ExtendedPaletteOptions): ThemeOptions => {
  return {
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '64px',
      },
      h2: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '56px',
      },
      h3: {
        fontWeight: '400',
        fontSize: '24px',
      },
      h4: {
        fontWeight: '600',
        fontSize: '28px',
      },
      h6: {
        fontWeight: '400',
        fontSize: '20px',
      },
      subtitle1: {
        fontFamily: 'AnonymousPro-Bold',
        fontSize: '20px',
      },
      body1: {
        fontWeight: '400',
        fontSize: '16px',
      },
      h2Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '48px',
      },
      h4Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '100%',

        '@media (max-width: 1199px)': {
          fontSize: '1.7rem',
        },
      },
      h3Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '32px',
      },
      h5Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '24px',
      },
      h6Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '20px',
      },
      h7Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '28px',
        lineHeight: '100%',
      },
      h8Samsung: {
        fontFamily: 'SamsungSharpSans',
        fontWeight: '700',
        fontSize: '30px',
        lineHeight: '100%',
      },
      body3Samsung: {
        fontSize: '16px',
      },

      h0Poppins: {
        fontSize: '42px',
      },
      h1Poppins: {
        fontSize: '36px',
      },
      h3Poppins: {
        fontSize: '32px',
      },
      h5Poppins: {
        fontSize: '30px',
        lineHeight: '100%',
      },
      h4Poppins: {
        fontSize: '28px',
      },
      h6Poppins: {
        fontSize: '20px',
      },
      bodyPoppins: {
        fontSize: '20px',
      },
      body2Poppins: {
        fontSize: '18px',
      },
      body3Poppins: {
        fontSize: '16px',
      },
      body4Poppins: {
        fontSize: '14px',
      },
      body6Poppins: {
        fontSize: '10px',
      },
      subtitle2Poppins: {
        fontSize: '15px',
      },
      captionPoppins: {
        fontSize: '12px',
      },
      caption6Poppins: {
        fontSize: '14px',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1244,
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
          variant: 'text',
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            fontStyle: 'normal',
            transition: '.12s ease-in',
            '&:hover': {
              opacity: '0.9',
              boxShadow: 'none',
            },
          },
        },
      },
      MuiContainer:{
        styleOverrides:{
          root: {
            padding: '0 24px'
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            width: '100%',
            p: 1.5,
            '&.Mui-selected': {
              backgroundColor: (basePalette.extra as any).card.light,
              color: (basePalette.text as any).primary,
              // boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.24)',
              '&:hover': {
                backgroundColor: (basePalette.extra as any).card.light,
              },
            },
            '&:hover':{
              color: (basePalette.text as any).primary,
            },
            '& .MuiTouchRipple-root': {
              color: (basePalette.primary as SimplePaletteColorOptions).main,
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: 'text.primary',
          variant: 'body3Poppins',
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backgroundColor: 'rgba(0, 0, 0, 0.3)',
            // backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiPopover-paper': {
              backgroundImage: 'none',
              // borderRadius: '12px'
            },
          },
        },
      },
      MuiStack: {
        defaultProps: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {},
          },
        },
      },
    },
  } as ThemeOptions;
};

export const getTheme = (mode: 'light' | 'dark') => {
  if (mode === 'light')
    return createTheme({
      palette: lightPalette as any as PaletteOptions,
      ...(getComponentTheme(lightPalette) as any as ThemeOptions),
    });
  return createTheme({
    palette: darkPalette as any as PaletteOptions,
    ...(getComponentTheme(darkPalette) as any as ThemeOptions),
  });
};
