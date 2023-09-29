/* eslint-disable react/prop-types */
import { Input, Button } from 'antd'
import { useState } from 'react'

function ControlPanel(props) {
  const [longitude, setLongitude] = useState(-74)
  const [latitude, setLatitude] = useState(40)
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        margin: '12px',
        padding: '10px',
        boxShadow: '0 0 4px rgba(0,0,0,.15)',
        background: '#fff',
        borderRadius: '6px',
      }}
    >
      <div>
        <Input
          placeholder="Longitude"
          value={longitude}
          onChange={(evt) => setLongitude(evt.target.value)}
          style={{ width: '80px', marginRight: '10px' }}
        />
        <Input
          placeholder="Latitude"
          value={latitude}
          onChange={(evt) => setLatitude(evt.target.value)}
          style={{ width: '80px', marginRight: '10px' }}
        />
      </div>
      <div style={{ marginTop: '6px', width: '100%' }}>
        <Button
          type="primary"
          onClick={() => {
            props.onSelectPosition({
              longitude: parseFloat(longitude),
              latitude: parseFloat(latitude),
            })
          }}
          block
        >
          Fly To
        </Button>
      </div>
    </div>
  )
}

export default ControlPanel
