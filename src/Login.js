import { Component } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { withRouter } from './withRouter'
import { Navigate } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = ({
            login: false
        })
    }

    render() {
        const { navigation } = this.props;

        return (
            <div style={{
                display: 'flex', flexDirection: 'column', margin: '10px'
                , justifyContent: 'center', alignSelf: 'center', alignContent: 'center'
            }}>

                {this.state.login && (
                    <Navigate to="/home" replace={false} />
                )}


                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control as="textarea"
                        type="email"
                        placeholder="name@example.com"
                    />

                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>


                <div style={{
                    display: 'flex', flexDirection: 'row-reverse', margin: '10px'
                }}>
                    <Button
                        style={{ margin: "10px" }}
                        type="Submit"
                        onClick={() => this.setState({ login: true })
                        }
                        variant='primary'>Login</Button>
                    <Button
                        style={{ margin: "10px" }}
                        type="cancel"
                        variant='danger'>Cancel</Button>


                </div>
            </div>
        )
    }
}

export default withRouter(Login);
