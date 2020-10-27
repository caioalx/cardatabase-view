import React, { Component } from 'react';
import { SERVER_URL } from '../constants'

import ReactTable from 'react-table-v6';

import { ToastContainer, toast } from 'react-toastify';

import { CSVLink } from 'react-csv';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AddCar from './AddCar';
import EditCar from './EditCar';

import '../App.css';
import 'react-table-v6/react-table.css';
import 'react-toastify/dist/ReactToastify.css';

class Carlist extends Component {
    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    componentDidMount() {
        this.fetchCars();
    }

    logout = () => {
        this.props.logout();
    }

    fetchCars = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars', {
            headers: {'Authorization': token}
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                cars: responseData._embedded.cars,
            });
        })
        .catch(err => console.log(err));
    }
    
    addCar = (car) => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(car)
        })
        .then(res => {
            toast.success("Changes saved", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchCars();
        })
        .catch(err => toast.error("Saved", {
            position: toast.POSITION.BOTTOM_LEFT
        }));
    }

    updateCar = (car, link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(car)
        })
        .then(res => {
            toast.success("Saved", {
                position: toast.POSITION.BOTTOM_LEFT
            });            
            this.fetchCars();
        })
        .catch(err => toast.error("Saved", {
            position: toast.POSITION.BOTTOM_LEFT
        }));
    }    

    onDelClick = (link) => {
        const token = sessionStorage.getItem("jwt");
        if(window.confirm('Are you sure to delete?')) {
            fetch(link, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            })
            .then(res => {
                toast.success("Car deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });        
                this.fetchCars()
            })
            .catch(err => {
                toast.error("Error when deleting", {
                    position: toast.POSITION.BOTTOM_LEFT
                });             
                console.log(err);
            });
        }
    }

    render() {
        const columns =[
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: 'Model',
                accessor: 'model'                
            },
            {
                Header: 'Color',
                accessor: 'color'                
            },
            {
                Header: 'Year',
                accessor: 'year'                
            },
            {
                Header: 'Price R$',
                accessor: 'price'                
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value, row}) => (<EditCar car={row} link={value} updateCar={this.updateCar} fetchCars={this.fetchCars} />)
            },            
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value}) => (<Button size="small" color="secondary" onClick={() => {this.onDelClick(value)}}>Delete</Button>)
            }];

        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddCar addCar={this.addCar} fetchCars={this.fetchCars}/>
                    </Grid>
                    <Grid item style={{padding: 15, flexGrow: 2}}>
                        <CSVLink data={this.state.cars} separator=";">Export CSV</CSVLink>
                    </Grid>   
                    <Grid item style={{margin: 10}}>
                        <Button variant="outlined" color="secondary" onClick={this.logout}>Logout</Button>                
                    </Grid>                 
                </Grid>
                <ReactTable data={this.state.cars} columns={columns} filterable={true}/>
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default Carlist;