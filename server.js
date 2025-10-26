const express = require('express');
const { createFacilitator } = require('@coinbase/x402');

const app = express();
const port = process.env.PORT || 3000;

// 配置 x402 中介軟體
const facilitator = createFacilitator({
  walletAddress: '0x6540d24c334a22813ebe849e1034ed53c7c951e9',
  network: 'base',
  currency: 'USDC',
  amount: '1'
});

app.use(facilitator);

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
