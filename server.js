const express = require('express');
const { createFacilitatorConfig, x402 } = require('@coinbase/x402');

const app = express();
const port = process.env.PORT || 3000;

// 配置 x402 中介軟體
app.use(x402({
  config: createFacilitatorConfig({
    walletAddress: '0x6540d24c334a22813ebe849e1034ed53c7c951e9', // 你的 Base 錢包地址
    network: 'base',
    currency: 'USDC',
    amount: '2' // 2 USDC
  })
}));

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
