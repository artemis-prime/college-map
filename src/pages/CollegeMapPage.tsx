import React, { useState } from 'react'

import { 
  AppBar, 
  Toolbar,
  AutocompleteChangeReason,
  AutocompleteChangeDetails
} from '@material-ui/core' 

import { makeStyles } from '@material-ui/styles' 
import { Theme } from '@material-ui/core/styles'

import { AutoComplete, Logo, SimpleMap} from '../component'

import type School from '../domain/School'

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    alignItems: 'center'
  },
  toolbar: {
    width: '100%',
    maxWidth: 1200,
    justifyContent: 'space-between'
  },
}))


const CollegeMapPage = () => {
  const s = useStyles()

  const [school, setSchool] = useState<School | null>(null)

  const onChange = (
    event: React.SyntheticEvent<Element, Event>, 
    value: School | null, 
    reason: AutocompleteChangeReason, 
    details?: AutocompleteChangeDetails<School> | undefined
  ): void => {
    setSchool(value)
  }  
  
  return (
    <>
      <AppBar position="fixed" className={s.appbar}>
        <Toolbar className={s.toolbar}>
          <Logo />
          <AutoComplete onChange={onChange}/>
          <div>|</div>
        </Toolbar> 
      </AppBar>
      <SimpleMap current={school}/>
    </>
  )
}

export default CollegeMapPage