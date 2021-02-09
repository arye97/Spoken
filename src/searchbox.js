import React from 'react';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';





let SearchBox = () => {

    let query = '';

    return (
        <Form>
            <Form.Group controlId="">
                <Form.Control
                    type="text"
                    placeholder="Enter language"
                    onChange={(e) => {
                        query = e.target.value;
                    }}
                />
                <Button
                    variant="primary"
                    onClick={() => {
                        console.log(query);
                        if (query === '' || query === null) {
                            return;
                        }
                    }}>
                    Search
                </Button>
            </Form.Group>
        </Form>
    );
}

export default SearchBox;