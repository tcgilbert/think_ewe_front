import React from "react";
import useForm from "../utilities/useForm";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Dashboard = (props) => {
    const [values, handleChange] = useForm({ username: null, bio: "" });
    const SERVER = process.env.REACT_APP_SERVER;

    // get avatars from DOM
    const llama = document.getElementById("llama");
    const buffalo = document.getElementById("buffalo");
    const chicken = document.getElementById("chicken");
    const crocodile = document.getElementById("crocodile");
    const deer = document.getElementById("deer");
    const duck = document.getElementById("duck");
    const elephant = document.getElementById("elephant");
    const frog = document.getElementById("frog");
    const gorilla = document.getElementById("gorilla");
    const hippopotamus = document.getElementById("hippopotamus");
    const sheep = document.getElementById("sheep");
    const owl = document.getElementById("owl");
    const panda = document.getElementById("panda");
    const parrot = document.getElementById("parrot");
    const polarBear = document.getElementById("polar-bear");
    const rabbit = document.getElementById("rabbit");
    const raccoon = document.getElementById("raccoon");
    const rhinoceros = document.getElementById("rhinoceros");
    const shark = document.getElementById("shark");
    const sheep2 = document.getElementById("sheep2");
    const zebra = document.getElementById("zebra");

    const avatars = [
        llama,
        buffalo,
        chicken,
        crocodile,
        deer,
        duck,
        elephant,
        frog,
        gorilla,
        hippopotamus,
        sheep,
        owl,
        panda,
        parrot,
        polarBear,
        rabbit,
        raccoon,
        rhinoceros,
        shark,
        sheep2,
        zebra,
    ];

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
                        <h3>Select an avatar</h3>
                        <div className="avatar-container">
                            {/* prettier-ignore */}
                            <img id="llama" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/001-llama.svg"} value="/images/avatars/001-llama.svg" alt="llama"/>
                            {/* prettier-ignore */}
                            <img id="buffalo" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/002-buffalo.svg"} value="/images/avatars/002-buffalo.svg" alt="buffalo"/>
                            {/* prettier-ignore */}
                            <img id="chicken" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/004-chicken.svg"} value="/images/avatars/004-chicken.svg" alt="chicken"/>
                            {/* prettier-ignore */}
                            <img id="crocodile" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/005-crocodile.svg"} value="/images/avatars/005-crocodile.svg" alt="crocodile"/>
                            {/* prettier-ignore */}
                            <img id="deer" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/006-deer.svg"} value="/images/avatars/006-deer.svg" alt="deer"/>
                            {/* prettier-ignore */}
                            <img id="duck" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/007-duck.svg"} value="/images/avatars/007-duck.svg" alt="duck"/>
                            {/* prettier-ignore */}
                            <img id="elephant" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/009-elephant.svg"} value="/images/avatars/009-elephant.svg" alt="elephant"/>
                            {/* prettier-ignore */}
                            <img id="frog" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/010-frog.svg"} value="/images/avatars/010-frog.svg" alt="frog"/>
                            {/* prettier-ignore */}
                            <img id="gorilla" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/011-gorilla.svg"} value="/images/avatars/011-gorilla.svg" alt="gorilla"/>
                            {/* prettier-ignore */}
                            <img id="hippopotamus" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/012-hippopotamus.svg"} value="/images/avatars/012-hippopotamus.svg" alt="hippopotamus"/>
                            {/* prettier-ignore */}
                            <img id="horse" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/013-horse.svg"} value="/images/avatars/013-horse.svg" alt="horse"/>
                            {/* prettier-ignore */}
                            <img id="sheep" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/015-sheep.svg"} value="/images/avatars/015-sheep.svg" alt="sheep"/>
                            {/* prettier-ignore */}
                            <img id="owl" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/016-owl.svg"} value="/images/avatars/016-owl.svg" alt="owl"/>
                            {/* prettier-ignore */}
                            <img id="panda" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/017-panda.svg"} value="/images/avatars/017-panda.svg" alt="panda"/>
                            {/* prettier-ignore */}
                            <img id="parrot" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/018-parrot.svg"} value="/images/avatars/018-parrot.svg" alt="parrot"/>
                            {/* prettier-ignore */}
                            <img id="polar-bear" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/019-polar bear.svg"} value="/images/avatars/019-polar bear.svg" alt="polar bear"/>
                            {/* prettier-ignore */}
                            <img id="rabbit" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/020-rabbit.svg"} value="/images/avatars/020-rabbit.svg" alt="rabbit"/>
                            {/* prettier-ignore */}
                            <img id="raccoon" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/021-raccoon.svg"} value="/images/avatars/021-raccoon.svg" alt="raccoon"/>
                            {/* prettier-ignore */}
                            <img id="rhinoceros" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/022-rhinoceros.svg"} value="/images/avatars/022-rhinoceros.svg" alt="rhinoceros"/>
                            {/* prettier-ignore */}
                            <img id="shark" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/023-shark.svg"} value="/images/avatars/023-shark.svg" alt="shark"/>
                            {/* prettier-ignore */}
                            <img id="sheep2" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/024-sheep.svg"} value="/images/avatars/024-sheep.svg" alt="sheep"/>
                            {/* prettier-ignore */}
                            <img id="zebra" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/025-zebra.svg"} value="/images/avatars/025-zebra.svg" alt="zebra"/>
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
