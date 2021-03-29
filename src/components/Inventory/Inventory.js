import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
// import fakeData from '../../fakeData';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const Inventory = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }

    const classes = useStyles();
    return (
        <div style={{ textAlign: 'center', marginTop: '5vh' }}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" />
                <br/>
                <TextField id="standard-basic" label="Price" />
                <br/>
                <TextField id="standard-basic" label="Quantity" />
                <br/>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Product Image
                            <input
                            type="file"
                            hidden
                        />
                    </Button>
                    <br/>
                    <Button onClick={handleAddProduct} variant="contained">Add Products</Button>
            </form>
        </div>
    );
};

export default Inventory;