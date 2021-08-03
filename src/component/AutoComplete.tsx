import React from 'react'
import { observer } from 'mobx-react'

import { 
  Autocomplete as MuiAutocomplete, 
  AutocompleteRenderInputParams,
  AutocompleteChangeReason,
  AutocompleteChangeDetails
} from '@material-ui/core'

import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import type School from '../domain/School'

import SearchWidget from './SearchWidget'
import { useSchoolsService } from '../domain/SchoolsService'

const AutoComplete: React.FC<{
  onChange(
    event: React.SyntheticEvent<Element, Event>, 
    value: School | null, 
    reason: AutocompleteChangeReason, 
    details?: AutocompleteChangeDetails<School> | undefined
  ): void
}> = observer(({ onChange }) => {
  
  const [query, setQuery] = React.useState<string>('')

  const schoolsService = useSchoolsService()

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value === "" || ev.target.value === null) {
      setQuery('')
      getMatches('')
    }
    else if (ev.target.value.length >= 3 && ev.target.value !== query) {
      setQuery(ev.target.value)
      getMatches(ev.target.value)
    }
  }

  const getMatches = (value: string) => {
    const tokens = value.split(' ')
    schoolsService.getMatchingSchools(tokens)
  }

  return (
    <MuiAutocomplete
      options={schoolsService.matchingSchools}
      loading={schoolsService.loading}
      isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
      getOptionLabel={(option: any) => option.name}
      onChange={onChange}
      renderInput={
        (params: AutocompleteRenderInputParams) => (
          <SearchWidget 
            outerRef={params.InputProps.ref} 
            inputProps={params.inputProps}
            loading={schoolsService.loading}
            onChange={onInputChange}
          />
        )
      }
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue)
        const parts = parse(option.name, matches)
        return (
          <li {...props}>
            <div>
              {parts.map((part: any, index: number) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        )
      }}
    />
  )
})

export default AutoComplete