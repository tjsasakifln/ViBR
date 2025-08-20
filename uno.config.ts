import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'vibr';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  // Paleta ViBR - Azul royal + Verde-limão (segundo uniforme seleção)
  accent: {
    50: '#e6f3ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0066cc',  // Azul royal principal
    600: '#0059b3',
    700: '#004d99',
    800: '#004080',
    900: '#003366',
    950: '#003d7a',  // Azul escuro (sombras)
  },
  // Verde-limão da CBF
  vibr: {
    50: '#f7fef0',
    100: '#e8fcd3',
    200: '#d4f9a7',
    300: '#bef470',
    400: '#a8ee43',
    500: '#7ed321',  // Verde-limão principal
    600: '#6bc41a',
    700: '#58a615',
    800: '#478812',
    900: '#3a6f10',
    950: '#1f3d09',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  shortcuts: {
    'vibr-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 vibr-ease-cubic-bezier',
    kdb: 'bg-vibr-elements-code-background text-vibr-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      vibr: {
        elements: {
          borderColor: 'var(--vibr-elements-borderColor)',
          borderColorActive: 'var(--vibr-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--vibr-elements-bg-depth-1)',
              2: 'var(--vibr-elements-bg-depth-2)',
              3: 'var(--vibr-elements-bg-depth-3)',
              4: 'var(--vibr-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--vibr-elements-textPrimary)',
          textSecondary: 'var(--vibr-elements-textSecondary)',
          textTertiary: 'var(--vibr-elements-textTertiary)',
          code: {
            background: 'var(--vibr-elements-code-background)',
            text: 'var(--vibr-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--vibr-elements-button-primary-background)',
              backgroundHover: 'var(--vibr-elements-button-primary-backgroundHover)',
              text: 'var(--vibr-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--vibr-elements-button-secondary-background)',
              backgroundHover: 'var(--vibr-elements-button-secondary-backgroundHover)',
              text: 'var(--vibr-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--vibr-elements-button-danger-background)',
              backgroundHover: 'var(--vibr-elements-button-danger-backgroundHover)',
              text: 'var(--vibr-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--vibr-elements-item-contentDefault)',
            contentActive: 'var(--vibr-elements-item-contentActive)',
            contentAccent: 'var(--vibr-elements-item-contentAccent)',
            contentDanger: 'var(--vibr-elements-item-contentDanger)',
            backgroundDefault: 'var(--vibr-elements-item-backgroundDefault)',
            backgroundActive: 'var(--vibr-elements-item-backgroundActive)',
            backgroundAccent: 'var(--vibr-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--vibr-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--vibr-elements-actions-background)',
            code: {
              background: 'var(--vibr-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--vibr-elements-artifacts-background)',
            backgroundHover: 'var(--vibr-elements-artifacts-backgroundHover)',
            borderColor: 'var(--vibr-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--vibr-elements-artifacts-inlineCode-background)',
              text: 'var(--vibr-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--vibr-elements-messages-background)',
            linkColor: 'var(--vibr-elements-messages-linkColor)',
            code: {
              background: 'var(--vibr-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--vibr-elements-messages-inlineCode-background)',
              text: 'var(--vibr-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--vibr-elements-icon-success)',
            error: 'var(--vibr-elements-icon-error)',
            primary: 'var(--vibr-elements-icon-primary)',
            secondary: 'var(--vibr-elements-icon-secondary)',
            tertiary: 'var(--vibr-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--vibr-elements-preview-addressBar-background)',
              backgroundHover: 'var(--vibr-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--vibr-elements-preview-addressBar-backgroundActive)',
              text: 'var(--vibr-elements-preview-addressBar-text)',
              textActive: 'var(--vibr-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--vibr-elements-terminals-background)',
            buttonBackground: 'var(--vibr-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--vibr-elements-dividerColor)',
          loader: {
            background: 'var(--vibr-elements-loader-background)',
            progress: 'var(--vibr-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--vibr-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--vibr-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--vibr-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--vibr-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--vibr-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--vibr-elements-cta-background)',
            text: 'var(--vibr-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
