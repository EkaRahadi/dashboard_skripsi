import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { login } from '../api/authApi';
import { userProfile } from '../store/index';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loadingBar, setLoadingBar] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [alertMsg, setAlertMsg] = useState('Login Success!');

    const setUser = useSetRecoilState(userProfile);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBar(false);
    };

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password
        }
        setLoadingBar(true);
        setDisabled(true);

        login(payload)
            .then(data => {
                setUser(data.data);
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("refreshToken", data.refreshToken);
                
                setAlertMsg('Login Success !')
                setSeverityAlert('success');

                window.location.replace("/dashboard");
            })
            .catch(error => {
                setAlertMsg('Login Failed !')
                setSeverityAlert('error');
            })
            .finally(() => {
                setLoadingBar(false);
                setDisabled(false);
                setSnackBar(true);
                setEmail('');
                setPassword('');
            })

    };

    return (
        <Page>
            <Container>
                <Card>
                    <CardHeader color="lightBlue">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Login
                        </H5>
                    </CardHeader>
                    {loadingBar && <LinearProgress />}
                    <CardBody>
                        <div className="mb-12 px-4 bg-bb">
                            <InputIcon
                                disabled={disabled}
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                iconName="email"
                                onChange={(e) => handleEmail(e)}
                            />
                        </div>
                        <div className="mb-8 px-4">
                            <InputIcon
                                disabled={disabled}
                                type="password"
                                color="lightBlue"
                                placeholder="Password"
                                iconName="lock"
                                onChange={(e) => handlePassword(e)}
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center bg-bb">
                            <Button
                                color="lightBlue"
                                buttonType="filled"
                                size="lg"
                                ripple="dark"
                                onClick={(e) => handleLogin(e)}
                            >
                                Login
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
            {/* SnackBar */}
            <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severityAlert}>
                            {alertMsg}
                        </Alert>
                    </Snackbar>
        </Page>
    );
}
