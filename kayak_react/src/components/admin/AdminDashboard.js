import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Radar, HorizontalBar} from 'react-chartjs-2';
import {CardColumns, Card, CardHeader, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import * as AdminAPI from "../../api/admin/API";
import UserProfile from "../user/UserProfile";
import Tree from "react-d3-tree";

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const horizontalBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const bar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const doughnut = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const radar = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

const pie = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const polar = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB'
        ],
        label: 'My dataset' // for legend
    }],
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
    ]
};

class AdminDashboard extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            clicksPerPage:{
                labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                data: [0,0,0,0,0,0,0,0]
            },
            clicksPerProperty:{
                labels: ['Hotel','Flight','Car'],
                data: [0,0,0]
            },
            areaExplored:{
                labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                data: [0,0,0,0,0,0,0,0]
            },
            top10Properties:{
                Hotel:{
                    labels: [],
                    data: []
                },
                Flight:{
                    labels: [],
                    data: []
                },
                Car:{
                    labels: [],
                    data: []
                }
            },
            citiesRevenue:[
                // {
                //     city: 'San Jose',
                //     revenue: [10,20,30]
                // },
                // {
                //     city: 'San Fransisco',
                //     revenue: [10,60,70]
                // },
            ],
            cityWiseRevenue:{
                labels: [],
                data: []
            },
            top10Hosts:{
                labels: [],
                data: []
            },
            reviewsOnProperties:{
                labels: ['Hotel','Flight','Car'],
                data: [0,0,0]
            },
            traceTrees: {
                // {
                //     userId: '',
                //     treeData:{
                //         pages: [],
                //         pageTime: []
                //      }
                // },
                // {
                //     userId: '',
                //     treeData:{
                //         pages: [],
                //         pageTime: []
                //     }
                // }
            },
            userTraceTree:[
                {
                    name: '',
                    attributes: {
                        Time: '',
                    },
                    children: []
                }
            ]
        }
    }

    componentWillMount(){
        AdminAPI.logAnalyticsData()
            .then(res => {
                let sum = res.pageClicks.UserHome+res.pageClicks.SignIn+res.pageClicks.SignUp+res.pageClicks.HotelListing+res.pageClicks.CarListing+res.pageClicks.FlightListing+res.pageClicks.UserProfile+res.pageClicks.UserPaymentPage;
                // console.log("Received response - "+res.status);
                console.log("Received response Clicks - "+res.pageClicks.UserProfile);
                this.setState({
                    ...this.state,
                    clicksPerPage:{
                        labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                        data: [res.pageClicks.UserHome,res.pageClicks.SignIn,res.pageClicks.SignUp,res.pageClicks.HotelListing,res.pageClicks.CarListing,res.pageClicks.FlightListing,res.pageClicks.UserProfile,res.pageClicks.UserPaymentPage]
                        // data: [30,50,70,90,52,69,45,62]
                    },
                    clicksPerProperty:{
                        labels: ['Hotel','Flight','Car'],
                        data: [res.propertyClicks.Hotel,res.propertyClicks.Flight,res.propertyClicks.Car]
                        //data: [30,50,70]
                    },
                    areaExplored:{
                        labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                        data: [((res.pageClicks.UserHome/sum)*100).toFixed(2),((res.pageClicks.SignIn/sum)*100).toFixed(2),((res.pageClicks.SignUp/sum)*100).toFixed(2),((res.pageClicks.HotelListing/sum)*100).toFixed(2),((res.pageClicks.CarListing/sum)*100).toFixed(2),((res.pageClicks.FlightListing/sum)*100).toFixed(2),((res.pageClicks.UserProfile/sum)*100).toFixed(2),((res.pageClicks.UserPaymentPage/sum)*100).toFixed(2)]
                    }
                });
            })
            .catch(err => console.log(err));

        AdminAPI.top10Properties()
            .then(res => {
                // console.log("Received response - "+res.status);
                console.log("Top 10 Properties - Received response Clicks - "+res.Flight.labels);
                console.log("Top 10 Properties - Received response Clicks - "+res.Flight.data);
                this.setState({
                    ...this.state,
                    top10Properties: {
                        Hotel:{
                            labels: res.Hotel.labels,
                            data: res.Hotel.data
                        },
                        Flight:{
                            labels: res.Flight.labels,
                            data: res.Flight.data
                        },
                        Car:{
                            labels: res.Car.labels,
                            data: res.Car.data
                        }
                    }
                });
            })
            .catch(err => console.log(err));

        AdminAPI.cityWiseRevenue()
            .then(res => {
                console.log(res.status);
                if(res.status===200){
                    res.json().then((result)=>{
                        console.log(result);
                        this.setState({
                            ...this.setState,
                            citiesRevenue : result,
                            // cityWiseRevenue: result
                        });
                    })

                }
                else {
                    console.log("error while fetching city wise revenue");
                }
            })
            .catch(err => console.log(err));

        AdminAPI.top10Hosts()
            .then(res => {
                // console.log("Received response - "+res.status);
                console.log("Received response Clicks - "+res.top10Hosts.label);
                this.setState({
                    ...this.state,
                    top10Hosts:{
                        labels: res.top10Hosts.label,
                        data: res.top10Hosts.data
                    }
                });
            })
            .catch(err => console.log(err));

        AdminAPI.reviewsOnProperties()
            .then(res => {
                // console.log("Received response - "+res.status);
                console.log("Received response Clicks - "+res.reviewsOnProperties.data);
                this.setState({
                    ...this.state,
                    reviewsOnProperties:{
                        labels: ['Hotel','Flight','Car'],
                        data: res.reviewsOnProperties.data
                    }
                });
            })
            .catch(err => console.log(err));

        AdminAPI.userTraceTree()
            .then( res => {
                // console.log("Received response - "+res.status);
                // console.log("Received response UserTrees - "+res.userTrees.data);
                this.setState({
                    ...this.state,
                    traceTrees: res
                });
            })
            .catch(err => console.log(err));
    }

    loadUserTraceTree = () => {

    };

    loadCityRevenue = (event) => {
        let _city = event.target.value;
        console.log(_city+" - in loadCityRevenue");
        this.state.citiesRevenue.forEach((city)=>{

            console.log("city - "+city.city+" - _city - "+_city);
            if(city.city === _city){
                console.log(city.totalRevenue);
                console.log("Found match ..... loading revenue to chart's data - "+city.revenue);
                this.setState({
                    ...this.state,
                    cityWiseRevenue: {
                        labels: ['Hotel','Flight','Car'],
                        data: [
                            city.totalRevenue.hotel,
                            city.totalRevenue.flight,
                            city.totalRevenue.car,
                        ]
                    }
                });
                console.log("after state change - "+this.state.cityWiseRevenue.labels+" - "+this.state.cityWiseRevenue.data);
            }
        });

    };

    // loadOptions = (city) => {
    //     console.log("In loadOptions");
    //     console.log(" City - "+city.city+" Revenue - "+city.revenue);
    //     return (<option value={city.city} >{city.city}</option>);
    // };

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {

        // bar chart
        const clicksPerPage = {
            labels: this.state.clicksPerPage.labels,
            datasets: [
                {
                    label: 'Clicks',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.clicksPerPage.data
                }
            ]
        };

        // doughnut chart
        const clicksPerProperty = {
            labels: this.state.clicksPerProperty.labels,
            datasets: [{
                data: this.state.clicksPerProperty.data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        // pie chart
        const areaExplored = {
            labels: this.state.areaExplored.labels,
            datasets: [{
                data: this.state.areaExplored.data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                ]
            }]
        };

        // bar chart
        const top10Hotel = {
            labels: this.state.top10Properties.Hotel.labels,
            datasets: [
                {
                    label: 'Hotels',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.top10Properties.Hotel.data
                }
            ]
        };

        // bar chart
        const top10Flight = {
            labels: this.state.top10Properties.Flight.labels,
            datasets: [
                {
                    label: 'Flights',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.top10Properties.Flight.data
                }
            ]
        };

        // bar chart
        const top10Car = {
            labels: this.state.top10Properties.Car.labels,
            datasets: [
                {
                    label: 'Cars',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.top10Properties.Car.data
                }
            ]
        };

        // histogram
        const cityWiseRevenue = {
            labels: ['Hotel','Flight','Car'],
            datasets: [
                {
                    label: 'Revenue',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.cityWiseRevenue.data
                }
            ]
        };

        // doughnut chart
        const top10Hosts = {
            labels: this.state.top10Hosts.labels,
            datasets: [{
                data: this.state.top10Hosts.data,
                backgroundColor: [
                    '#f7ce02',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#f90431',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                    '#db1ed8',

                ],
                hoverBackgroundColor: [
                    '#f7ce02',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#f90431',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                    '#db1ed8',
                ]
            }]
        };

        // pie chart
        const reviewsOnProperties = {
            labels: this.state.reviewsOnProperties.labels,
            datasets: [{
                data: this.state.reviewsOnProperties.data,
                backgroundColor: [
                    '#7af441',
                    '#1f0b93',
                    '#e80b0f',
                ],
                hoverBackgroundColor: [
                    '#7af441',
                    '#1f0b93',
                    '#e80b0f',
                ]
            }]
        };

        const clickStreamTree = [
            {
                name: 'User Home',
                attributes: {
                    Time: ' 60 seconds ',
                },
                children: [
                    {
                        name: 'Hotel Listing',
                        attributes: {
                            Time: ' 120 seconds ',
                        },
                        children: [
                            {
                                name: 'Hotel Details',
                                attributes: {
                                    Time: ' 75 seconds ',
                                },
                            },
                            {
                                name: 'Hotel Details',
                                attributes: {
                                    Time: ' 100 seconds ',
                                },
                            },
                            {
                                name: 'Hotel Details',
                                attributes: {
                                    Time: ' 45 seconds ',
                                },
                                children: [
                                    {
                                        name: 'Sign In',
                                        attributes: {
                                            Time: ' 20 seconds ',
                                        },
                                        children: [
                                            {
                                                name: 'Payment',
                                                attributes: {
                                                    Time: ' 150 seconds ',
                                                }
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ],
            },
        ];

        return (
            // style={{position: "relative",height:"500px", width:"1000px"}}
            <div className="container-fluid">
                <Card>
                    <CardHeader>
                        <label className="h4">Dashboard</label>
                    </CardHeader>
                    <CardColumns className="cols-2">

                        <Card>
                            <CardHeader>
                                Clicks Per Page
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <br/>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Bar data={clicksPerPage}
                                         options={{
                                             maintainAspectRatio: true
                                         }}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                Clicks Per Property
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={clicksPerProperty}/>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                City Wise Revenue
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <br/>
                            <CardBody>
                                <div className="chart-wrapper">
                                    {/*<div style={{textAlign:"center"}} >*/}
                                    {/*Choose City :*/}
                                    <select style={{textAlign:"center"}} onChange={(event)=> this.loadCityRevenue(event)} >
                                        <option style={{textAlign:"center"}} value="Select">Select</option>
                                        {
                                            this.state.citiesRevenue && (this.state.citiesRevenue.map((city)=>(
                                                <option style={{textAlign:"center"}} value={city.city}>{city.city}</option>
                                            )))
                                        }
                                    </select>
                                    {console.log(cityWiseRevenue)}
                                    <HorizontalBar data={cityWiseRevenue}
                                                   options={{
                                                       maintainAspectRatio: true
                                                   }}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                Top 10 Hotels
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <br/>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Bar data={top10Hotel}
                                         options={{
                                             maintainAspectRatio: true
                                         }}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                Top 10 Flights
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <br/>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Bar data={top10Flight}
                                         options={{
                                             maintainAspectRatio: true
                                         }}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                Top 10 Cars
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <br/>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Bar data={top10Car}
                                         options={{
                                             maintainAspectRatio: true
                                         }}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        <Card  style={{position: "relative",height:"247px"}}>
                            <CardHeader>
                                Less seen area of Website
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Pie data={areaExplored}/>
                                </div>
                            </CardBody>
                        </Card>

                        <Card style={{position: "relative",height:"247px"}}>
                            <CardHeader>
                                Property Reviews
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Pie data={reviewsOnProperties}/>
                                </div>
                            </CardBody>
                        </Card>

                        <Card style={{position: "relative",height:"247px"}}>
                            <CardHeader>
                                Top 10 Hosts
                                <div className="card-actions">
                                    <a href="#">
                                        <small className="text-muted">Enlarge</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={top10Hosts}/>
                                </div>
                            </CardBody>
                        </Card>

                        {/*style={{position: "relative",height:"600px", width:"800px"}}*/}

                    </CardColumns>

                    <br/>

                    <Card style={{position: "relative",height:"250px"}}>
                        <CardHeader>
                            User Click Stream
                            <div className="card-actions">
                                <a href="#">
                                    <small className="text-muted">Enlarge</small>
                                </a>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div id="treeWrapper">
                                <select style={{textAlign:"center"}} onChange={(event)=> this.loadCityRevenue(event)} >
                                    <option style={{textAlign:"center"}} value="Select">Select</option>
                                    {
                                        this.state.citiesRevenue && (this.state.citiesRevenue.map((city)=>(
                                            <option style={{textAlign:"center"}} value={city.city}>{city.city}</option>
                                        )))
                                    }
                                </select>
                                <Tree data={clickStreamTree} />
                            </div>
                        </CardBody>
                    </Card>

                </Card>

            </div>

        )
    }
}

export default AdminDashboard;
