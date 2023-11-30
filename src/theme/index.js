

import { extendTheme, withDefaultSize, theme as baseTheme } from "@chakra-ui/react";

const Text = {
  baseStyle: {
    fontFamily: `'Open Sans', sans-serif`,
    color: "#333",
  },
};

const Select = {
  baseStyle: {
    fontFamily: `'Open Sans', sans-serif`,
    color: "#333",
    "::placeholder": {
      fontFamily: `'Open Sans', sans-serif`,
    },
  },
};

const Button = {
  baseStyle: {
    fontFamily: `'Open Sans', sans-serif`,
    color: "#333",
  },
};

const FormLabel = {
  baseStyle: {
    fontSize: "sm",
    fontFamily: `'Open Sans', sans-serif`,
  },
};

const MenuList = {
  baseStyle: {
    fontSize: "sm",
    fontFamily: `'Open Sans', sans-serif`,
  },
};

const Modal = {
  defaultProps: {
    size: "xl",
  },
  baseStyle: {
    fontFamily: `'Open Sans', sans-serif`,
  },
};
const Box = {
  baseStyle: {
    fontFamily: `'Open Sans', sans-serif`,
  },
};
const Input = {
  baseStyle: {
    "::placeholder": {
      fontFamily: `'Open Sans', sans-serif`,
    },
  },
};

const Tooltip = {
  defaultProps: {
    placement: "top",
  },
  baseStyle: {
    fontFamily: `'Open Sans', sans-serif`,
  },
};

const colors = {
  danger: "#F5365C",
  gray: {
    50: "#F7F8F9",
    100: "#EDF0F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },
  blue: {
    50: "#EAF4FC",
    100: "#BDDFFA",
    200: "#D9E1FC",
    300: "#6C87EB",
    400: "#5F81FF",
    500: "#4A70FF",
    600: "#0E6FBE",
    700: "#0B548E",
    800: "#07385F",
    900: "#041C2F",
  },
  cyan: {
    50: "#EAFAFB",
    100: "#C4F2F3",
    200: "#9EEAEB",
    300: "#78E1E3",
    400: "#51D9DB",
    500: "#2BD0D4",
    600: "#23A7A9",
    700: "#1A7D7F",
    800: "#115355",
    900: "#092A2A",
  },
  teal: {
    50: "#ECF9F9",
    100: "#C9EEEE",
    200: "#A6E3E3",
    300: "#83D8D8",
    400: "#60CDCD",
    500: "#3DC2C2",
    600: "#319B9B",
    700: "#257474",
    800: "#194D4D",
    900: "#0C2727",
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#B7D883",
    400: "#68D391",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532",
  },
  orange: {
    50: "#F6A60D",
    100: "#F89011",
    200: "#F7CA92",
    300: "#F4B567",
    400: "#F1A03C",
    500: "#F97B14",
    600: "#FA6817",
    700: "#FB6019",
    800: "#FB5B1A",
    900: "#FC4F19",
  },
  red: {
    50: "#FFE5E5",
    100: "#FFB8B8",
    200: "#FF8A8A",
    300: "#FF5C5C",
    400: "#FF2E2E",
    500: "#FF0000",
    600: "#CC0000",
    700: "#990000",
    800: "#660000",
    900: "#330000",
  },

  purple: {
    50: "#F1EFF6",
    100: "#D7D1E6",
    200: "#BEB4D5",
    300: "#A496C5",
    400: "#8A79B4",
    500: "#715BA4",
    600: "#5A4983",
    700: "#443762",
    800: "#2D2442",
    900: "#171221",
  },
  pink: {
    50: "#FAEBF2",
    100: "#F0C6DB",
    200: "#E7A2C5",
    300: "#DD7EAE",
    400: "#D45997",
    500: "#CA3580",
    600: "#A22A66",
    700: "#79204D",
    800: "#511533",
    900: "#280B1A",
  },
  yellow: {
    50: "#FEF9E6",
    100: "#FDEEBA",
    200: "#FCE38D",
    300: "#FAD860",
    400: "#F9CD34",
    500: "#F8C307",
    600: "#C69C06",
    700: "#957504",
    800: "#634E03",
    900: "#322701",
  },
  themeCyan: {
    50: "#E5F5FF",
    100: "#B8E3FF",
    200: "#8AD1FF",
    300: "#5CBFFF",
    400: "#2EADFF",
    500: "#009BFF",
    600: "#007CCC",
    700: "#005D99",
    800: "#003E66",
    900: "#001F33",
  },
};

const styles = {
  global: () => ({
    body: {
      fontFamily: `'Open Sans', sans-serif`,
    },
    "*::selection": {
      backgroundColor: "#FFD23F",
    },

    ".resizer": {
      position: "absolute",
      right: "0",
      top: "0",
      height: "100%",
      width: "5px",
      background: "rgba(0,0,0,0.4)",
      cursor: "col-resize",
      userSelect: "none",
      touchAction: "none",
    },

    ".resizer.isResizing": {
      background: "blue",
      opacity: 1,
    },

    "@media(hover: hover)": {
      ".resizer": {
        opacity: 0,
      },

      "*: hover > .resizer": {
        opacity: "1",
      },
    },
  }),
};

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const customTheme = extendTheme(
  withDefaultSize({
    size: "md",
  }),

  {
    styles,
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Open Sans', sans-serif`,
    },

    colors: {
      ...colors,
      defaultColor: colors.purple,
      secondary: "#718096",
    },

    fontSizes: {
      extraLarge: baseTheme.fontSizes.xl,
      large: baseTheme.fontSizes.lg,
      default: baseTheme.fontSizes.md,
      small: baseTheme.fontSizes.sm,
      extraSmall: baseTheme.fontSizes.xs,
    },
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles,
                },
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
                {
                  ...activeLabelStyles,
                },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top",
              },
            },
          },
        },
      },
      Text,
      Select,
      Button,
      Input,
      Box,
      FormLabel,
      Modal,
      MenuList,
      Tooltip,
      Td: {
        baseStyle: {
          fontFamily: `'Open Sans', sans-serif`,
        },
      },
      Alert: {
        variants: {
          toast: (P) => {
            return {
              container: {
                ...P.theme.components.Alert.variants.solid(P).container,
                bottom: "64px",
              },
            };
          },
        },
        colorScheme: "success",
      },
    },
  }
);
