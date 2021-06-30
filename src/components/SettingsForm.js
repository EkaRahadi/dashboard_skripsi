import React, {useState, useEffect} from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
        setLoadingBar(true);
        setDisabled(true);

        setTimeout(() => {
            setAlertMsg('Data failed to save!')
            setSeverityAlert('error');
            setLoadingBar(false);
            setDisabled(false);
            setSnackBar(true)
        }, 3000)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBar(false);
      };

    useEffect(() => {
        console.log(fullname);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    });

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
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleEmail(e)}
                                type="email"
                                color="purple"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handlePassword(e)}
                                type="password"
                                color="purple"
                                placeholder="Password"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleConfirmPassword(e)}
                                type="password"
                                color="purple"
                                placeholder="Password Confirm"
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
