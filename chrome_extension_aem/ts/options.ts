const APPEARANCE__SELECT_THEME = document.querySelector( "#appearance__select-theme" ) as HTMLSelectElement;

const EXTENSIONS__SPAN_SAMSUNG = document.querySelector( "#extensions__span-samsung" ) as HTMLSpanElement;
const EXTENSIONS__SPAN_IQOS = document.querySelector( "#extensions__span-iqos" ) as HTMLSpanElement;
const EXTENSIONS__SPAN_TOOLS = document.querySelector( "#extensions__span-tools" ) as HTMLSpanElement;

const EXTENSIONS__INPUT_SAMSUNG = document.querySelector( "#extensions__input-samsung" ) as HTMLInputElement;
const EXTENSIONS__INPUT_IQOS = document.querySelector( "#extensions__input-iqos" ) as HTMLInputElement;
const EXTENSIONS__INPUT_TOOLS = document.querySelector( "#extensions__input-tools" ) as HTMLInputElement;

const SAMSUNG__INPUT_USER_ID = document.querySelector( "#samsung__input-user-id" ) as HTMLInputElement;
const SAMSUNG__INPUT_USER_EMAIL = document.querySelector( "#samsung__input-user-email" ) as HTMLInputElement;

// on popup ...
chrome.storage.local.get( [ "user_id", "user_email", "is_aem_samsung_visible", "is_aem_iqos_visible", "is_tools_visible", "selected_theme" ], ( { user_id, user_email, is_aem_samsung_visible, is_aem_iqos_visible, is_tools_visible, selected_theme } ) =>
{
  for ( let option of Array.from( APPEARANCE__SELECT_THEME.options ) )
  {
    if ( option.value === selected_theme )
    {
      option.selected = true;
    }
  }

  if ( is_aem_samsung_visible === true )
  {
    EXTENSIONS__SPAN_SAMSUNG.textContent = "On";
    EXTENSIONS__INPUT_SAMSUNG.setAttribute( "checked", "" );
  }

  if ( is_aem_iqos_visible === true )
  {
    EXTENSIONS__SPAN_IQOS.textContent = "On";
    EXTENSIONS__INPUT_IQOS.setAttribute( "checked", "" );
  }

  if ( is_tools_visible === true )
  {
    EXTENSIONS__SPAN_TOOLS.textContent = "On";
    EXTENSIONS__INPUT_TOOLS.setAttribute( "checked", "" );
  }

  SAMSUNG__INPUT_USER_ID.value = user_id;
  SAMSUNG__INPUT_USER_EMAIL.value = user_email;
} );

/*
 * ------------------------- appearance -------------------------
 */

// set "selected_theme" var
APPEARANCE__SELECT_THEME.addEventListener( "change", () =>
{
  chrome.storage.local.set( { selected_theme: APPEARANCE__SELECT_THEME.selectedOptions[ 0 ].value } );
  location.reload();
} );

/*
 * ------------------------- shortcuts -------------------------
 */

const SHORTCUTS__BUTTON_EDIT = document.querySelector( "#shortcuts__button-edit" ) as HTMLButtonElement;

// on popup ...
const setShortcuts = () =>
{
  const MANIFEST = chrome.runtime.getManifest();
  const COMMANDS = MANIFEST.commands._execute_action.suggested_key.default;
  const KEYS = COMMANDS.split( "+" );

  for ( let key of KEYS )
  {
    const BUTTON = document.createElement( "button" ) as HTMLButtonElement;

    BUTTON.setAttribute( "class", "button button--accent shortcuts__key" );
    BUTTON.textContent = key;
    SHORTCUTS__BUTTON_EDIT.parentElement.insertBefore( BUTTON, SHORTCUTS__BUTTON_EDIT );
  }
};
setShortcuts();

SHORTCUTS__BUTTON_EDIT.addEventListener( "click", () =>
{
  chrome.tabs.create( { url: "chrome://extensions/shortcuts" } );
} );

/*
 * ------------------------- extensions -------------------------
 */

const setAttributes = ( INPUT: HTMLInputElement, is_visible: string, SPAN: HTMLSpanElement ) =>
{
  if ( INPUT.hasAttribute( "checked" ) )
  {
    chrome.storage.local.set( { [ is_visible ]: false } );
    SPAN.textContent = "Off";
    INPUT.removeAttribute( "checked" );
  } else
  {
    chrome.storage.local.set( { [ is_visible ]: true } );
    SPAN.textContent = "On";
    INPUT.setAttribute( "checked", "" );
  }
};

// set "is_aem_samsung_visible" var
EXTENSIONS__INPUT_SAMSUNG.addEventListener( "click", () =>
{
  setAttributes( EXTENSIONS__INPUT_SAMSUNG, "is_aem_samsung_visible", EXTENSIONS__SPAN_SAMSUNG );
} );

// set "is_aem_iqos_visible" var
EXTENSIONS__INPUT_IQOS.addEventListener( "click", () =>
{
  setAttributes( EXTENSIONS__INPUT_IQOS, "is_aem_iqos_visible", EXTENSIONS__SPAN_IQOS );
} );

// set "is_tools_visible" var
EXTENSIONS__INPUT_TOOLS.addEventListener( "click", () =>
{
  setAttributes( EXTENSIONS__INPUT_TOOLS, "is_tools_visible", EXTENSIONS__SPAN_TOOLS );
} );

/*
 * ------------------------- aem (samsung) -------------------------
 */

// set "user_id" var
document.querySelector( "#samsung__button-save-user-id" ).addEventListener( "click", () =>
{
  chrome.storage.local.set( { user_id: SAMSUNG__INPUT_USER_ID.value } );
} );

// set "user_email" var
document.querySelector( "#samsung__button-save-user-email" ).addEventListener( "click", () =>
{
  chrome.storage.local.set( { user_email: SAMSUNG__INPUT_USER_EMAIL.value } );
} );

// ------------------------- tooltips -------------------------

var tooltipTriggerList = [].slice.call( document.querySelectorAll( '[data-bs-toggle="tooltip"]' ) );
var tooltipList = tooltipTriggerList.map( function ( tooltipTriggerEl )
{
  // @ts-ignore
  return new bootstrap.Tooltip( tooltipTriggerEl );
} );
