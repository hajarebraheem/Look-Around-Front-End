import React ,{Component} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      mapeCenter:{
          lat:this.props.lat,
          lng:this.props.lng
      }
    };


    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {
      return (
        <Map google={this.props.google}
        initialCenter={{
            lat:this.state.mapeCenter.lat,
            lng:this.state.mapeCenter.lng
        }}
        containerStyle={{width: 700, height: 200, position: 'relative',boxShadow:"10px 0 15px rgba(0,0,10,10)"}}
           
           
           >
          <Marker 

          position={{
            lat:this.state.mapeCenter.lat,

            lng:this.state.mapeCenter.lng
          }}
                   />
   

        </Map>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ("AIzaSyBBu2OsbvfrO6bkaVQNEx4Ioj721WUDSV4")
  })(MapContainer)