import React, {useState, useEffect} from 'react';
import { useSetRecoilState } from "recoil";
import { resultCost } from "../store/index"
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { estimastion } from '../api/authApi';

export default function EstimationForm() {
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');
    const [param3, setParam3] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loadingBar, setLoadingBar] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [alertMsg, setAlertMsg] = useState('Estimation Success!');

    const setResultCost = useSetRecoilState(resultCost);

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBar(false);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingBar(true);
        setDisabled(true);

        const payload = {
            loc: param1,
            em: param2,
            umr: param3,
          }
        
        estimastion(payload)
          .then(data => {
              const result = data.data;
              setResultCost(<><p>Your software approximately needs <b>{result.TDEV} months</b> time development, with <b>{result.num_of_staff} employee</b> and <b>Rp.{result.monthly_cost} monthly cost</b>. <br></br><b>Total Cost Rp.{result.total_cost}</b></p></>);
              setAlertMsg('Estimation Success !');
              setSeverityAlert('success');
          })
          .catch(err => {
              setAlertMsg('Estimation Failed !');
              setSeverityAlert('error');
          })
          .finally(() => {
              setLoadingBar(false);
              setDisabled(false);
              setSnackBar(true);
          })
    };
    
    useEffect(() => {
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
                    <h6 className="text-black-500 text-sm mt-3 mb-6 font-light uppercase">
                        Software Information
                    </h6>
                    <a href={`${window.location.origin}/landing-detail`} className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">Input Information</a>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleParam1(e)}
                                type="number"
                                color="purple"
                                placeholder="LOC / KSLOC"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleParam2(e)}
                                type="number"
                                color="purple"
                                placeholder="Effort Multiplier"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                disabled={disabled}
                                onChange={(e) => handleParam3(e)}
                                type="number"
                                color="purple"
                                placeholder="UMR"
                            />
                        </div>
                    </div>
                </form>
                <div className="flex flex-wrap mt-10 font-light">
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
