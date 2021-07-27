import React, {useState, useEffect} from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Radio from "@material-tailwind/react/radio";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ParameterForm() {
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');
    const [param3, setParam3] = useState('');
    const [algorithm, setAlgorithm] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loadingBar, setLoadingBar] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [alertMsg, setAlertMsg] = useState('Estimation Success!')

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      };

    const handleParam1 = (e) => {
        e.preventDefault();
        setParam1(e.target.value);
    };
    const handleParam2 = (e) => {
        e.preventDefault();
        setParam2(e.target.value);
    };
    const handleParam3 = (e) => {
        e.preventDefault();
        setParam3(e.target.value);
    };
    const handleRadio = (e) => {
        setAlgorithm(e.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBar(false);
      };

    const handleSubmit = (e) => {
        setLoadingBar(true);
        setDisabled(true);

        const payload = {
            nPopulation: param1,
            nDimension: param2,
            nIteration: param3,
        }

        setTimeout(() => {
            setAlertMsg('Estimation Failed!')
            setSeverityAlert('error');
            setLoadingBar(false);
            setDisabled(false);
            setSnackBar(true)
        }, 3000)
    };
    
    useEffect(() => {
        console.log(param1);
        console.log(param2);
        console.log(param3);
        console.log(algorithm);
      });
    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Estimation</h2>
                </div>
            </CardHeader>
            <CardBody>
            {loadingBar && <LinearProgress />}
                <form className="">
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        Software Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleParam1(e)}
                                type="number"
                                color="purple"
                                placeholder="Number Population"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleParam2(e)}
                                type="number"
                                color="purple"
                                placeholder="Number of Dimension"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-5 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleParam3(e)}
                                type="number"
                                color="purple"
                                placeholder="Max Iteration"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-wrap justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-2 text-center w-full lg:w-auto">
                    {disabled ? 
                        <Radio
                        disabled
                        onChange={(e) => handleRadio(e)}
                        color="lightBlue"
                        text="Bat Algorithm"
                        id="bat"
                        name="algorithm"
                        value="bat"
                        />
                    :
                    <Radio
                        onChange={(e) => handleRadio(e)}
                        color="lightBlue"
                        text="Bat Algorithm"
                        id="bat"
                        name="algorithm"
                        value="bat"
                        />
                    }
                    </div>
                    <div className="p-2 text-center w-full lg:w-auto">
                    {disabled ? 
                        <Radio
                        disabled
                        onChange={(e) => handleRadio(e)}
                        color="lightBlue"
                        text="FPA Algorithm"
                        id="fpa"
                        name="algorithm"
                        value="fpa"
                        />
                    :
                        <Radio
                        onChange={(e) => handleRadio(e)}
                        color="lightBlue"
                        text="FPA Algorithm"
                        id="fpa"
                        name="algorithm"
                        value="fpa"
                        />
                    }
                    </div>
                    <div className="p-2 text-center w-full lg:w-auto">
                    {disabled ?
                        <Radio
                        disabled
                        onChange={(e) => handleRadio(e)}
                        color="lightBlue"
                        text="Hybrid Algorithm"
                        id="hybrid"
                        name="algorithm"
                        value="hybrid"
                        />
                    :
                        <Radio
                        onChange={(e) => handleRadio(e)}
                        color="lightBlue"
                        text="Hybrid Algorithm"
                        id="hybrid"
                        name="algorithm"
                        value="hybrid"
                        />
                    }
                    </div>
                </div>
                </form>
                <div className="flex flex-wrap mt-2 font-light">
                        <Button
                        onClick={(e) => handleSubmit(e)}
                        className="mx-auto"
                        color="lightBlue"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        >
                            Submit
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
