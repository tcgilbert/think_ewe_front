import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: "100px",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        paddingTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "10px",
        width: "50%",
        margin: "0 auto",
    },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function FollowsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (props.openFollowsModal) {
            setOpen(true);
        }
    }, [props.openFollowsModal]);

    const handleClose = () => {
        props.setOpenFollowsModal(false);
        setOpen(false);
    };

    const followersDisplayed = props.followers.map((user, idx) => {
        return (
            <div className="follows-modal-child">
                <div className="search-wrapper">
                    <div>
                        <div className="avatar-username">
                            <a
                                className="username-link-modal"
                                href={`/user/${user.username}`}
                            >
                                <img
                                    className="tiny-avatar"
                                    src={`${process.env.PUBLIC_URL}${user.avatar}`}
                                    alt="avatar"
                                />
                                @{user.username}
                            </a>
                        </div>
                    </div>
                    {user.name}
                </div>
            </div>
        );
    });

    const followingDisplayed = props.following.map((user, idx) => {
        return (
            <div className="follows-modal-child">
                <div className="search-wrapper">
                    <div>
                        <div className="avatar-username">
                            <a
                                className="username-link-modal"
                                href={`/user/${user.username}`}
                            >
                                <img
                                    className="tiny-avatar"
                                    src={`${process.env.PUBLIC_URL}${user.avatar}`}
                                    alt="avatar"
                                />
                                @{user.username}
                            </a>
                        </div>
                    </div>
                    {user.name}
                </div>
            </div>
        );
    });

    const handleContent = () => {
        if (props.content === "followers") {
            return (
                <div>
                    <h3 className="follows-modal-title">Followers</h3>
                    {followersDisplayed}
                </div>
            )
            
        } else if (props.content === "following") {
            return (
                <div>
                    <h3 className="follows-modal-title">Following</h3>
                    {followingDisplayed}
                </div>
            )
        }
    };

    return (
        <>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="follows-modal-container">
                        {handleContent()}
                    </div>
                </Fade>
            </Modal>
        </>
    );
}
