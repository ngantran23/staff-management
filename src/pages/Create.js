import { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Stack, avatarClasses } from "@mui/material";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
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

    const [name, setName] = useState("");
    const [isNameValid, setIsNameValid] = useState(true);

    const handleNameChange = (event) => {
        const inputName = event.target.value;
        setName(inputName);
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

    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const handleAgeChange = (event) => {
        const inputAge = event.target.value;
        setAge(inputAge);

        if (inputAge < 1 || inputAge > 100) {
            setError("Tuổi không hợp lệ. Vui lòng nhập lại từ 1 đến 100.");
        } else {
            setError("");
        }
    };
    function handleSubmit() {
        axios
            .post(
                "https://6499001779fbe9bcf83e8f0b.mockapi.io/staffManagement",
                {
                    name,
                    age,
                    address,
                    avatar: imageUrl,
                    createdAt: new Date(),
                }
            )
            .then(function (response) {
                // handle success
                // enqueueSnackbar('Sản phẩm được thêm thành công!', { variant: 'success' });
                // navigate('/dashboard');
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
                padding: 4,
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
                    Add Staff
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
                        placeholder="Enter Avatar URL"
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

                <Stack direction="row" gap={3}>
                    <TextField
                        label="Name"
                        placeholder="Enter Name"
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
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button
                    size="md"
                    variant="soft"
                    onClick={handleSubmit}
                    color="neutral"
                >
                    Save
                </Button>
            </Stack>
        </Paper>
    );
}

export default Create;
