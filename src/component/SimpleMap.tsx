import React, { useState } from 'react'

import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'

import GoogleMapReact from 'google-map-react'
import type School from '../domain/School'

import { GOOGLE_MAPS_API_KEY } from '../config'

const mapProps = {
  center: {
    lat: 42.6526,
    lng: -73.7562
  },
  zoom: 11
}

const LABEL_WIDTH = 120
const LABEL_HEIGHT = 60
const MARKER_HEIGHT = 24

const Marker: React.FC<{
  lat: number,
  lng: number,
  text: string
}> = ({ text }) => {
  return (
    <div style={{
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: LABEL_WIDTH,
      height: LABEL_HEIGHT + MARKER_HEIGHT,
      left: -LABEL_WIDTH / 2,
      top: -(LABEL_HEIGHT + MARKER_HEIGHT),
    }}>
      <div style={{
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        //border: '0.5px solid #f44336',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: LABEL_WIDTH,
          height: LABEL_HEIGHT,
        
          border: '2px solid #f44336',
          borderRadius: '5px',
          backgroundColor: 'white',
          textAlign: 'center',
          color: '#3f51b5',
          fontSize: 12,
          fontWeight: 'normal',
          padding: 6
        }}>{text}</div>
        <div>
          <RoomOutlinedIcon style={{height: MARKER_HEIGHT, color: '#e42336'}}/>
        </div>
      </div>
    </div>
  )
}




const SimpleMap: React.FC<{
  current: School | null
}> = ({current}) => {

  return (
    <div style={{ height: '80vh', width: '80%', maxWidth: 1000, margin: '0 auto'}}>
      {!current && 
        <>
        <div style={{ height: 100, width: '80%', maxWidth: 1000, margin: '0 auto'}}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
          defaultCenter={mapProps.center}
          defaultZoom={mapProps.zoom}
        />
        </>
      }
      {current && !current.location && 
        <>
        <div style={{ height: 100, width: '80%', maxWidth: 1000, margin: '0 auto'}}>
          <p>No location info for {current.name}</p>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
          defaultCenter={mapProps.center}
          defaultZoom={mapProps.zoom}
        >
          <Marker
            lat={mapProps.center.lat}
            lng={mapProps.center.lng}
            text="(No location)"
          />
        </GoogleMapReact>
        </>
      }
      {current && current.location && 
        <>
        <div style={{ height: 100, width: '80%', maxWidth: 1000, margin: '0 auto'}}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
          defaultCenter={current.location}
          defaultZoom={mapProps.zoom}
        >
          <Marker
            lat={current.location.lat}
            lng={current.location.lng}
            text={current.name}
          />
        </GoogleMapReact>
        </>
      }
    </div>
  )
}

export default SimpleMap