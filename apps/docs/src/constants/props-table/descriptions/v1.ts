/**
 * Props description for v1
 */

import type { PropsDescriptionArgs } from '@/types';
import { getMuiDocsUrl } from '@/utils';

export const PropsDescription_v1 = Object.freeze({
  iconButtonProps: (args: PropsDescriptionArgs) => ({
    name: 'iconButtonProps',
    description: `[IconButtonProps](${getMuiDocsUrl(args.muiVersion)}/api/icon-button/) forwarded to the internal show/hide toggle \`IconButton\` — custom \`size\`, \`sx\`, etc. The interaction/accessibility essentials (\`type\`, \`onClick\`, \`onMouseDown\`, \`edge\`, \`disabled\`, \`aria-label\`) are controlled by the component.\n\n**Added in** \`v1.1\`.`,
    type: `[IconButtonProps](${getMuiDocsUrl(args.muiVersion)}/api/icon-button/)`,
    hasLinkInType: true
  }),
  menuItemProps: (args: PropsDescriptionArgs) => ({
    name: 'menuItemProps',
    description: `[MenuItemProps](${getMuiDocsUrl(args.muiVersion)}/api/menu-item/) forwarded to every rendered option's \`MenuItem\` — custom \`dense\`, \`divider\`, \`sx\`, etc. \`key\`, \`value\`, \`disabled\` and \`children\` are controlled by the component.\n\n**Added in** \`v1.1\`.`,
    type: `[MenuItemProps](${getMuiDocsUrl(args.muiVersion)}/api/menu-item/)`,
    hasLinkInType: true
  }),
  inputLabelProps: (args: PropsDescriptionArgs) => ({
    name: 'inputLabelProps',
    description: `[InputLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/input-label/) forwarded to the internal \`InputLabel\` — the inline label shown inside the field's outline. \`id\`, \`htmlFor\`, \`shrink\`, \`disabled\` and \`children\` are controlled by the component.\n\n**Added in** \`v1.1\`.`,
    type: `[InputLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/input-label/)`,
    hasLinkInType: true
  }),
  circularProgressProps: (args: PropsDescriptionArgs) => ({
    name: 'circularProgressProps',
    description: `[CircularProgressProps](${getMuiDocsUrl(args.muiVersion)}/api/circular-progress/) forwarded to the loading spinner shown while \`loading\` is true — custom \`color\`, \`size\`, etc.\n\n**Added in** \`v1.1\`.`,
    type: `[CircularProgressProps](${getMuiDocsUrl(args.muiVersion)}/api/circular-progress/)`,
    hasLinkInType: true
  }),
  searchCountryProps: {
    name: 'searchCountryProps',
    description:
        'Options for the inline country search field in the country dropdown — `allowCountrySearch`, `textFieldProps`, `renderCountryMenuItem`, `noCountryFoundText`, `menuItemProps` (forwarded to every country `MenuItem`, including the disabled "no results" item).\n\n`menuItemProps` **added in** `v1.1`. ',
    type: 'SearchCountryProps'
  },
  countrySelectProps: {
    name: 'countrySelectProps',
    description:
      'Props forwarded to the internal MUI `Select` that renders the flag/dial-code trigger and country dropdown — e.g. a custom `size` or `sx` (merged with the component\'s own). `value`, `defaultValue`, `onChange`, `onOpen`, `onClose`, `renderValue`, `MenuProps`, `disabled`, `children` and `ref` are controlled by the component.\n\n**Added in** `v1.1`.',
    type: 'CountrySelectProps'
  },
});
