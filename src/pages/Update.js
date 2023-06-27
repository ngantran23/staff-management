import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Update() {
    const location = useLocation();
    const staffId = location.state.staffId;
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [staff, setStaff] = useState(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
        setIsFormDirty(true);
    };
    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
        setIsFormDirty(true);
    };

    const handleCopyImageUrl = () => {
        // Copy the image URL to clipboard
        navigator.clipboard
            .writeText(imageUrl)
            .then(() => {
                console.log("Image URL copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy image URL:", error);
            });
    };
    const [isNameValid, setIsNameValid] = useState(true);

    const handleNameChange = (event) => {
        const inputName = event.target.value;
        setName(inputName);
        setIsFormDirty(true);
    };

    const checkName = () => {
        // Kiểm tra tính hợp lệ của tên ở đây
        // Ví dụ: Tên phải có ít nhất 2 từ
        const words = name.trim().split(" ");
        return words.length > 2;
    };

    const handleBlur = () => {
        const isValid = checkName();
        if (isValid) {
            setIsNameValid(true);
        } else {
            setIsNameValid(false);
        }
    };

    const handleAgeChange = (event) => {
        const inputAge = event.target.value;
        setIsFormDirty(true);
        setAge(inputAge);

        if (inputAge < 1 || inputAge > 100) {
            setError("Tuổi không hợp lệ. Vui lòng nhập lại từ 1 đến 100.");
        } else {
            setError("");
        }
    };

    useEffect(() => {
        axios
            .get(
                `https://6499001779fbe9bcf83e8f0b.mockapi.io/staffManagement/${staffId}`
            )
            .then((response) => {
                const staffData = response.data;
                setStaff(staffData);
                setName(staffData.name);
                setAge(staffData.age);
                setAddress(staffData.address);
                setImageUrl(staffData.avatar);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    function handleSubmit() {
        axios
            .put(
                `https://6499001779fbe9bcf83e8f0b.mockapi.io/staffManagement/${staffId}`,
                {
                    name,
                    age,
                    address,
                    avatar: imageUrl,
                    createdAt: new Date(),
                }
            )
            .then(function (response) {
                console.log(response);
                navigate("/dashboard");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    return (
        <Paper
            elevation={1}
            sx={{
                padding: 5,
                marginTop: 15,
                marginBottom: 15,
                marginLeft: 30,
                marginRight: 30,
            }}
        >
            <Link to="/dashboard">
                <Button
                    size="md"
                    color="neutral"
                    variant="plain"
                    startDecorator={<KeyboardReturnIcon />}
                >
                    Back
                </Button>
            </Link>
            <Stack direction="column" gap={3} width="70%" margin="auto">
                <Typography
                    textAlign="center"
                    fontSize="32px"
                    fontWeight="bold"
                    color="neutral"
                    variant="plain"
                >
                    Update Staff
                </Typography>
                <Stack
                    direction="row"
                    gap={3}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <TextField
                        label="Avatar URL"
                        type="text"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        placeholder="Enter image URL"
                        style={{ width: "70%" }}
                    />

                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Image Preview"
                            style={{
                                border: "1px dashed #ccc",
                                objectFit: "cover",
                                width: "100px",
                                heigh: "100px",
                            }}
                        />
                    )}
                </Stack>

                <Stack direction="row" gap={2}>
                    <TextField
                        id="outlined-textarea"
                        label="Name"
                        placeholder="Enter Name"
                        multiline
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleBlur}
                        error={!isNameValid}
                        helperText={
                            !isNameValid
                                ? "Name must have more than 2 words"
                                : ""
                        }
                        sx={{ width: "70%" }}
                    />
                    <TextField
                        sx={{ width: "25%" }}
                        label="Age"
                        type="number"
                        value={age}
                        onChange={handleAgeChange}
                        error={!!error}
                        helperText={error}
                    />
                </Stack>
                <TextField
                    id="outlined-textarea"
                    label="Address:"
                    value={address}
                    placeholder="Enter Address"
                    multiline
                    onChange={handleAddressChange}
                />
                <Button
                    size="md"
                    variant="soft"
                    onClick={handleSubmit}
                    color="neutral"
                    disabled={!isFormDirty}
                >
                    Save
                </Button>
            </Stack>
        </Paper>
    );
}

export default Update;
