import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/joy/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Actions = ({ data, setList }) => {
    const [open, setOpen] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertClose = () => {
        setShowSuccessAlert(false);
    };

    const handleDelete = () => {
        axios
            .delete(
                `https://6499001779fbe9bcf83e8f0b.mockapi.io/staffManagement/${data.row.id}`
            )
            .then(function (response) {
                // handle success
                // enqueueSnackbar('Đã ẩn sản phẩm', { variant: 'success' });
                console.log(response);
                setList((prev) =>
                    prev.filter((staff) => staff.id !== response.data.id)
                );

                setOpen(false);
                setShowSuccessAlert(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };


    return (
        <Stack direction="row" spacing={0.5}>
            <React.Fragment>
                <Link
                    to="/update"
                    state={{
                        staffId: data.row.id,
                    }}
                >
                    <IconButton
                        size="sm"
                        variant="plain"
                        aria-label="edit"
                        color="black"
                    >
                        <EditIcon />
                    </IconButton>
                </Link>
                <IconButton
                    size="sm"
                    variant="plain"
                    aria-label="delete"
                    onClick={handleClickOpen}
                    color="black"
                >
                    <DeleteIcon />
                </IconButton>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Bạn có chắc chắn muốn xóa không?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Hành động này không thể hoàn tác.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Không</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Có
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={showSuccessAlert}
                    autoHideDuration={3000}
                    onClose={handleAlertClose}
                >
                    <MuiAlert
                        onClose={handleAlertClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Đã xóa thành công!
                    </MuiAlert>
                </Snackbar>
            </React.Fragment>
        </Stack>
    );
};

export default function DashboardTable({ rows = [] }) {
    const [list, setList] = useState(rows);

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        {
            field: "avatar",
            headerName: "Avatar",
            width: 100,
            renderCell: (rowData) => (
                <img
                    src={rowData.value}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    alt=""
                />
            ),
            headerAlign: "center",
            align: "center",
        },
        { field: "name", headerName: "Name", width: 150 },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 60,
            editable: true,
        },
        {
            field: "address",
            headerName: "Address",
            width: 200,
            editable: true,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            width: 200,
            editable: true,
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            width: 100,
            renderCell: (rowAction) => (
                <Actions data={rowAction} setList={setList} />
            ),
        },
    ];

    return (
        <DataGrid
            rows={list}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    );
}
