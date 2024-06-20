import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const Shippingpolicy = () => {

    return (
        <Container id="main" role="main">
            <div className="{window.location.hostname}-policy__container">
                <div className="{window.location.hostname}-policy__title">
                    <h1>Shipping policy </h1>
                </div>

                <div className="{window.location.hostname}-policy__body">
                    <div className="rte">
                        <div style={{textalign: 'center'}}><strong><span>Shipping  Delivery Policy</span></strong></div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">We ship the orders on the next working day. In any case we will ship your order within 48 hours.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">For Customer living in Metros and Tier-1 cities products will get delivered within 2 working days, and for the rest of India they make take up-to<strong> 4- 7 working days.</strong></span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">Delivery of products is however, limited to certain pin-code/locations. For more information on delivery locations of products, you can use the ‘Check Delivery’ option on product page.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">You will get updated status of shipment at its each stage from order is placed to, processes to, ready to ship to, dispatch to deliver. You can track your orders through; My Account -&gt; Orders.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">Please note our shipping policy as follows:</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">However in some cases, we may take longer, up to <strong>3 working days</strong>, to ship the order.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">We ship on all week days (Monday to Saturday), excluding Sunday &amp; public holidays.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">To ensure that your order reaches you in the fastest time and in good condition, we only ship through reputed courier agencies.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">While we strive hard to deliver on time, due to the load with the couriers, estimate a delay of 0-2 days.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">While we shall endeavor to ship all items in your order together, this may not always be possible due to product characteristics, or availability.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">Please note all items will be shipped with an invoice mentioning the price, as per Indian Tax Regulations.</span>
                        </div>
                        <div data-mce-fragment="1" style={{textalign: 'center'}}><span data-mce-fragment="1">We Are not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within<strong> 3 working days</strong> from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.</span>
                        </div>


                    </div>
                </div>
                <div className="text-center">
                    <h3 style={{fontSize: '18px', fontWeight: 700, color: '#727272', textAlign: 'center'}}>Get Our
                        Newsletter</h3>
                    <div className="Footer__Content Rte">
                        Subscribe to receive update, access to exclusive deals, and more.
                    </div>
                    <Form method="post" action="/contact#footer-newsletter" id="footer-newsletter"
                          accept-charset="UTF-8" className="my-3">
                        <input type="hidden" name="form_type" value="customer"/>
                        <input type="hidden" name="utf8" value="✓"/>
                        <input type="hidden" name="contact[tags]" value="newsletter"/>
                        <Form.Control size="lg" type="email" placeholder="Enter email"/>
                        <Button type="button" variant="dark" className="mt-3" style={{
                            background: "var(--them-color)",
                            borderColor: "var(--them-color)",
                        }}>Subscribe</Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Shippingpolicy;
