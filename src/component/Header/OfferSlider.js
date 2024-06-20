import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const OfferSlider=()=>{
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            vertical: true,
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout(e) {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 3000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    );

    const offerText = "Buy 2 Get 1 Free (Add 3 item to cart)";

    return (
            <div ref={sliderRef} className="keen-slider" style={{height: '25px', background: process.env.REACT_APP_THEAM_COLOR , color: '#fff'}}>
                {Array.from({ length: 6 }, (v, k) => k + 1)?.map((a, x)=> (
                    <div className={`keen-slider__slide number-slide${x+1}`} style={{ background: process.env.REACT_APP_THEAM_COLOR }}>
                        <div style={{fontSize : "16px"}}>
                            {offerText}
                        </div>
                    </div>
                ))}
            </div>
    )
}

export default OfferSlider;
