import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {
  AccountBoxSharp,
  Email,
  PersonAdd,
  PhoneAndroid,
  Save,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  IsNullOrEmpty,
  validEmail,
  validPassword,
  validPhone,
} from "../../helpers/utility";
import { registerUserRequest } from "../../store/user/user.actions";

export default function SignUp() {
  const dispatch = useDispatch();
  const location = useLocation();
  // let fName = random.first();
  // let lName = random.last();
  const [values, setValues] = React.useState({
    firstName: "",
    email: "",
    password: "Test@123",
    confirmPassword: "Test@123",
  });

  const [acknowlege, setAcknowlege] = useState(false);

  const [isValidated, setValidated] = React.useState(false);

  const validate = () => {
    if (IsNullOrEmpty(values.firstName)) {
      return false;
    }

    if (IsNullOrEmpty(values.email) || !validEmail(values.email)) {
      return false;
    }
    if (IsNullOrEmpty(values.password) || !validPassword(values.password)) {
      return false;
    }
    if (IsNullOrEmpty(values.confirmPassword)) {
      return false;
    }
    if (values.confirmPassword !== values.password) {
      return false;
    }
    return true;
  };

  const handleReset = () => {
    setValidated(false);
    setValues({
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSave = () => {
    if (validate()) {
      setAcknowlege(true);
    } else {
      setValidated(true);
    }
  };

  return (
    <Container maxWidth="md">
      <h4 className="text-center p-4">Create User</h4>
      <Dialog
        maxWidth="md"
        open={acknowlege}
        onClose={() => setAcknowlege(false)}
      >
        <DialogTitle>Registration Information</DialogTitle>
        <Divider />
        <DialogContent>
          <p>Please verify the information and confirm</p>
          <List>
            <ListItem>
              <ListItemAvatar>
                <AccountBoxSharp />
              </ListItemAvatar>
              <ListItemText primary={values.firstName} secondary="Name" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Email />
              </ListItemAvatar>
              <ListItemText primary={values.email} secondary="Email" />
            </ListItem>
            <Divider />
          </List>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            alignItems={"center"}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setAcknowlege(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setAcknowlege(false);
                dispatch(
                  registerUserRequest({
                    name: values.firstName,
                    email: values.email,
                    password: values.password,
                  })
                );
              }}
            >
              I Agree
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Grid container spacing={4}>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <TextField
            variant="outlined"
            placeholder="First Name"
            label="First Name"
            value={values.firstName}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            fullWidth
            margin="dense"
            className="px-2"
            error={isValidated && IsNullOrEmpty(values.firstName)}
            helperText={
              isValidated && IsNullOrEmpty(values.firstName)
                ? "First Name should be valid"
                : ""
            }
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6}>
          <TextField
            variant="outlined"
            placeholder="Email"
            label="Email"
            value={values.email}
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            fullWidth
            margin="dense"
            className="px-2"
            error={
              isValidated &&
              (IsNullOrEmpty(values.email) || !validEmail(values.email))
            }
            helperText={
              isValidated &&
              (IsNullOrEmpty(values.email) || !validEmail(values.email))
                ? "Email should be valid"
                : ""
            }
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <TextField
            variant="outlined"
            placeholder="Password"
            label="Password"
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            fullWidth
            margin="dense"
            className="px-2"
            error={
              isValidated &&
              (IsNullOrEmpty(values.password) ||
                !validPassword(values.password))
            }
            helperText={
              isValidated &&
              (IsNullOrEmpty(values.password) ||
                !validPassword(values.password))
                ? "Password should be valid"
                : ""
            }
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <TextField
            variant="outlined"
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            fullWidth
            margin="dense"
            className="px-2"
            error={
              isValidated &&
              (IsNullOrEmpty(values.confirmPassword) ||
                !validPassword(values.confirmPassword) ||
                values.password !== values.confirmPassword)
            }
            helperText={
              isValidated &&
              (IsNullOrEmpty(values.confirmPassword) ||
                !validPassword(values.confirmPassword))
                ? "Password should be valid"
                : values.password !== values.confirmPassword
                ? "Password should match"
                : ""
            }
          />
        </Grid>

        <Grid xs={12} sm={12} className="p-2">
          <Container maxWidth="sm">
            <Grid container>
              <Grid xs={12} sm={12} md={6} lg={6} className="p-2">
                <Button
                  startIcon={<Save />}
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => handleSave()}
                >
                  Save Now
                </Button>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={6} className="p-2">
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={() => handleReset()}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
