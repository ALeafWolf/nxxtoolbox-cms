module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "nxxtoolbox@outlook.com",
        defaultReplyTo: "nxxtoolbox@outlook.com",
        testAddress: "nxxtoolbox@outlook.com",
      },
    },
  },
  ckeditor: true,
});
