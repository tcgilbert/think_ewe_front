import React from "react";
import useForm from "../utilities/useForm";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Dashboard = (props) => {
    const [values, handleChange] = useForm({ username: null, bio: "" });
    const SERVER = process.env.REACT_APP_SERVER;

    const handleSubmit = async () => {
        console.log("updating user");
        if (!values.username) {
            console.log("Username is required");
            return;
        }
        // update the user
        try {
            await axios.put(`${SERVER}/users/dashboard-update`, {
                username: values.username,
                bio: values.bio,
                id: props.user.id,
            });
            let apiRes = await axios.get(`${SERVER}/users/${props.user.id}`);
            const updatedUser = await apiRes.data.requestedUser;
            const userCopy = JSON.parse(JSON.stringify(props.user));
            userCopy.username = updatedUser.username;
            userCopy.bio = updatedUser.bio;
            userCopy.registered = updatedUser.registered;
            props.setUser(userCopy);
        } catch (error) {
            console.log(`UPDATE ERROR: ${error}`);
        }
    };

    const handleRedirect = () => {
        if (props.user.registered) {
            return <Redirect to="/profile" />;
        } else {
            return (
                <div className="dashboard-container">
                    <h3>Welcome, {props.user.name}!</h3>
                    <FormControl>
                        <div className="avatar-container">
                            
                                <img id="llama" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/001-llama.svg"} alt="llama"/>
                                <img id="buffalo" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/002-buffalo.svg"} alt="buffalo"/>
                                <img id="chicken" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/004-chicken.svg"} alt="chicken"/>
                                <img id="crocodile" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/005-crocodile.svg"} alt="crocodile"/>
                                <img id="deer" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/006-deer.svg"} alt="deer"/>
                                <img id="duck" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/007-duck.svg"} alt="duck"/>
                                <img id="elephant" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/009-elephant.svg"} alt="elephant"/>
                                <img id="frog" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/010-frog.svg"} alt="frog"/>
                                <img id="gorilla" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/011-gorilla.svg"} alt="gorilla"/>
                                <img id="hippopotamus" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/012-hippopotamus.svg"} alt="hippopotamus"/>
                                <img id="horse" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/013-horse.svg"} alt="horse"/>
                                <img id="sheep" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/015-sheep.svg"} alt="sheep"/>
                                <img id="owl" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/016-owl.svg"} alt="owl"/>
                                <img id="panda" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/017-panda.svg"} alt="panda"/>
                                <img id="parrot" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/018-parrot.svg"} alt="parrot"/>
                                <img id="polar-bear" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/019-polar bear.svg"} alt="polar bear"/>
                                <img id="rabbit" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/020-rabbit.svg"} alt="rabbit"/>
                                <img id="raccoon" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/021-raccoon.svg"} alt="raccoon"/>
                                <img id="rhinoceros" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/022-rhinoceros.svg"} alt="rhinoceros"/>
                                <img id="shark" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/023-shark.svg"} alt="shark"/>
                                <img id="sheep" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/024-sheep.svg"} alt="sheep"/>
                                <img id="zebra" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/025-zebra.svg"} alt="zebra"/>
                            
                        </div>
                        <span>Select a username</span>
                        <Box mb={2} mt={1}>
                            <TextField
                                required="true"
                                fullWidth="true"
                                label="Username"
                                type="text"
                                variant="outlined"
                                size="small"
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth="true"
                                label="Bio (optional)"
                                type="text"
                                variant="outlined"
                                multiline
                                rows={4}
                                size="small"
                                type="text"
                                name="bio"
                                value={values.bio}
                                onChange={handleChange}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </div>
            );
        }
    };
    return <div>{handleRedirect()}</div>;
};

export default Dashboard;
