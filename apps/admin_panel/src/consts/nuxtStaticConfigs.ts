const sandbox = process.env.NUXT_SANDBOX_NAME;
export const runtimeConfig = {
  public: {
    bot_url: 'https://t.me/zarinpalrobot?start=v4',
    connect_url:
      sandbox === 'develop'
        ? 'https://connect-demo.hamrah.in/'
        : sandbox === 'stage'
        ? 'https://connect-stg.zarinpal.name/'
        : 'https://connect.zarinpal.com/',
    docs_url: 'https://zarinpal.com/docs',
    instantPayoutMinAmount: 1000000,
    next_panel_link: 'https://next.zarinpal.com/',
    page: 1,
    pageSize: 15,
    payoutMinAmount: 100000,
    public_api_base:
      sandbox === 'develop'
        ? 'https://v4-demo.hamrah.in/api'
        : sandbox === 'stage'
        ? 'https://stg-my.zarinpal.name/api'
        : 'https://next.zarinpal.com/api',
    qr_url: 'https://tools.zarinpal.com/qr?r=q&s=256&q=',
    receipt_address: 'https://receipt.zarinp.al/p',
    redirect_url:
      sandbox === 'develop'
        ? 'https://shell.hamrah.in/'
        : sandbox === 'stage'
        ? 'https://stg-my.zarinpal.name/'
        : 'https://next.zarinpal.com/beta/',
    sandbox_name: sandbox,
    short_link: 'https://zarinp.al/',
    telegram_url: 'https://t.me/share/url?url=',
    upload_url: 'https://uploads.zarinpal.com/',
    version: process.env.BUILD_VERSION,
    whatsapp_url: 'https://api.whatsapp.com/send?text=',
    zarin_desk_url:
      sandbox === 'develop'
        ? 'https://zarindesk-demo.hamrah.in/'
        : sandbox === 'stage'
        ? 'https://desk.zarinpal.name/'
        : 'https://desk.zarinpal.com/',
    zarin_url: 'https://zarinpal.com/',
  },
};
