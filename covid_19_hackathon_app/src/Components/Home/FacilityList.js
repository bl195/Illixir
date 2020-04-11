import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Facility = props => (
  <tr>
    <td>{ props.facility.attributes.NAME }</td>
    <td>{ props.facility.attributes.ADDRESS }</td>
    <td>{ props.facility.attributes.CITY }</td>
    <td>{ props.facility.attributes.STATE }</td>
    <td>
    <Button variant="outlined" color="primary" component={Link} to={
      "/information?state="+props.user.state
      +"&city="+props.user.city
      +"&streetAddress="+props.user.streetAddress
      +"&zipcode="+props.user.zipcode
      +"&facility="+props.user.facility
      +"&userLongitude="+props.user.userLongitude
      +"&userLatitude="+props.user.userLatitude
      +"&latitude="+props.facility.attributes.LATITUDE
      +"&longitude="+props.facility.attributes.LONGITUDE
    }>
      More Info
    </Button>
    </td>
  </tr>
)

class FacilityList extends Component{
  constructor(props) {
    super();
    //this.geoAddress = this.geoAddress.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      facility: "",
      zipcode: "",
      streetAddress: "",
      facilities: [],
    };
  }
  componentDidMount(){
    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      state: params.get("state"),
      city: params.get("city"),
      zipcode: params.get("zipcode"),
      streetAddress: params.get("streetAddress"),
      facility: params.get("facility"),
    })
    axios.get('http://localhost:5000/api/'+params.get("facility")+'/')
      .then(response => {
        const filter1 = response.data.filter(d => d.attributes.STATE === this.state.state);
        this.setState({
          facilities: filter1,
        })
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

    //var geocoder = new window.google.maps.Geocoder();
    //var address = params.get("streetAddress") + ", " + params.get("city") + ", " + params.get("state") + " " + params.get("zipcode");
    //var address = params.get("streetAddress") + ", " + params.get("city") + ", " + params.get("state") + " " + params.get("zipcode")
    //this.geoAddress(geocoder, address, params.get("facility"));

  // geoAddress(geocoder, address, facility){
  //   alert("geocod");
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     if (status == window.google.maps.GeocoderStatus.OK) {
  //       var lat = results[0].geometry.location.lat();
  //       var long = results[0].geometry.location.lng();
  //       alert(lat);
  //       alert(long);
  //       const backendRequest = "http://localhost:5000/api/"+facility+"/";
  //       axios.get(backendRequest)
  //         .then(response => {
  //           alert(JSON.stringify(response.data));
  //           const f1 = response.data.filter(d => Math.abs(d.attributes.LATITUDE - lat) < 2);
  //           alert("F1: "+ JSON.stringify(f1));
  //
  //           const f2 = f1.filter(d => Math.abs(d.attributes.LONGITUDE - long) < 2);
  //           alert("F2 "+ JSON.stringify(f2));
  //           this.setState({
  //             facilities: f2,
  //           })
  //         })
  //         .catch(error => {
  //           console.log("ERROR: " + error);
  //           return "error";
  //         });
  //     }
  //     else{
  //       alert("no");
  //     }
  //   })
  // }


  facilitiesList() {
    const user = {
      city: this.state.city,
      state: this.state.state,
      userLatitude: this.state.latitude,
      userLongitude: this.state.longitude,
      facility: this.state.facility,
      zipcode: this.state.zipcode,
      streetAddress: this.state.streetAddress,
    }
    //
    // var geocoder = new window.google.maps.Geocoder();
    // var address = this.state.streetAddress + ", " + this.state.city + ", " + this.state.state + " " + this.state.zipcode;
    //
    // alert("geocod");
    // const facilities = [];
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //   if (status == window.google.maps.GeocoderStatus.OK) {
    //     var lat = results[0].geometry.location.lat();
    //     var long = results[0].geometry.location.lng();
    //     alert(lat);
    //     alert(long);
    //     const backendRequest = "http://localhost:5000/api/"+facility+"/";
    //     axios.get(backendRequest)
    //       .then(response => {
    //         alert(JSON.stringify(response.data));
    //         const f1 = response.data.filter(d => Math.abs(d.attributes.LATITUDE - lat) < 2);
    //         alert("F1: "+ JSON.stringify(f1));
    //
    //         const f2 = f1.filter(d => Math.abs(d.attributes.LONGITUDE - long) < 2);
    //         alert("F2 "+ JSON.stringify(f2));
    //         facilities = f2;
    //       })
    //       .catch(error => {
    //         console.log("ERROR: " + error);
    //         return "error";
    //       });
    //   }
    //   else{
    //     alert("no");
    //   }
    // })
    //
    // alert(JSON.string);
    return this.state.facilities.map(current => {
      return <Facility facility={current} user={user}/>;
    })
  }
  render(){
    return(
      <div className="sidebar-page">
      <div className="list-content">
        <h1 className="list-title">#nearby!</h1>
      </div>
      <div>
        <table className="table">
          <thread className="thread-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thread>
          <tbody>
            { this.facilitiesList() }
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}

export default FacilityList
