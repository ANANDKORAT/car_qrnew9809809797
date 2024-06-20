import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FAQ = () => {

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={4} xs={6} className="mt-4">
                    <div style={{
                        border: '1px solid #d9d9d9',
                        padding: '20px 10px',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <Image
                                src="https://thehouseofrare.com/cdn/shop/files/MicrosoftTeams-image_6_360x.png?v=1692440694"
                                width={150} style={{height: '100px'}}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#1c1b1b',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '700',
                                letterSpacing: '.2rem'
                            }} className="mb-0"> Shipping, Order Tracking &amp; Delivery </p>
                        </div>
                    </div>
                </Col>
                <Col md={4} xs={6} className="mt-4">
                    <div style={{
                        border: '1px solid #d9d9d9',
                        padding: '20px 10px',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <Image
                                src="https://thehouseofrare.com/cdn/shop/files/Return_and_exchange_360x.png?v=1692425501"
                                width={150} style={{height: '100px'}}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#1c1b1b',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '700',
                                letterSpacing: '.2rem'
                            }} className="mb-0"> Return And Exchange </p>
                        </div>
                    </div>
                </Col>
                <Col md={4} xs={6} className="mt-4">
                    <div style={{
                        border: '1px solid #d9d9d9',
                        padding: '20px 10px',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <Image
                                src="https://thehouseofrare.com/cdn/shop/files/Cancellation_and_modification_2_360x.png?v=1692425529"
                                width={150} style={{height: '100px'}}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#1c1b1b',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '700',
                                letterSpacing: '.2rem'
                            }} className="mb-0"> Cancellation And Modification </p>
                        </div>
                    </div>
                </Col>
                <Col md={4} xs={6} className="mt-4">
                    <div style={{
                        border: '1px solid #d9d9d9',
                        padding: '20px 10px',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <Image src="https://thehouseofrare.com/cdn/shop/files/Payments_360x.png?v=1692425547"
                                   width={150} style={{height: '100px'}}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#1c1b1b',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '700',
                                letterSpacing: '.2rem'
                            }} className="mb-0"> Payments </p>
                        </div>
                    </div>
                </Col>
                <Col md={4} xs={6} className="mt-4">
                    <div style={{
                        border: '1px solid #d9d9d9',
                        padding: '20px 10px',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <Image src="https://thehouseofrare.com/cdn/shop/files/Sizing_help_360x.png?v=1692425605"
                                   width={150} style={{height: '100px'}}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#1c1b1b',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '700',
                                letterSpacing: '.2rem'
                            }} className="mb-0"> Sizing Help </p>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="text-center mt-5">
                <h3 style={{fontSize: '18px', fontWeight: 700, color: '#727272', textAlign: 'center'}}>Get Our
                    Newsletter</h3>
                <div className="Footer__Content Rte">
                    Subscribe to receive update, access to exclusive deals, and more.
                </div>
                <Form method="post" action="/contact#footer-newsletter" id="footer-newsletter" accept-charset="UTF-8"
                      className="my-3">
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
        </Container>
    )
}

export default FAQ;
