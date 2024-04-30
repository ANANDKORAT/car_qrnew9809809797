import React from "react";

const OfferCountdown = () => {

    return (
        <>
            <div className="mt-2">
                <marquee
                    width="100%"
                    direction="left"
                    height="30px"
                    fontWeight="700"
                    style={{ color: "white" }}
                >
                    <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
                </marquee>
            </div>
        </>
    )
}

export default OfferCountdown;
