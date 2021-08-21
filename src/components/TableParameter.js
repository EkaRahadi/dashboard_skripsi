import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { parameterList } from "../store/index"
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from '@material-tailwind/react/Button';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Input from '@material-tailwind/react/Input';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { addParameter, getAllParameter, updateParameter, deleteParameter, setDefaultParam } from '../api/authApi';

export default function CardTable() {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [paramA, setParamA] = useState('');
  const [paramB, setParamB] = useState('');
  const [paramC, setParamC] = useState('');
  const [paramD, setParamD] = useState('');
  const [paramDefault, setparamDefault] = useState(false);
  const [paramId, setParamId] = useState('');
  const [loadingBar, setLoadingBar] = useState(false);
  const [loadingSetDefault, setLoadingSetDefault] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [severityAlert, setSeverityAlert] = useState('success');
  const [alertMsg, setAlertMsg] = useState('Action Success!')

  const [parameters, setParameters] = useRecoilState(parameterList);
  const token = window.localStorage.getItem("token");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleParamA = (e) => {
    // e.preventDefault();
    setParamA(e.target.value);
  };
  const handleParamB = (e) => {
    // e.preventDefault();
    setParamB(e.target.value);
  };
  const handleParamC = (e) => {
    // e.preventDefault();
    setParamC(e.target.value);
  };
  const handleParamD = (e) => {
    // e.preventDefault();
    setParamD(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };
  const handleModalAddSave = (e) => {
    e.preventDefault();
    if (paramA === '' || paramB === '' || paramC === '' || paramD === '') {
      setAlertMsg('All fields are required !')
      setSeverityAlert('error');
      setSnackBar(true);
      return;
    }

    setLoadingBar(true)
    setDisabled(true);

    const payload = {
      paramA: paramA,
      paramB: paramB,
      paramC: paramC,
      paramD: paramD,
    }

    addParameter(payload, token)
      .then(data => {
        setAlertMsg('Action Success !')
        setSeverityAlert('success');

        getAllParameter(token)
          .then( data => {
            const newData = data.data.sort((a, b) => b.default-a.default);
            setParameters(newData);
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        setAlertMsg('Action Failed !')
        setSeverityAlert('error');
      })
      .finally(() => {
        setLoadingBar(false);
        setSnackBar(true);
        setShowModalEdit(false);
        setDisabled(false);
        setShowModalAdd(false);
      })
  };
  const handleModalEditSave = (e) => {
    e.preventDefault();

    if (paramA === '' || paramB === '' || paramC === '' || paramD === '') {
      setAlertMsg('All fields are required!')
      setSeverityAlert('error');
      setSnackBar(true);
      return;
    }

    setLoadingBar(true)
    setDisabled(true);

    const payload = {
      paramA: parseFloat(paramA),
      paramB: parseFloat(paramB),
      paramC: parseFloat(paramC),
      paramD: parseFloat(paramD),
      defaultParam: paramDefault,
      paramId: paramId
    }

    updateParameter(payload, token)
      .then(data => {
        setAlertMsg('Action Success !')
        setSeverityAlert('success');

        getAllParameter(token)
          .then( data => {
            const newData = data.data.sort((a, b) => b.default-a.default);
            setParameters(newData);
          })
          .catch(error => {
            console.log(error);
          })
    
      })
      .catch(error => {
        setAlertMsg('Action Failed !')
        setSeverityAlert('error');
      })
      .finally(() => {
        setLoadingBar(false);
        setSnackBar(true);
        setShowModalEdit(false);
        setDisabled(false);
      })

  };
  const handleModalDelete = (e) => {
    e.preventDefault();

    setLoadingBar(true)
    setDisabled(true);

    const payload = {
      paramId: paramId
    }

    deleteParameter(payload, token)
      .then(data => {
        setAlertMsg('Action Success !')
        setSeverityAlert('success');

        getAllParameter(token)
          .then( data => {
            const newData = data.data.sort((a, b) => b.default-a.default);
            setParameters(newData);
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        setAlertMsg('Action Failed !')
        setSeverityAlert('error');
      })
      .finally(() => {
        setLoadingBar(false);
        setSnackBar(true);
        setShowModalDelete(false);
        setDisabled(false);
      })
  }

  const resetState = () => {
    setParamA('');
    setParamB('');
    setParamC('');
    setParamD('');
    setParamId('');
    setparamDefault(false);
    console.log('reset');
  }

  const handleButtonEdit = (e, parameter) => {
    e.preventDefault();
    setShowModalEdit(true);
    setParamA(parameter.param_a);
    setParamB(parameter.param_b);
    setParamC(parameter.param_c);
    setParamD(parameter.param_d);
    setparamDefault(parameter.default);
    setParamId(parameter._id);
  }
  const handleButtonDelete = (e, parameter) => {
    e.preventDefault();
    setShowModalDelete(true)
    setParamId(parameter._id);
  }

  const handleButtonSetDefault =(e, parameter) => {
    e.preventDefault();

    setLoadingSetDefault(true);

    const payload = {
      paramId: parameter._id,
    }

    setDefaultParam(payload, token)
      .then(data => {
          console.log(data);
          setAlertMsg('Action Success !')
          setSeverityAlert('success');

          getAllParameter(token)
            .then( data => {
              const newData = data.data.sort((a, b) => b.default-a.default);
              setParameters(newData);
            })
            .catch(error => {
              console.log(error);
            })
      })
      .catch(err => {
          setAlertMsg('Action Failed !')
          setSeverityAlert('error');
      })
      .finally(() => {
          setLoadingSetDefault(false);
          setSnackBar(true);
      })
  };

  useEffect(() => {
    getAllParameter(token)
      .then( data => {
        const newData = data.data.sort((a, b) => b.default-a.default);
        setParameters(newData);
      })
      .catch(error => {
        console.log(error);
      })
}, []);

  return (
    <Card>
      <CardHeader color="purple" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl">List Parameter</h2>
            <a href={`${window.location.origin}/parameter-detail`} className="text-blue-400 text-lg font-light">Parameter Information</a>
          </div>
          <Button
            color="green"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={(e) => setShowModalAdd(true)}
        >
          Add
        </Button>
        </div>
      </CardHeader>
      {parameters.length === 0  && <LinearProgress />}
      {loadingSetDefault && <LinearProgress />}
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Param A
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Param B
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Param C
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Param D
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Default
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {parameters.map(param => (
              <tr key={param._id}>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {param.param_a}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {param.param_b}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {param.param_c}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {param.param_d}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {param.default ? `True` : `False`}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <div className="flex">
                  <Button
                      className="mr-2"
                      color="orange"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => handleButtonEdit(e, param)}
                    >
                        Edit
                    </Button>
                    {
                      !param.default && 
                      <Button
                      className="mr-2"
                      color="red"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => handleButtonDelete(e, param)}
                    >
                        Delete
                    </Button>
                    }
                    {param.default ? 
                      null
                     : 
                     <Button
                      color="blue"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => handleButtonSetDefault(e, param)}
                    >
                        Set Default
                    </Button> }
                  </div>
                </th>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </CardBody>

      {/* MODAL EDIT */}
      <Modal size="regular" active={showModalEdit}>
        <ModalHeader toggler={!disabled ? () => {
          resetState();
          setShowModalEdit(false);
          }
          : null}>
          Edit Parameter
        </ModalHeader>
        <ModalBody>
        {loadingBar && <LinearProgress />}
            <form>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramA}
                              onChange={(e) => handleParamA(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter A"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramB}
                              onChange={(e) => handleParamB(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter B"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramC}
                              onChange={(e) => handleParamC(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter C"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramD}
                              onChange={(e) => handleParamD(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter D"
                          />
                      </div>
                  </div>
              </form>
        </ModalBody>
        <ModalFooter>
            <Button 
              disabled={disabled}
              color="red"
              buttonType="link"
              onClick={(e) => {
                resetState();
                setShowModalEdit(false);
                }
              }
              ripple="dark"
            >
              Close
            </Button>

            <Button
              disabled={disabled}
              color="green"
              onClick={(e) => handleModalEditSave(e)}
              ripple="light"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL ADD */}
      <Modal size="regular" active={showModalAdd}>
        <ModalHeader toggler={!disabled ? () => {
          resetState();
          setShowModalAdd(false); 
          }: null}>
          Add Parameter
        </ModalHeader>
        <ModalBody>
        {loadingBar && <LinearProgress />}
            <form>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramA}
                              onChange={(e) => handleParamA(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter A"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramB}
                              onChange={(e) => handleParamB(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter B"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramC}
                              onChange={(e) => handleParamC(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter C"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={paramD}
                              onChange={(e) => handleParamD(e)}
                              type="number"
                              color="purple"
                              placeholder="Parameter D"
                          />
                      </div>
                  </div>
              </form>
        </ModalBody>
        <ModalFooter>
            <Button 
              disabled={disabled}
              color="red"
              buttonType="link"
              onClick={(e) => {
                resetState();
                setShowModalAdd(false);
                }}
              ripple="dark"
            >
              Close
            </Button>

            <Button
              disabled={disabled}
              color="green"
              onClick={(e) => handleModalAddSave(e)}
              ripple="light"
            >
              Add Parameter
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL DELETE */}
          <Modal size="sm" active={showModalDelete}>
              <ModalHeader toggler={() => {
                resetState();
                setShowModalDelete(false);
                }
              }>
                      Delete User
              </ModalHeader>
              {loadingBar && <LinearProgress />}
              <ModalBody>
                  <p className="text-base leading-relaxed text-gray-600 font-normal">
                    Are you sure you want to delete this parameter ? This action can not be undone.
                  </p>
              </ModalBody>
              <ModalFooter>
                  <Button
                      disabled={disabled}
                      color="red"
                      onClick={(e) => handleModalDelete(e)}
                      ripple="light"
                  >
                      Delete
                  </Button>
              </ModalFooter>
            </Modal>
            {/* SnackBar */}
            <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severityAlert}>
                    {alertMsg}
                </Alert>
            </Snackbar>
    </Card>
    
  );
}
