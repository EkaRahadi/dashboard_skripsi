import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userList, userProfile } from "../store/index"
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
import { addUser, getAllUser, updateUser, deleteUser, getUser } from '../api/authApi';

export default function CardTable() {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [loadingBar, setLoadingBar] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [severityAlert, setSeverityAlert] = useState('success');
  const [alertMsg, setAlertMsg] = useState('Action Success!')

  const [users, setUsers] = useRecoilState(userList);
  const token = window.localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useRecoilState(userProfile);

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
    e.preventDefault();
    if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
      setAlertMsg('All field are required !')
      setSeverityAlert('error');
      setSnackBar(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMsg('Password and Confirm Password not match !')
      setSeverityAlert('error');
      setSnackBar(true);
      return;
    }

    setLoadingBar(true)
    setDisabled(true);

    const payload = {
      name: fullname,
      email: email,
      password: password
    }

    addUser(payload, token)
      .then(data => {
        setAlertMsg('Action Success !')
        setSeverityAlert('success');

        getAllUser(token)
          .then( data => {
            setUsers(data.data);
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
        resetState();
      })
  };
  const handleModalEditSave = (e) => {
    e.preventDefault();
    if (fullname === '' || email === '') {
      setAlertMsg('Fullname and email are required !')
      setSeverityAlert('error');
      setSnackBar(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMsg('Password and Confirm Password not match !')
      setSeverityAlert('error');
      setSnackBar(true);
      return;
    }

    setLoadingBar(true)
    setDisabled(true);

    const payload = {
      email: email,
      name: fullname,
      userId: userId
    }

    if (password !== '') {
      payload['password'] = password
    }


    updateUser(payload, token)
      .then(data => {
        setAlertMsg('Action Success !')
        setSeverityAlert('success');

        getAllUser(token)
          .then( data => {
            setUsers(data.data);
          })
          .catch(error => {
            console.log(error);
          })
        
          if (currentUser.user_id === userId) {
            getUser({userId: userId}, token)
              .then( data => {
                setCurrentUser(data.data[0])
              })
              .catch(error => {
                console.log(error);
              })
          }
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
      userId: userId
    }

    deleteUser(payload, token)
      .then(data => {
        setAlertMsg('Action Success !')
        setSeverityAlert('success');

        getAllUser(token)
          .then( data => {
            setUsers(data.data);
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
    setEmail('');
    setFullname('');
    setPassword('');
    setConfirmPassword('');
    setUserId('');
    console.log('reset');
  }

  const handleButtonEdit = (e, user) => {
    e.preventDefault();
    setShowModalEdit(true);
    setEmail(user.email);
    setFullname(user.user_name);
    setUserId(user.user_id);
  }
  const handleButtonDelete = (e, user) => {
    e.preventDefault();
    setShowModalDelete(true)
    setUserId(user.user_id);
  }

  useEffect(() => {
    getAllUser(token)
      .then( data => {
        setUsers(data.data);
      })
      .catch(error => {
        console.log(error);
      })
}, []);

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
      {users.length === 0  && <LinearProgress />}
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
            {users.map(user => (
              <tr key={user.user_id}>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {user.user_name}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {user.email}
                </th>
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <div className="flex flex-wrap">
                  <Button
                      className="mr-2 mb-2"
                      color="orange"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => handleButtonEdit(e, user)}
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
                      onClick={(e) => handleButtonDelete(e, user)}
                    >
                        Delete
                    </Button>
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
          Edit User Information
        </ModalHeader>
        <ModalBody>
        {loadingBar && <LinearProgress />}
            <form>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={fullname}
                              onChange={(e) => handleFullName(e)}
                              type="text"
                              color="purple"
                              placeholder="Full Name"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={email}
                              onChange={(e) => handleEmail(e)}
                              type="email"
                              color="purple"
                              placeholder="Email Address"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={password}
                              onChange={(e) => handlePassword(e)}
                              type="password"
                              color="purple"
                              placeholder="Password"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={confirmPassword}
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
          } : null}>
          Add User
        </ModalHeader>
        <ModalBody>
        {loadingBar && <LinearProgress />}
            <form>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={fullname}
                              onChange={(e) => handleFullName(e)}
                              type="text"
                              color="purple"
                              placeholder="Full Name"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={email}
                              onChange={(e) => handleEmail(e)}
                              type="email"
                              color="purple"
                              placeholder="Email Address"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={password}
                              onChange={(e) => handlePassword(e)}
                              type="password"
                              color="purple"
                              placeholder="Password"
                          />
                      </div>
                      <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                          <Input
                              value={confirmPassword}
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
              onClick={(e) => {
                resetState();
                setShowModalAdd(false);}}
              ripple="dark"
            >
              Close
            </Button>

            <Button
              disabled={disabled}
              color="green"
              onClick={(e) => {
                handleModalAddSave(e)}}
              ripple="light"
            >
              Add User
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
