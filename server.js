const express = require('express');
const { paymentMiddleware } = require('x402-express');
const { facilitator } = require('@coinbase/x402');

const app = express();
const port = process.env.PORT || 3000;

// 配置 x402 中介軟體
app.use(paymentMiddleware(
  '0x6540d24c334a22813ebe849e1034ed53c7c951e9',  // 你的 Base 錢包地址
  {
    '/premium-content': {  // 保護的端點
      price: '1',  // 1 USDC
      network: 'base'  // Base 主網
    }
  },
  facilitator  // 使用 Coinbase facilitator
));

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
