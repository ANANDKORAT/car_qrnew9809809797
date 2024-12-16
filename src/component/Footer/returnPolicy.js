import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const ReturnPolicy=()=>{

    return (
        <Container id="main" role="main">
          <div className="shopify-policy__container">
            <div className="shopify-policy__title">
                <h1>Refund policy</h1>
            </div>

            <div className="shopify-policy__body">
                <div className="rte">
                   
    <h1>Return Policy</h1>
    
    <p>We have a <strong>3 days return policy</strong>, which means you have 3 days after receiving your item to request a return.</p>
    
    <p>To be eligible for a return, your items must be in the same condition as when you received them: unused, with tags, and in the original packaging. You’ll also need the receipt or proof of purchase.</p>
    
    <p><strong>UNBOXING VIDEO IS A MUST TO REQUEST A REPLACEMENT</strong></p>
    
    <p>To start a return, you can contact us at <a href="mailto:support@<script>document.write(window.location.hostname);</script>">support@<script>document.write(window.location.hostname);</script></a>.</p>

    <p>Please note that returns will need to be sent to the following address:</p>
    
    <pre>
    RATHOD RAVIBHAI PRAVINBHAI
    BHATHIJI FALIYU, BHIMTALAV, ANAND, GUJARAT -388620
    </pre>

    <p>If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>

    <p>You can always contact us for any return questions at <a href="mailto:support@<script>document.write(window.location.hostname);</script>">support@<script>document.write(window.location.hostname);</script></a>.</p>

    <h2>Damages and Issues</h2>
    
    <p>Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

    <h2>Exceptions / Non-returnable Items</h2>
    
    <p>Certain types of items cannot be returned, such as bulk orders or offer/discount products.</p>

    <h2>Exchanges</h2>
    
    <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>

    <h2>Refund Policy</h2>
    
    <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded to your original payment method within 3 business days. Please note that it can take some time for your bank or credit card company to process and post the refund too.</p>

    <p>If more than 5 to 7 business days have passed since we’ve approved your return, please contact us at <a href="mailto:support@<script>document.write(window.location.hostname);</script>">support@<script>document.write(window.location.hostname);</script></a>.</p>
            </div>
            <div className="text-center">
                <h3 style={{ fontSize: '18px', fontWeight: 700, color:'#727272', textAlign: 'center'}}>Get Our Newsletter</h3>
                <div className="Footer__Content Rte">
                    Subscribe to receive update, access to exclusive deals, and more.
                </div>
                <Form method="post" action="/contact#footer-newsletter" id="footer-newsletter" accept-charset="UTF-8" className="my-3">
                    <input type="hidden" name="form_type" value="customer" />
                    <input type="hidden" name="utf8" value="✓" />
                    <input type="hidden" name="contact[tags]" value="newsletter" />
                    <Form.Control size="lg" type="email" placeholder="Enter email" />
                    <Button type="button" variant="dark" className="mt-3" style={{background: "var(--them-color)",
                        borderColor: "var(--them-color)",}}>Subscribe</Button>
                </Form>
             </div>
            </div>
        </Container>
    );
}

export default ReturnPolicy;
