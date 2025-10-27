const express = require('express');
const { facilitator, verifyPayment } = require('@coinbase/x402');

const app = express();
const port = process.env.PORT || 3000;

// 自定義中介軟體檢查支付
app.use('/premium-content', async (req, res, next) => {
  const paymentDetails = {
    walletAddress: '0x6540d24c334a22813ebe849e1034ed53c7c951e9',
    network: 'base',
    currency: 'USDC',
    amount: '1'
  };

  try {
    const isPaid = await verifyPayment(req, paymentDetails, facilitator);
    if (!isPaid) {
      res.status(402).json({
        error: 'Payment Required',
        paymentDetails
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// 付費資源端點
app.get('/premium-content', (req, res) => {
  res.json({
    message: 'Thank you for your payment!',
    content: 'This is your premium content. Enjoy!'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
