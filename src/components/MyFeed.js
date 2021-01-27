import React from "react";
import FeedBookPost from "./FeedBookPost";
import { Button } from "@material-ui/core";
import LinearLoading from "./material-ui/LinearLoading"

const MyFeed = (props) => {

    const handleFeed = props.feed.map((post, idx) => {
        return <FeedBookPost key={idx} post={post} />;
    });

    const handleLoader = () => {
        if (props.loadingFeed) {
            return <LinearLoading/>
        }
    }

    return (
        <div>
            <div className="refresh-container">
                <Button
                    style={{
                        backgroundColor: "#818AA3",
                        fontWeight: "bold",
                        color: "whitesmoke",
                        margin: "5px",
                        width: "98%",
                    }}
                    onClick={() => {props.handleRefresh()}}
                    variant="contianed"
                >
                    Refresh Feed
                </Button>
                {handleLoader()}
            </div>
            {handleFeed}
        </div>
    );
};

export default MyFeed;
