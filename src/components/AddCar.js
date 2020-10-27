import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddCar = (props) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', year: '', fuel: '', price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (element) => {
        setCar({...car, [element.target.name]: element.target.value});
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}}
             onClick={handleClickOpen}>
                 New Car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Brand" name="brand" 
                       value={car.brand} onChange={handleChange}  />

                    <TextField fullWidth label="Model" name="model" 
                       value={car.model} onChange={handleChange}  />

                    <TextField fullWidth label="Color" name="color" 
                       value={car.color} onChange={handleChange}  />

                    <TextField fullWidth label="Year" name="Year" 
                       value={car.year} onChange={handleChange}  />

                    <TextField fullWidth label="Price" name="price" 
                       value={car.price} onChange={handleChange}  />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>    
    );
}

export default AddCar;
