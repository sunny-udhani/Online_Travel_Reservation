import React, {Component} from 'react'
import '../styles/card.css';
import "../bootstrap/dist/css/bootstrap.min.css";
import Card2 from './Card2.jsx';
import Summary from './Summary.js';



class Card extends Component {
    constructor(){
        super();

    };

    render() {
   	let rating = 4;

   	let starRating = [];
    let shareicon = <svg id="common-trips-fast-sharing-share" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 36" width="100%" height="100%"><path class="382653ab-285d-467e-876c-600380bec2ce" d="M15.83 11.1A4.5 4.5 0 1 0 15 8.5a4.49 4.49 0 0 0 .83 2.6M2.83 22.1A4.5 4.5 0 1 0 2 19.5a4.49 4.49 0 0 0 .83 2.6M15.83 31.1a4.5 4.5 0 1 0-.83-2.6 4.49 4.49 0 0 0 .83 2.6"></path><path class="2388f8db-03bb-4d95-9ffa-d99add5ad687" d="M10 17l6-6M10 22l6 4"></path></svg>;

    let watchicon = <svg id="common-trips-fast-sharing-bookmark" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 36" width="100%" height="100%"><path class="870b4375-0f53-4d19-a782-d56b14a1150b" d="M5 4h16v27.76L13 24l-8 7.76V4z"></path></svg>;
let wifi=<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40"><path class="st3" d="M13.007 14.167c1.4 0 2.7.6 3.7 1.6l-1.5 1.4c-.6-.6-1.4-1-2.2-1s-1.7.4-2.2 1l-1.5-1.5c1-.9 2.3-1.5 3.7-1.5zm0 3.7c-.4 0-.8.2-1.1.5l1.1 1.2 1.1-1.2c-.3-.3-.7-.5-1.1-.5zm-7.4-6c1.9-1.9 4.5-3.1 7.4-3.1 2.9 0 5.5 1.2 7.4 3.1l1.4-1.5c-2.3-2.3-5.4-3.7-8.8-3.7-3.4 0-6.6 1.4-8.8 3.8l1.4 1.4zm1.2 1.2l1.4 1.5c1.2-1.3 2.9-2.1 4.8-2.1s3.6.8 4.8 2.1l1.4-1.5c-1.6-1.6-3.8-2.7-6.2-2.7-2.4 0-4.6 1.1-6.2 2.7z"></path></svg>

let airconditioned=<svg xmlns="http://www.w3.org/2000/svg"width="40" height="40"><path d="M35.8 25.3L35 22l-5.7 1.3-3.3-2.2c.1-.4.1-.7.1-1.1v-.7l3.8-2.5 5.4 1.1.7-3.3-2.1-.4 4.2-2.8-2.2-3.2-4.4 3 .5-2.4-3.4-.8-1.1 5.7-3.1 2.1c-.6-.7-1.4-1.2-2.3-1.5v-3.4L25.9 7l-2.4-2.4L22 6.1V1h-3.9v5.3l-1.7-1.7L14 7l4.1 4.1v3.1c-.7.2-1.4.6-1.9 1.1l-3.4-2.1-1.3-5.3-3.3.8.5 2L4.4 8l-2 3.3 4.5 2.8-2.4.6.8 3.3 5.7-1.4 3.2 1.9c-.2.5-.3 1-.3 1.5 0 .4 0 .9.1 1.3l-3.3 1.9-5.3-1.5-.9 3.3 2 .6L2.2 28l1.9 3.4 4.6-2.6-.6 2.3 3.3.9 1.5-5.6 3.1-1.8c.6.5 1.2.9 2 1.1v3.4L14.2 33l2.4 2.4 1.5-1.5V39H22v-5.3l1.7 1.7L26 33l-4.1-4.1v-3.1c.8-.3 1.5-.7 2.1-1.3l3.4 2.2 1.2 5.3 3.3-.7-.5-2 4.3 2.7 2.1-3.3-4.5-2.9 2.5-.5zM20.6 23h-1.2c-1.4-.3-2.4-1.5-2.4-3s1-2.7 2.4-3h1.2c1.4.3 2.4 1.5 2.4 3 .1 1.5-1 2.7-2.4 3z"></path></svg>
let parking= <svg xmlns="http://www.w3.org/2000/svg">
		<g id="parking">
			<g>
				<path d="M33.7,1H6.3C3.4,1,1,3.4,1,6.3v27.5C1,36.6,3.4,39,6.3,39h27.5c2.9,0,5.3-2.4,5.3-5.3V6.3C39,3.4,36.6,1,33.7,1z M37,33.7
c0,1.8-1.5,3.3-3.3,3.3H6.3C4.5,37,3,35.5,3,33.7V6.3C3,4.5,4.5,3,6.3,3h27.5C35.5,3,37,4.5,37,6.3V33.7z"></path>
				<path d="M22.3,11H17h-4v12v6h4v-6h4.9c3.3,0,6-2.8,6-6.2C27.9,13.6,25.4,11,22.3,11z M21.9,19H17v-4h5.3c0.9,0,1.6,0.8,1.6,1.8
C23.9,18,23,19,21.9,19z"></path>
			</g>
		</g>
	</svg>

let pool=<svg xmlns="http://www.w3.org/2000/svg">
	<g id="pool">
		<g>
			<path d="M31.5,27c-1.8,0.1-2.9,0.9-3.8,1.6c-0.9,0.6-1.4,1-2.2,1c-0.8,0-1.2-0.3-2-0.9c-0.9-0.7-2-1.6-3.9-1.6
c-1.9,0-3,0.9-3.9,1.6c-0.8,0.6-1.2,0.9-1.9,0.9c-0.7,0-1.2-0.3-2-0.9c-0.9-0.6-1.9-1.4-3.6-1.6c-2.1-0.2-4.3,0.9-6.4,3l2.1,2.1
C5.4,30.7,6.7,30,8,30.1c0.8,0.1,1.3,0.4,2,1c0.9,0.7,2,1.5,3.8,1.5c0,0,0.1,0,0.1,0c1.8,0,2.9-0.9,3.8-1.6c0.8-0.6,1.2-0.9,2-0.9
c0,0,0,0,0,0c0.8,0,1.2,0.3,2,0.9c0.9,0.7,2,1.6,3.8,1.6c0,0,0,0,0.1,0c1.8,0,3-0.9,4-1.5c0.8-0.6,1.4-1,2.3-1
c1.3-0.1,2.7,0.7,4.3,2.2l2.1-2.1C35.9,27.9,33.7,26.9,31.5,27z"></path>
			<circle cx="31.9" cy="15.3" r="3.7"></circle>
			<path d="M8.6,23.2c2.6,0.5,3.1,2.2,5.4,2.2c2.8,0.1,3.3-2.3,6.1-2.2c2.5,0.1,2.8,2,5.4,2.2c2.7,0.1,3.2-1.8,6.2-2
c3.2-0.2,5.7,2.2,5.8,2.1c0,0-0.6-1.9-3.6-3.5c-0.9-0.5-2.6-0.3-4-1l-6.3-9.9l6.5-1.4c1.1-0.2,1.7-1.2,1.5-2.2l0-0.1
c-0.2-1-1.3-1.6-2.4-1.4l-8.8,2c-1.1,0.2-1.7,1.2-1.5,2.2l0,0.1c0,0.1,0.1,0.3,0.1,0.4L20,14L2,23v2.5C3.5,24.6,6.3,22.8,8.6,23.2
z"></path>
		</g>
	</g>
</svg>
let stars=this.props.hotelRoom.stars;
let prices=(this.props.code)*2;
      return (
<div className="row">



			<div className="col-md-12">
			<h1 className="title"><p className="title">You are booking this hotel with KAYAK.com</p></h1>
			<hr/>
			<div className="col-lg-3 col-sm-12 col-md-6 col-xs-12 first" id="hey">
				<img className="imgg" src='/img/hotel.jpg'/>
			</div>

				<div className="hotel-name">
					{this.props.hotelRoom.hotelName},{this.props.hotelRoom.hotelAddress},{this.props.hotelRoom.city},{this.props.hotelRoom.zipCode},{this.props.hotelRoom.state}
				</div>
				<div className="hotel-star">
                    {
                        [1, 2, 3, 4, 5].map(function(index) {
                            if(index <= stars)

                                return index <= stars ?
									<span className="glyphicon glyphicon-star" key={index}></span>: '';

                        }.bind(this))
                    }
				</div>
				<div className="hotel-specs">
					<p>No of people</p>
			</div>
				<div className="hotel-checkin">
					<p>Check in </p>
			</div>
				<div className="hotel-checkout">
					<p>Check out</p>
			</div>
				<div className="hotel-banner">
					<p className="freee">Stay flexible: FREE cancellation</p>
				</div>

				<div className="hotel-logos">
					<div className="logos">
						<svg xmlns="http://www.w3.org/2000/svg" width="80%" height="100%"><path class="st3" d="M13.007 14.167c1.4 0 2.7.6 3.7 1.6l-1.5 1.4c-.6-.6-1.4-1-2.2-1s-1.7.4-2.2 1l-1.5-1.5c1-.9 2.3-1.5 3.7-1.5zm0 3.7c-.4 0-.8.2-1.1.5l1.1 1.2 1.1-1.2c-.3-.3-.7-.5-1.1-.5zm-7.4-6c1.9-1.9 4.5-3.1 7.4-3.1 2.9 0 5.5 1.2 7.4 3.1l1.4-1.5c-2.3-2.3-5.4-3.7-8.8-3.7-3.4 0-6.6 1.4-8.8 3.8l1.4 1.4zm1.2 1.2l1.4 1.5c1.2-1.3 2.9-2.1 4.8-2.1s3.6.8 4.8 2.1l1.4-1.5c-1.6-1.6-3.8-2.7-6.2-2.7-2.4 0-4.6 1.1-6.2 2.7z"></path></svg>
					</div>
					<div className="logos">
						{airconditioned}
					</div>
					<div className="logos">
						{pool}
					</div>
					<div className="logos">
						{parking}
					</div>
				</div>

				</div>


			</div>






      );
   }
}

export default Card;