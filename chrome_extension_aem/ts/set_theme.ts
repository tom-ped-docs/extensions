// @ts-ignore
const setLight = () =>
{
  document.documentElement.classList.add( "light" );
};

// @ts-ignore
const setDark = () =>
{
  document.documentElement.classList.add( "dark" );
};

// on popup ...
chrome.storage.local.get( "selected_theme", ( { selected_theme } ) =>
{
  if ( selected_theme === "light" )
  {
    setLight();
  } else if ( selected_theme === "dark" )
  {
    setDark();
  } else
  {
    const PREFERS_COLOR_SCHEME = window.matchMedia( "(prefers-color-scheme: light)" );

    if ( PREFERS_COLOR_SCHEME.matches )
    {
      setLight();
    } else
    {
      setDark();
    }
  }
} );

// https://github.com/postcss/postcss-dark-theme-class
