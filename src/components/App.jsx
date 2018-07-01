/* Main component */
import React from 'react'; /* Needed for a react component */
import Result from './Result'; /* Displaying the Result */
import '../style.css'; /* stylesheet file, alternative to inline styling which is possible in react  */
import data from '../data'; /* raw data */

export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state = data; /* set the state with the raw data */
	}

	/* handle the selection of each item in dropdown */
	handleClick = (e) => {
		var res = e.target.id; /* selected item */
		res = this.formDevicePointFromId(res);  /* generated object from 'id' value  */
		console.log(this.state.suitableLinkStation_power); 
		this.suitableLinkStation(this.state.linkStations,res,this.printLinkStation)	/* Algorithm for detecting the suitable Linkstation */
		
	}

	/* Generates the Object from the selected ID */

	formDevicePointFromId = (res) => {
		let arr = res.split(',')
		let x = parseInt(arr[0].substring(1));
		let y = parseInt(arr[1].substring(1));
		return {x,y} // same as {x:x,y:y}
	}

	/* Algorithm for detecting the suitable Linkstation */

	suitableLinkStation = (linkstation,device_point,cb) => {
		linkstation.map( link =>{
			this.calculatePower(link,this.calculateDistance(device_point,link));
		} 
	  )
		cb(device_point); /* Would call printLinkStation when the 'calculatePower()' is done executing   */
	}

	// The Objective is to print the suitable linkstation with respect to power.

	printLinkStation = (device_point) => {
		
		if(this.state.suitableLinkStation_power.length !== 0 ){
			 let result = `Best Link station for point (${device_point.x} , ${device_point.y}) is 
			 (${this.state.suitableLinkStation_power[0].x} , ${this.state.suitableLinkStation_power[0].y}) 
			 with power ${this.state.suitableLinkStation_power[0].power}`;

			 /*** 
			      set 'suitableLinkStation_power' empty array... Its contents 
			      could be dublicated and stored for feature use 
			      set the result to the output for the best Link station
			 ***/
			 this.setState({result,suitableLinkStation_power:[]});
			 
		}
		if(this.state.suitableLinkStation_power.length === 0 ) {
			let result = `No Link station within the reach for point: (${device_point.x} , ${device_point.y})`;
			this.setState({result});
		}
	}
	/* Calculate the distance between the Device point and the linkstation point */

	calculateDistance = (p2,p1) =>{
		const X = p2.x - p1.x;
		const Y = p2.y - p1.y;
		let xPower = Math.pow(X,2);
		let yPower = Math.pow(Y,2);
		let sum_of_power = xPower + yPower;
		return Math.abs(Math.round(Math.sqrt(sum_of_power)));
	}

	// calculates power of individual linkstation.

	calculatePower = (link, distance) => {
		
		let power = 0;
		let distanceValue = distance; 
		
		if(distanceValue > link.r) {
			power = 0;
			console.log("distance above reach: " + link.r + " " + power);
			//return power;
		}
		if(distanceValue <= link.r) {
			power = Math.pow((link.r - distanceValue),2);

			// It is possible to have multiple suitable link station with respect to power
			// One way to determine right link station the device could connect with is to
			// collect them into an array object in the state.
			// The reason for this is that, It is possible to have more information about 
			// other possible link station available if the best failed.

			this.state.suitableLinkStation_power.push({x:link.x,y:link.y,power:power})
			//console.log(this.state.suitableLinkStation_power.length);
			//console.log("distance below reach: "+ link.r + " " + power);
			//console.log(this.state.suitableLinkStation_power);

			this.sortSuitableLinkStationWithRespectToPower(this.state.suitableLinkStation_power);


		    
		}

	}

	// Sort in Descending order with respect to power.

	sortSuitableLinkStationWithRespectToPower = (suitableLinkStation) => {
		suitableLinkStation.sort((a,b) => b.power - a.power)
	}
	render(){
		return (

		<div className="wrapper">

			<div className="btn-group mylist">
			  <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Select the device point ( x , y )
			  </button>
			  <ul className="dropdown-menu">
			    <li className="dropdown-item item1 text-white bg-success" id="x0,y0" onClick={this.handleClick} >Device point at ( 0 , 0 )</li>
			    <li className="dropdown-item item2 text-white bg-success" id="x100,y100" onClick={this.handleClick}>Device point at ( 100 , 100 ) </li>
			    <li className="dropdown-item item3 text-white bg-success" id="x15,y10" onClick={this.handleClick} >Device point at ( 15 , 10 )</li>
			    <li className="dropdown-item item4 text-white bg-success" id="x18,y18" onClick={this.handleClick} >Device point at ( 18 , 18 )</li>
			  </ul>
			</div>
			<Result result = {this.state.result} />
		</div>

	     )
	}
}
