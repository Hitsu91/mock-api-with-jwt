const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET ||
  'b8dde9089b0a194fbd055100c9a08ce9b1155db3b7aca26b27e649518a8adc884d1e1db57dd3a276ca74e2ca77c94a725eef4bfa2303c39fa63cd69bec4ac346';
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET ||
  '081a25f40fd2126b14ce0b29cc3edfe2017d3778e3c6bf0032d62661a2d36e81ba6148d1ad22f910aaec8ae860731eaf3e1f02ad98588a46c4ca0fc45a76a6da';

module.exports = { accessTokenSecret, refreshTokenSecret };
