import React from 'react'

import { CircularProgress, InputBase } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles' 
import { alpha, Theme } from '@material-ui/core/styles'

//import {DebounceInput} from 'react-debounce-input'

/** 
 * 
 * Search widget that handles debouncing and MUI theming 
 * 
 * */

/*
const MIN_CHAR = 3
const DEBOUNCE_TIME = 300
const PLACEHOLDER_TEXT = 'Search...'
*/

const useStyles = makeStyles((theme: Theme) => ({
  searchOuter: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIconOuter: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputBase: {

    '& .MuiInputBase-input': {
      color: theme.palette.common.white,
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },

      border: 0,
      boxSizing: 'content-box',
      background: 'none',
      display: 'block',
      animationName: 'mui-auto-fill-cancel',
      animationDuration: '10ms',
    
      '&:focus': {
        outline: 'none'
      },
      '&::placeholder': {
        color: '#eee',
      }
    }
  }

}))

  // There is a bug in this that prevents it from being used in autocomplete.
  /*
const DebouncingInput = (props: any) => (
  <DebounceInput
    minLength={MIN_CHAR}
    debounceTimeout={DEBOUNCE_TIME}
    onChange={props.onChange ? props.onChange : () => {}}
    placeholder={PLACEHOLDER_TEXT}
    className='MuiInputBase-input'
    {...props}
  />
)
  */

const SearchWidget: React.FC<{
  inputProps?: any,
  outerRef?: React.Ref<any>,
  loading?: boolean,
  onChange?: any
}> = ({
  inputProps,
  outerRef,
  onChange,
  loading = false
}) => {
  const s = useStyles()
    // Ref is needed to position the suggestions Popper
  return (
    <div ref={outerRef} className={s.searchOuter}>
      <div className={s.searchIconOuter}>
        <SearchIcon />
      </div>
      <InputBase 
        className={s.searchInputBase}
        inputProps={inputProps}
        endAdornment={loading ? <CircularProgress color="inherit" size={20} /> : null}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchWidget
