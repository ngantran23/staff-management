import Paper from "@mui/material/Paper";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import DashboardTable from "../components/DashboardTable";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

function Dashboard() {
    const [staffList, setStaffList] = useState([]);
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
        <Paper
            elevation={3}
            sx={{
                margin: 15,
                height: "100%",
                padding: 5,
            }}
        >
            <Link to="/add">
                <Button
                    variant="soft"
                    color="neutral"
                    startDecorator={<AddIcon />}
                    sx={{ marginBottom: 4 }}
                >
                    <Typography fontSize='16px' fontWeight='bold'>Add</Typography>
                </Button>
            </Link>

            {staffList.length > 0 && <DashboardTable rows={staffList} />}
        </Paper>
    );
}

export default Dashboard;
