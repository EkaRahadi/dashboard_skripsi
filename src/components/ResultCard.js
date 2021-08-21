import React, { useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import H5 from '@material-tailwind/react/Heading5';
import LeadText from '@material-tailwind/react/LeadText';
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { resultParameterOptima } from "../store/index"
import { addParameter } from '../api/authApi';

export default function ProfileCard(data) {
    const resultParamOptima = useRecoilValue(resultParameterOptima);
    const [loadingBar, setLoadingBar] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [alertMsg, setAlertMsg] = useState('Action Success!');
    const [snackBar, setSnackBar] = useState(false);

    const token = window.localStorage.getItem("token");
    const setResultParameterOptima = useSetRecoilState(resultParameterOptima);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBar(false);
    };

    const handleSaveParam = (e) => {
        e.preventDefault();

        setLoadingBar(true)
        setDisabled(true);

        const payload = {
            paramA: resultParamOptima.parameter[0].toFixed(3),
            paramB: resultParamOptima.parameter[1].toFixed(3),
            paramC: resultParamOptima.parameter[2].toFixed(3),
            paramD: resultParamOptima.parameter[3].toFixed(3),
        };

        addParameter(payload, token)
            .then(data => {
                setAlertMsg('Action Success !')
                setSeverityAlert('success');
                setResultParameterOptima({});
            })
            .catch(error => {
                setAlertMsg('Action Failed !')
                setSeverityAlert('error');
            })
            .finally(() => {
                setLoadingBar(false);
                setSnackBar(true);
                setDisabled(false);
            })
    }
    return (
        <Card>
            <div className="text-center">
                <H5 color="gray">Estimation Result</H5>
            </div>
            <CardBody>
                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    <LeadText color="blueGray">
                    {data.data}
                    </LeadText>
                </div>
            {loadingBar && <LinearProgress />}
            </CardBody>
            {
            Object.keys(resultParamOptima).length !== 0 && 
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        disabled={disabled}
                        onClick={(e) => handleSaveParam(e)}
                        color="lightBlue"
                        buttonType="filled"
                        size="sm"
                        ripple="dark"
                    >
                        Save To Parameter
                    </Button>
                </div>
            </CardFooter>
            }
            {/* SnackBar */}
            <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severityAlert}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Card>
    );
}
