import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Home({ data }) {
    const [staffList, setStaffList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleClickOpen = (staff) => {
        setSelectedStaff(staff);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get("https://6499001779fbe9bcf83e8f0b.mockapi.io/staffManagement")
            .then((response) => {
                setStaffList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Grid
            sx={{
                paddingTop: 15,
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 8,
            }}
            container
            spacing={4}
        >
            {staffList.length > 0 &&
                staffList.map(function (staff) {
                    return (
                        <Grid item xs={3} key={staff.id}>
                            <Card sx={{ maxWidth: 345, position: "relative" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={staff.avatar}
                                        alt="avatar"
                                        sx={{ objectFit: "cover" }}
                                    />
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                                fontSize="16px"
                                                fontWeight="bold"
                                            >
                                                {staff.name}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                fontSize="14px"
                                            >
                                                Age: {staff.age}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            fontSize="16px"
                                            mt={2}
                                        >
                                            {staff.address}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ mt: 5 }}>
                                    <Button
                                        size="sm"
                                        variant="soft"
                                        color="succes"
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            borderRadius: 0,
                                            color: "white",
                                            backgroundColor: "black",
                                            padding: 1.5,
                                            fontSize: "16px",
                                        }}
                                        onClick={() => handleClickOpen(staff)}
                                    >
                                        Detail
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <IconButton
                        aria-label="cancel"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogActions>
                <DialogContent
                    sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        paddingBottom: 2,
                        paddingTop: 0,
                    }}
                >
                    <DialogContentText id="alert-dialog-description">
                        {selectedStaff && (
                            <>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={selectedStaff.avatar}
                                    alt="avatar"
                                    sx={{
                                        objectFit: "cover",
                                        border: "1px solid #ccc",
                                    }}
                                />
                                <Divider sx={{ padding: 1 }} />
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mt={2}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color="black"
                                        gutterBottom
                                    >
                                        {selectedStaff.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        fontSize="14px"
                                    >
                                        Age: {selectedStaff.age}
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize="16px"
                                    mt={2}
                                >
                                    Address: {selectedStaff.address}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize="16px"
                                    mt={3}
                                >
                                    Created Date: {selectedStaff.createdAt}
                                </Typography>
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}
