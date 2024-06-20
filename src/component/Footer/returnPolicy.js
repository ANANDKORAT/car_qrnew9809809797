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
                    <p><strong>Returns</strong> <br /> Our return policy lasts 7 days. If 7 days have gone by since your order delivery, unfortunately, we can’t offer you a refund or exchange.</p>
                    <p>No returns and only exchanges will be applicable on all orders purchased during the sale time.</p>
                    <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.&nbsp;</p>
                    <p><span>Wrong product handover in return: Action will be taken on the basis of package opening footage &amp; will be returning the same product we have received. In such cases, the seller will not be liable for any loss &amp; no action will be made if the customer fails to raise the query within 7 days of pickup.<br/></span><br/> Several types of goods are exempt from being returned. Perishable goods such as boxers shorts, sunglasses, leather jackets, and socks cannot be returned.</p>
                    <p>If the product has been collected by the courier partner and is subsequently returned to you due to unexpected circumstances, the courier partner may &nbsp;request you to show a government-issued ID as evidence of the handover.<br/> <br/> Additional non-returnable items: <br/> - Gift cards <br/> - Downloadable software products<br/>- For additional products that are not returnable, it is mentioned in the product description.</p>
                    <p>To complete your return, we require a receipt or proof of purchase. <br /> Please do not send your purchase back to the manufacturer. <br /> <br /> There are certain situations where only partial refunds are granted (if applicable) <br/> - Any item not in its original condition, is damaged or missing parts for reasons not due to our error <br/> - Any item that is returned more than 10 days after delivery</p>
                    <p><strong>Refunds (if applicable)</strong> <br /> Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. <br/> If it is&nbsp;approved, then your refund will be processed and credited to your THE HOUSE OF RARE Wallet / Source of payment /&nbsp;bank account (for COD only) within 7-10 working days.&nbsp;<br/> <br/> <strong>Late or missing refunds (if applicable)</strong> <br/> If you haven’t received a refund yet, first login in you account again and check.</p>
                    <p>If you’ve done all of this and you still have not received your refund yet, please contact us at support@{window.location.hostname}. <br /> <br/> <strong>Sale items (if applicable)</strong> <br /> Only regular priced items may be refunded, unfortunately on few item on a conveyed sale day cannot be refunded or returned.&nbsp;<br/> <br/> <strong>Exchanges (if applicable)</strong> <br/> We only replace items if they are defective or damaged or size doesn't fit well. If you need to exchange it for the same item, please login in your account and place an exchange request directly. There is no additional charge for any exchange orders. For new orders of lower price, the balance amount will be refunded as a gift voucher.</p>
                    <p>Exchange of product is subjected to availability of size.</p>
                    <p><strong>Gifts</strong> <br /> If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you. <br/> <br/> If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return. <br/> <br/> <strong>Shipping</strong> <br/> To return your product, you can directly do it through our return center.</p>
                    <p>Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                    <p>Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
                    <p><strong>Self-Ship<br /></strong>If your Pincode is not in the serviceable area i.e. if our delivery agents are not able to come for pick-up, the customer has to self-ship the product. The shipping charge will be refunded only if the customer provides the&nbsp;Docket Slip.</p>
                </div>
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
