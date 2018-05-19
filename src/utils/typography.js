import Typography from "typography"
import oceanBeachTheme from 'typography-theme-ocean-beach'
oceanBeachTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    textShadow: `none`,
    textDecoration: `none`
  }
})

const typography = new Typography(oceanBeachTheme);

export default typography;