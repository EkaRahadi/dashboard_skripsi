import React, { useState, useEffect } from "react";
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

export default function CardTable() {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingBar, setLoadingBar] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [severityAlert, setSeverityAlert] = useState('success');
  const [alertMsg, setAlertMsg] = useState('Action Success!')

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleFullName = (e) => {
    // e.preventDefault();
    setFullname(e.target.value);
  };
  const handleEmail = (e) => {
      // e.preventDefault();
      setEmail(e.target.value);
  };
  const handlePassword = (e) => {
      // e.preventDefault();
      setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
      // e.preventDefault();
      setConfirmPassword(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };
  const handleModalAddSave = (e) => {
    setLoadingBar(true)
    setDisabled(true);
    setTimeout(() => {
        setAlertMsg('Action Failed!')
        setSeverityAlert('error');
        setLoadingBar(false);
        setSnackBar(true);
        setShowModalEdit(false);
        setDisabled(false);
    }, 4000);
  };
  const handleModalEditSave = (e) => {
    setLoadingBar(true)
    setDisabled(true);
    setTimeout(() => {
        setAlertMsg('Action Failed!')
        setSeverityAlert('error');
        setLoadingBar(false);
        setSnackBar(true);
        setShowModalEdit(false);
        setDisabled(false);
    }, 4000);
  };
  const handleModalDelete = (e) => {
    setLoadingBar(true)
    setDisabled(true);
    setTimeout(() => {
      setLoadingBar(false);
      setSnackBar(true);
      setShowModalDelete(false);
      setDisabled(false);
  }, 4000);
  }

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
          <h2 className="text-white text-2xl">List User</h2>
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
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Full Name
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Email
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Eka Rahadi
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  ekarahadi98@gmail.com
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <div className="flex flex-wrap">
                  <Button
                      className="mr-2"
                      color="orange"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => setShowModalEdit(true)}
                    >
                        Edit
                    </Button>
                    <Button
                      color="red"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => setShowModalDelete(true)}
                    >
                        Delete
                    </Button>
                  </div>
                </th>
              </tr>
              <tr>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Eka Rahadi
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  ekarahadi16@gmail.com
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                <div className="flex flex-wrap">
                  <Button
                      className="mr-2"
                      color="orange"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => setShowModalEdit(true)}
                    >
                        Edit
                    </Button>
                    <Button
                      color="red"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => setShowModalDelete(true)}
                    >
                        Delete
                    </Button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>

      {/* MODAL EDIT */}
      <Modal size="regular" active={showModalEdit}>
        <ModalHeader toggler={!disabled ? () => setShowModalEdit(false): null}>
          Edit User Information
        </ModalHeader>
        <ModalBody>
        {loadingBar && <LinearProgress />}
            <form>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handleFullName(e)}
                              type="text"
                              color="purple"
                              placeholder="Full Name"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handleEmail(e)}
                              type="email"
                              color="purple"
                              placeholder="Email Address"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handlePassword(e)}
                              type="password"
                              color="purple"
                              placeholder="Password"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handleConfirmPassword(e)}
                              type="password"
                              color="purple"
                              placeholder="Password Confirm"
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
              onClick={(e) => setShowModalEdit(false)}
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
        <ModalHeader toggler={!disabled ? () => setShowModalAdd(false): null}>
          Add User
        </ModalHeader>
        <ModalBody>
        {loadingBar && <LinearProgress />}
            <form>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handleFullName(e)}
                              type="text"
                              color="purple"
                              placeholder="Full Name"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handleEmail(e)}
                              type="email"
                              color="purple"
                              placeholder="Email Address"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handlePassword(e)}
                              type="password"
                              color="purple"
                              placeholder="Password"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                          <Input
                              onChange={(e) => handleConfirmPassword(e)}
                              type="password"
                              color="purple"
                              placeholder="Password Confirm"
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
              onClick={(e) => setShowModalAdd(false)}
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
              Add User
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL DELETE */}
          <Modal size="sm" active={showModalDelete}>
              <ModalHeader toggler={() => setShowModalDelete(false)}>
                      Delete User
              </ModalHeader>
              {loadingBar && <LinearProgress />}
              <ModalBody>
                  <p className="text-base leading-relaxed text-gray-600 font-normal">
                    Are you sure you want to delete this user ? This action can not be undone.
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
