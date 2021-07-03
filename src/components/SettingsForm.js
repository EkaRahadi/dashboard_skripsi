import React, {useState, useEffect} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { userProfile } from '../store/index';
import { updateUser, getUser } from '../api/authApi';

export default function SettingsForm() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loadingBar, setLoadingBar] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [alertMsg, setAlertMsg] = useState('Data successfully saved!')

    const user = useRecoilValue(userProfile);
    const setUser = useSetRecoilState(userProfile);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      };

    const handleFullName = (e) => {
        e.preventDefault();
        setFullname(e.target.value);
    };
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    const handleConfirmPassword = (e) => {
        e.preventDefault();
        setConfirmPassword(e.target.value);
    };
    const handleSave = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlertMsg('Password and Confirm Password not match !')
            setSeverityAlert('error');
            setSnackBar(true);
            return;
        }
        setLoadingBar(true);
        setDisabled(true);

        const token = window.localStorage.getItem('token');
        const payload = {
            userId: user.user_id,
            email: email,
            name: fullname
        }

        if(password !== '') {
            payload['password'] = password;
        }

        updateUser(payload, token)
            .then(data => {
                setAlertMsg('Data successfully saved!')
                setSeverityAlert('success');

                getUser(payload, token)
                .then(data => {
                    setUser(data.data[0]);
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
                setAlertMsg('Data failed to save!')
                setSeverityAlert('error');
            })
            .finally(() => {
                setLoadingBar(false);
                setDisabled(false);
                setSnackBar(true);
                setPassword('');
                setConfirmPassword('');
            })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBar(false);
      };

    useEffect(() => {
        setFullname(user.user_name);
        setEmail(user.email);
    },[user]);

    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">My Account</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        Settings
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
            {loadingBar && <LinearProgress />}
                <form>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        User Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleFullName(e)}
                                type="text"
                                color="purple"
                                placeholder="Full Name"
                                value={fullname}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleEmail(e)}
                                type="email"
                                color="purple"
                                placeholder="Email Address"
                                value={email}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handlePassword(e)}
                                type="password"
                                color="purple"
                                placeholder="Password"
                                value={password}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleConfirmPassword(e)}
                                type="password"
                                color="purple"
                                placeholder="Password Confirm"
                                value={confirmPassword}
                            />
                        </div>
                    </div>
                </form>
                <div className="flex flex-wrap mt-10 font-light">
                        <Button
                        disabled={disabled}
                        onClick={(e) => handleSave(e)}
                        className="mx-auto"
                        color="lightBlue"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        >
                            Save
                        </Button>
                    </div>

                    {/* SnackBar */}
                    <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severityAlert}>
                            {alertMsg}
                        </Alert>
                    </Snackbar>
            </CardBody>
        </Card>
    );
}
