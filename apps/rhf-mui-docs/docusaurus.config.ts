import 'dotenv/config';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type { ThemeConfig } from '@docusaurus/preset-classic';

const config: Config = {
  url: 'https://rhf-mui-components.github.io',
  baseUrl: '/',
  projectName: '@nish1896/rhf-mui-components',
  organizationName: 'nish1896',
  title: '@nish1896/rhf-mui-components',
  tagline: 'Create and Style forms effortlessly within minutes!',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v3',
            },
          },
        }
      }
    ]
  ],
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
        anonymizeIP: true,
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true
    },
    navbar: {
      title: 'RHF-MUI Components',
      logo: {
        alt: 'Website Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          href: 'https://rhf-mui-components-examples.netlify.app/',
          label: 'Playground',
          position: 'right'
        },
        {
          href: 'https://github.com/nishkohli96/rhf-mui-examples',
          label: 'Code Examples',
          position: 'right'
        },
        {
          href: 'https://github.com/nishkohli96/rhf-mui-components',
          label: 'GitHub',
          position: 'right'
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ]
    },
    footer: {
      style: 'light',
      links: [
        {
          html: `
            <a href="https://github.com/nishkohli96" target="_blank" rel="noreferrer noopener" aria-label="Nishant's Github">
              <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMTAuOSwyLjFjLTQuNiwwLjUtOC4zLDQuMi04LjgsOC43Yy0wLjUsNC43LDIuMiw4LjksNi4zLDEwLjVDOC43LDIxLjQsOSwyMS4yLDksMjAuOHYtMS42YzAsMC0wLjQsMC4xLTAuOSwwLjEgYy0xLjQsMC0yLTEuMi0yLjEtMS45Yy0wLjEtMC40LTAuMy0wLjctMC42LTFDNS4xLDE2LjMsNSwxNi4zLDUsMTYuMkM1LDE2LDUuMywxNiw1LjQsMTZjMC42LDAsMS4xLDAuNywxLjMsMWMwLjUsMC44LDEuMSwxLDEuNCwxIGMwLjQsMCwwLjctMC4xLDAuOS0wLjJjMC4xLTAuNywwLjQtMS40LDEtMS44Yy0yLjMtMC41LTQtMS44LTQtNGMwLTEuMSwwLjUtMi4yLDEuMi0zQzcuMSw4LjgsNyw4LjMsNyw3LjZjMC0wLjQsMC0wLjksMC4yLTEuMyBDNy4yLDYuMSw3LjQsNiw3LjUsNmMwLDAsMC4xLDAsMC4xLDBDOC4xLDYuMSw5LjEsNi40LDEwLDcuM0MxMC42LDcuMSwxMS4zLDcsMTIsN3MxLjQsMC4xLDIsMC4zYzAuOS0wLjksMi0xLjIsMi41LTEuMyBjMCwwLDAuMSwwLDAuMSwwYzAuMiwwLDAuMywwLjEsMC40LDAuM0MxNyw2LjcsMTcsNy4yLDE3LDcuNmMwLDAuOC0wLjEsMS4yLTAuMiwxLjRjMC43LDAuOCwxLjIsMS44LDEuMiwzYzAsMi4yLTEuNywzLjUtNCw0IGMwLjYsMC41LDEsMS40LDEsMi4zdjIuNmMwLDAuMywwLjMsMC42LDAuNywwLjVjMy43LTEuNSw2LjMtNS4xLDYuMy05LjNDMjIsNi4xLDE2LjksMS40LDEwLjksMi4xeiI+PC9wYXRoPgo8L3N2Zz4="/>
            </a>
            <a href="https://instagram.com/nocturnal_nish" style="margin:0px 10px;" target="_blank" rel="noreferrer noopener" aria-label="Nishant's Instagram">
              <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxyYWRpYWxHcmFkaWVudCBpZD0ieU9ybm5obGlDcmRTMmd5fjR0RDhtYV9YeTEwSmN1MUwyU3VfZ3IxIiBjeD0iMTkuMzgiIGN5PSI0Mi4wMzUiIHI9IjQ0Ljg5OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZkNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjMyOCIgc3RvcC1jb2xvcj0iI2ZmNTQzZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjM0OCIgc3RvcC1jb2xvcj0iI2ZjNTI0NSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjUwNCIgc3RvcC1jb2xvcj0iI2U2NDc3MSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjY0MyIgc3RvcC1jb2xvcj0iI2Q1M2U5MSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjc2MSIgc3RvcC1jb2xvcj0iI2NjMzlhNCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjg0MSIgc3RvcC1jb2xvcj0iI2M4MzdhYiI+PC9zdG9wPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN5T3JubmhsaUNyZFMyZ3l+NHREOG1hX1h5MTBKY3UxTDJTdV9ncjEpIiBkPSJNMzQuMDE3LDQxLjk5bC0yMCwwLjAxOWMtNC40LDAuMDA0LTguMDAzLTMuNTkyLTguMDA4LTcuOTkybC0wLjAxOS0yMAljLTAuMDA0LTQuNCwzLjU5Mi04LjAwMyw3Ljk5Mi04LjAwOGwyMC0wLjAxOWM0LjQtMC4wMDQsOC4wMDMsMy41OTIsOC4wMDgsNy45OTJsMC4wMTksMjAJQzQyLjAxNCwzOC4zODMsMzguNDE3LDQxLjk4NiwzNC4wMTcsNDEuOTl6Ij48L3BhdGg+PHJhZGlhbEdyYWRpZW50IGlkPSJ5T3JubmhsaUNyZFMyZ3l+NHREOG1iX1h5MTBKY3UxTDJTdV9ncjIiIGN4PSIxMS43ODYiIGN5PSI1LjU0IiByPSIyOS44MTMiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLjY2NjMgMCAxLjg0OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MTY4YzkiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii45OTkiIHN0b3AtY29sb3I9IiM0MTY4YzkiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN5T3JubmhsaUNyZFMyZ3l+NHREOG1iX1h5MTBKY3UxTDJTdV9ncjIpIiBkPSJNMzQuMDE3LDQxLjk5bC0yMCwwLjAxOWMtNC40LDAuMDA0LTguMDAzLTMuNTkyLTguMDA4LTcuOTkybC0wLjAxOS0yMAljLTAuMDA0LTQuNCwzLjU5Mi04LjAwMyw3Ljk5Mi04LjAwOGwyMC0wLjAxOWM0LjQtMC4wMDQsOC4wMDMsMy41OTIsOC4wMDgsNy45OTJsMC4wMTksMjAJQzQyLjAxNCwzOC4zODMsMzguNDE3LDQxLjk4NiwzNC4wMTcsNDEuOTl6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0LDMxYy0zLjg1OSwwLTctMy4xNC03LTdzMy4xNDEtNyw3LTdzNywzLjE0LDcsN1MyNy44NTksMzEsMjQsMzF6IE0yNCwxOWMtMi43NTcsMC01LDIuMjQzLTUsNQlzMi4yNDMsNSw1LDVzNS0yLjI0Myw1LTVTMjYuNzU3LDE5LDI0LDE5eiI+PC9wYXRoPjxjaXJjbGUgY3g9IjMxLjUiIGN5PSIxNi41IiByPSIxLjUiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zMCwzN0gxOGMtMy44NTksMC03LTMuMTQtNy03VjE4YzAtMy44NiwzLjE0MS03LDctN2gxMmMzLjg1OSwwLDcsMy4xNCw3LDd2MTIJQzM3LDMzLjg2LDMzLjg1OSwzNywzMCwzN3ogTTE4LDEzYy0yLjc1NywwLTUsMi4yNDMtNSw1djEyYzAsMi43NTcsMi4yNDMsNSw1LDVoMTJjMi43NTcsMCw1LTIuMjQzLDUtNVYxOGMwLTIuNzU3LTIuMjQzLTUtNS01SDE4eiI+PC9wYXRoPgo8L3N2Zz4="/>
            </a>
            <a href="https://www.linkedin.com/in/nishkohli96/" target="_blank" rel="noreferrer noopener" aria-label="Nishant's Linkedin">
              <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiMwMDc4ZDQiIGQ9Ik00MiwzN2MwLDIuNzYyLTIuMjM4LDUtNSw1SDExYy0yLjc2MSwwLTUtMi4yMzgtNS01VjExYzAtMi43NjIsMi4yMzktNSw1LTVoMjZjMi43NjIsMCw1LDIuMjM4LDUsNQlWMzd6Ij48L3BhdGg+PHBhdGggZD0iTTMwLDM3VjI2LjkwMWMwLTEuNjg5LTAuODE5LTIuNjk4LTIuMTkyLTIuNjk4Yy0wLjgxNSwwLTEuNDE0LDAuNDU5LTEuNzc5LDEuMzY0CWMtMC4wMTcsMC4wNjQtMC4wNDEsMC4zMjUtMC4wMzEsMS4xMTRMMjYsMzdoLTdWMThoN3YxLjA2MUMyNy4wMjIsMTguMzU2LDI4LjI3NSwxOCwyOS43MzgsMThjNC41NDcsMCw3LjI2MSwzLjA5Myw3LjI2MSw4LjI3NAlMMzcsMzdIMzB6IE0xMSwzN1YxOGgzLjQ1N0MxMi40NTQsMTgsMTEsMTYuNTI4LDExLDE0LjQ5OUMxMSwxMi40NzIsMTIuNDc4LDExLDE0LjUxNCwxMWMyLjAxMiwwLDMuNDQ1LDEuNDMxLDMuNDg2LDMuNDc5CUMxOCwxNi41MjMsMTYuNTIxLDE4LDE0LjQ4NSwxOEgxOHYxOUgxMXoiIG9wYWNpdHk9Ii4wNSI+PC9wYXRoPjxwYXRoIGQ9Ik0zMC41LDM2LjV2LTkuNTk5YzAtMS45NzMtMS4wMzEtMy4xOTgtMi42OTItMy4xOThjLTEuMjk1LDAtMS45MzUsMC45MTItMi4yNDMsMS42NzcJYy0wLjA4MiwwLjE5OS0wLjA3MSwwLjk4OS0wLjA2NywxLjMyNkwyNS41LDM2LjVoLTZ2LTE4aDZ2MS42MzhjMC43OTUtMC44MjMsMi4wNzUtMS42MzgsNC4yMzgtMS42MzgJYzQuMjMzLDAsNi43NjEsMi45MDYsNi43NjEsNy43NzRMMzYuNSwzNi41SDMwLjV6IE0xMS41LDM2LjV2LTE4aDZ2MThIMTEuNXogTTE0LjQ1NywxNy41Yy0xLjcxMywwLTIuOTU3LTEuMjYyLTIuOTU3LTMuMDAxCWMwLTEuNzM4LDEuMjY4LTIuOTk5LDMuMDE0LTIuOTk5YzEuNzI0LDAsMi45NTEsMS4yMjksMi45ODYsMi45ODljMCwxLjc0OS0xLjI2OCwzLjAxMS0zLjAxNSwzLjAxMUgxNC40NTd6IiBvcGFjaXR5PSIuMDciPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIsMTloNXYxN2gtNVYxOXogTTE0LjQ4NSwxN2gtMC4wMjhDMTIuOTY1LDE3LDEyLDE1Ljg4OCwxMiwxNC40OTlDMTIsMTMuMDgsMTIuOTk1LDEyLDE0LjUxNCwxMgljMS41MjEsMCwyLjQ1OCwxLjA4LDIuNDg2LDIuNDk5QzE3LDE1Ljg4NywxNi4wMzUsMTcsMTQuNDg1LDE3eiBNMzYsMzZoLTV2LTkuMDk5YzAtMi4xOTgtMS4yMjUtMy42OTgtMy4xOTItMy42OTgJYy0xLjUwMSwwLTIuMzEzLDEuMDEyLTIuNzA3LDEuOTlDMjQuOTU3LDI1LjU0MywyNSwyNi41MTEsMjUsMjd2OWgtNVYxOWg1djIuNjE2QzI1LjcyMSwyMC41LDI2Ljg1LDE5LDI5LjczOCwxOQljMy41NzgsMCw2LjI2MSwyLjI1LDYuMjYxLDcuMjc0TDM2LDM2TDM2LDM2eiI+PC9wYXRoPgo8L3N2Zz4="/>
            </a>
            <a href="mailto:nishantkohli96@gmail.com" style="margin-left:10px;" target="_blank" rel="noreferrer noopener" aria-label="Email Nishant">
              <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik00NSwxNi4ybC01LDIuNzVsLTUsNC43NUwzNSw0MGg3YzEuNjU3LDAsMy0xLjM0MywzLTNWMTYuMnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWU4OGU1IiBkPSJNMywxNi4ybDMuNjE0LDEuNzFMMTMsMjMuN1Y0MEg2Yy0xLjY1NywwLTMtMS4zNDMtMy0zVjE2LjJ6Ij48L3BhdGg+PHBvbHlnb24gZmlsbD0iI2U1MzkzNSIgcG9pbnRzPSIzNSwxMS4yIDI0LDE5LjQ1IDEzLDExLjIgMTIsMTcgMTMsMjMuNyAyNCwzMS45NSAzNSwyMy43IDM2LDE3Ij48L3BvbHlnb24+PHBhdGggZmlsbD0iI2M2MjgyOCIgZD0iTTMsMTIuMjk4VjE2LjJsMTAsNy41VjExLjJMOS44NzYsOC44NTlDOS4xMzIsOC4zMDEsOC4yMjgsOCw3LjI5OCw4aDBDNC45MjQsOCwzLDkuOTI0LDMsMTIuMjk4eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00NSwxMi4yOThWMTYuMmwtMTAsNy41VjExLjJsMy4xMjQtMi4zNDFDMzguODY4LDguMzAxLDM5Ljc3Miw4LDQwLjcwMiw4aDAgQzQzLjA3Niw4LDQ1LDkuOTI0LDQ1LDEyLjI5OHoiPjwvcGF0aD4KPC9zdmc+"/>
            </a>
          `
        }
      ],
      copyright: 'Made with ❤️ by Nish!!!!'
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['diff'],
    },
    customFields: {
      githubLink: `
        <a href="https://github.com/nishkohli96" target="_blank" rel="noreferrer noopener" aria-label="Nishant's Github">
          <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMTAuOSwyLjFjLTQuNiwwLjUtOC4zLDQuMi04LjgsOC43Yy0wLjUsNC43LDIuMiw4LjksNi4zLDEwLjVDOC43LDIxLjQsOSwyMS4yLDksMjAuOHYtMS42YzAsMC0wLjQsMC4xLTAuOSwwLjEgYy0xLjQsMC0yLTEuMi0yLjEtMS45Yy0wLjEtMC40LTAuMy0wLjctMC42LTFDNS4xLDE2LjMsNSwxNi4zLDUsMTYuMkM1LDE2LDUuMywxNiw1LjQsMTZjMC42LDAsMS4xLDAuNywxLjMsMWMwLjUsMC44LDEuMSwxLDEuNCwxIGMwLjQsMCwwLjctMC4xLDAuOS0wLjJjMC4xLTAuNywwLjQtMS40LDEtMS44Yy0yLjMtMC41LTQtMS44LTQtNGMwLTEuMSwwLjUtMi4yLDEuMi0zQzcuMSw4LjgsNyw4LjMsNyw3LjZjMC0wLjQsMC0wLjksMC4yLTEuMyBDNy4yLDYuMSw3LjQsNiw3LjUsNmMwLDAsMC4xLDAsMC4xLDBDOC4xLDYuMSw5LjEsNi40LDEwLDcuM0MxMC42LDcuMSwxMS4zLDcsMTIsN3MxLjQsMC4xLDIsMC4zYzAuOS0wLjksMi0xLjIsMi41LTEuMyBjMCwwLDAuMSwwLDAuMSwwYzAuMiwwLDAuMywwLjEsMC40LDAuM0MxNyw2LjcsMTcsNy4yLDE3LDcuNmMwLDAuOC0wLjEsMS4yLTAuMiwxLjRjMC43LDAuOCwxLjIsMS44LDEuMiwzYzAsMi4yLTEuNywzLjUtNCw0IGMwLjYsMC41LDEsMS40LDEsMi4zdjIuNmMwLDAuMywwLjMsMC42LDAuNywwLjVjMy43LTEuNSw2LjMtNS4xLDYuMy05LjNDMjIsNi4xLDE2LjksMS40LDEwLjksMi4xeiI+PC9wYXRoPgo8L3N2Zz4="/>
        </a>
      `
    }
  } satisfies ThemeConfig
};

export default config;
