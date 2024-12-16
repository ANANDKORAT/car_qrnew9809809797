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
                     <p>We have a <strong>3-day return policy</strong>, which means you have 3 days after receiving your item to request a return.</p>
    <p>To be eligible for a return, your items must meet the following conditions:</p>
    <ul>
        <li>Item must be in the damaged condition that you received it.</li>
        <li>Unused, with tags, and in its original packaging.</li>
        <li>You must provide the receipt or proof of purchase.</li>
    </ul>
    <p><strong>UNBOXING VIDEO IS A MUST TO REQUEST A REPLACEMENT.</strong></p>

    <p>To start a return, you can contact us at <a href="mailto:paper1102@outlook.com">paper1102@outlook.com</a>.</p>
    <p>Returns should be sent to the following address:</p>
    <address>
        RATHOD RAVIBHAI PRAVINBHAI<br>
        BHATHIJI FALIYU, BHIMTALAV,<br>
        ANAND, GUJARAT - 388620
    </address>

    <p>If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. <strong>Items sent back to us without first requesting a return will not be accepted.</strong></p>

    <div class="contact-info">
        <p>If you have any return questions, you can always contact us at <a href="mailto:paper1102@outlook.com">paper1102@outlook.com</a>.</p>
    </div>

    <h2>Damages and Issues</h2>
    <p>Please inspect your order upon reception and contact us immediately if:</p>
    <ul>
        <li>The item is defective or damaged.</li>
        <li>You receive the wrong item.</li>
    </ul>
    <p>This will help us evaluate the issue and make it right.</p>

    <h2>Exceptions / Non-Returnable Items</h2>
    <p>Certain types of items cannot be returned, such as:</p>
    <ul>
        <li>Bulk orders.</li>
        <li>Offer or discount products.</li>
    </ul>

    <h2>Exchanges</h2>
    <p>The fastest way to ensure you get what you want is to return the item you have. Once the return is accepted, make a separate purchase for the new item.</p>

    <h2>Refund Policy</h2>
    <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within <strong>3 business days</strong>.</p>
    <p>Please remember it can take some time for your bank or credit card company to process and post the refund.</p>
    <p>If more than 5 to 7 business days have passed since we’ve approved your return, please contact us at <a href="mailto:paper1102@outlook.com">paper1102@outlook.com</a>.</p>

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
