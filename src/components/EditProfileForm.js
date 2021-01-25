import React, { useState, useEffect } from "react";
import useForm from "../utilities/useForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const EditProfileForm = (props) => {
    const [values, handleChange] = useForm({ username: null, bio: "" });
    const [avatar, setAvatar] = useState(null);
    const [avatarPath, setAvatarPath] = useState(null);
    const SERVER = process.env.REACT_APP_SERVER;
    const history = useHistory();

    useEffect(() => {
        // get avatars from DOM once page is mounted
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
        const horse = document.getElementById("horse");
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
            horse,
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

        const selectAvatar = (ele) => {
            if (ele.id === "polar-bear") {
                setAvatar("Polar Bear");
            } else if (ele.id === "sheep2") {
                setAvatar("Sheep");
            } else {
                setAvatar(capitalizeFirstLetter(ele.id));
            }
            setAvatarPath(ele.alt);
        };

        // set already selected values
        setAvatarPath(props.user.avatar);
        let previousAvatar;
        avatars.forEach((avatar) => {
            // console.log(avatar.alt);
            if (props.user.avatar === avatar.alt) {
                selectAvatar(avatar);
                avatar.classList.add("avatar-selection")
            }
        });

        // manage selections
        avatars.forEach((ele) => {
            ele.addEventListener("click", () => {
                selectAvatar(ele);
                avatars.forEach((ele2) => {
                    if (ele2 !== ele) {
                        ele2.classList.remove("avatar-selection");
                    } else {
                        ele.classList.add("avatar-selection");
                    }
                });
            });
        });
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSubmit = async () => {
        if (!values.username) {
            console.log("Username is required");
            return;
        }
        // update the user
        try {
            await axios.put(`${SERVER}/users/dashboard-update`, {
                username: values.username,
                bio: values.bio,
                avatar: avatarPath,
                id: props.user.id,
            });
            let apiRes = await axios.get(
                `${SERVER}/users/current/${props.user.id}`
            );
            const updatedUser = await apiRes.data.requestedUser;
            props.setUser(updatedUser);
            history.push("/profile");
        } catch (error) {
            console.log(`UPDATE ERROR: ${error}`);
        }
    };

    return (
        <div className="edit-profile-modal">
            <h3>Edit Profile</h3>
            <FormControl>
                <h3>Change Avatar: {avatar}</h3>
                <div className="avatar-container">
                    {/* prettier-ignore */}
                    <img id="llama" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/001-llama.svg"} alt="/images/avatars/001-llama.svg"/>
                    {/* prettier-ignore */}
                    <img id="buffalo" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/002-buffalo.svg"} alt="/images/avatars/002-buffalo.svg"/>
                    {/* prettier-ignore */}
                    <img id="chicken" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/004-chicken.svg"} alt="/images/avatars/004-chicken.svg"/>
                    {/* prettier-ignore */}
                    <img id="crocodile" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/005-crocodile.svg"} alt="/images/avatars/005-crocodile.svg"/>
                    {/* prettier-ignore */}
                    <img id="deer" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/006-deer.svg"} alt="/images/avatars/006-deer.svg"/>
                    {/* prettier-ignore */}
                    <img id="duck" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/007-duck.svg"} alt="/images/avatars/007-duck.svg"/>
                    {/* prettier-ignore */}
                    <img id="elephant" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/009-elephant.svg"} alt="/images/avatars/009-elephant.svg"/>
                    {/* prettier-ignore */}
                    <img id="frog" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/010-frog.svg"} alt="/images/avatars/010-frog.svg"/>
                    {/* prettier-ignore */}
                    <img id="gorilla" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/011-gorilla.svg"} alt="/images/avatars/011-gorilla.svg"/>
                    {/* prettier-ignore */}
                    <img id="hippopotamus" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/012-hippopotamus.svg"} alt="/images/avatars/012-hippopotamus.svg"/>
                    {/* prettier-ignore */}
                    <img id="horse" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/013-horse.svg"} alt="/images/avatars/013-horse.svg"/>
                    {/* prettier-ignore */}
                    <img id="sheep" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/015-sheep.svg"} alt="/images/avatars/015-sheep.svg"/>
                    {/* prettier-ignore */}
                    <img id="owl" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/016-owl.svg"} alt="/images/avatars/016-owl.svg"/>
                    {/* prettier-ignore */}
                    <img id="panda" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/017-panda.svg"} alt="/images/avatars/017-panda.svg"/>
                    {/* prettier-ignore */}
                    <img id="parrot" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/018-parrot.svg"} alt="/images/avatars/018-parrot.svg"/>
                    {/* prettier-ignore */}
                    <img id="polar-bear" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/019-polar bear.svg"} alt="/images/avatars/019-polar bear.svg"/>
                    {/* prettier-ignore */}
                    <img id="rabbit" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/020-rabbit.svg"} alt="/images/avatars/020-rabbit.svg"/>
                    {/* prettier-ignore */}
                    <img id="raccoon" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/021-raccoon.svg"} alt="/images/avatars/021-raccoon.svg"/>
                    {/* prettier-ignore */}
                    <img id="rhinoceros" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/022-rhinoceros.svg"} alt="/images/avatars/022-rhinoceros.svg"/>
                    {/* prettier-ignore */}
                    <img id="shark" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/023-shark.svg"} alt="/images/avatars/023-shark.svg"/>
                    {/* prettier-ignore */}
                    <img id="sheep2" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/024-sheep.svg"} alt="/images/avatars/024-sheep.svg"/>
                    {/* prettier-ignore */}
                    <img id="zebra" className="avatar-img" src={process.env.PUBLIC_URL + "/images/avatars/025-zebra.svg"} alt="/images/avatars/025-zebra.svg"/>
                </div>
                <span>Change username</span>
                <Box mb={2} mt={1}>
                    <TextField
                        required="true"
                        fullWidth="true"
                        label="Username"
                        type="text"
                        variant="outlined"
                        size="small"
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
};

export default EditProfileForm;
