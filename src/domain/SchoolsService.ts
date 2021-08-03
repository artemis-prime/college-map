import { useContext } from 'react'
import fetch from 'cross-fetch'
import { MobXProviderContext } from 'mobx-react'
import { makeObservable, observable, action } from 'mobx'

import type School from './School'
import { COLLEGE_LOOKUP_API_KEY } from '../config'

// See src/setupProxy.js which solves the CORS issue

class SchoolsService {

  matchingSchools: School[] = []
  loading: boolean = false
  error: string = ''

  constructor() {
    makeObservable(
      this, {
        matchingSchools: observable,
        loading: observable,
        error: observable,
        getMatchingSchools: action
      }
    )
  }

  getMatchingSchools = (tokens: string[]): void => {

    if (tokens.length === 0) {
      this.matchingSchools = [] 
    }

    this.loading = true
    this.error = ''

    const match = tokens.join('%20')

    fetch(
      '/ed/collegescorecard/v1/schools.json?_fields=id,school.name,location.lat,location.lon&school.name=' + match,
      {
        headers: {
          'X-API-KEY': COLLEGE_LOOKUP_API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
    .then((res) => (res.json()))
    .then((schools) => {
          // as per spec at https://github.com/RTICWDT/open-data-maker/blob/master/API.md
        this.matchingSchools = schools.results.map((result: any): School => {
          //console.log("RECORD: " + JSON.stringify(result, null, 2))
          const school: School = {
            name: result['school.name'], 
            id: result.id
          }
          if (result['location.lat']) {
            school.location = {
              lat: result['location.lat'],
              lng: result['location.lon']
            }
          }
          return school
        })
      },
      (error) => {
        this.error = error
      }
    )
    .finally(() => {
      this.loading = false
    })
  }
  
    /*
  getAllSchools = (): void => {

    if (this.allSchools) {
      return 
    }

    this.loading = true
    this.error = ''
    fetch(
      '/ed/collegescorecard/v1/schools.json?_fields=id,school.name,location',
      {
        headers: {
          'X-API-KEY': API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
    .then((res) => (res.json()))
    .then((schools) => {
        console.log("META: " + JSON.stringify(schools.metadata, null, 2))

          // as per spec at https://github.com/RTICWDT/open-data-maker/blob/master/API.md
        this.allSchools = schools.results.map((result: any) => ({
          name: result['school.name'], 
          id: result.id
        }))
      },
      (error) => {
        this.error = error
      }
    )
    .finally(() => {
      this.loading = false
    })
  } 
    */

}

export const useSchoolsService = (): SchoolsService => {
  const { schoolsService } = useContext(MobXProviderContext)  
  return schoolsService as SchoolsService
}

export default new SchoolsService()