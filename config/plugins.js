module.exports = {
  // graphql: {
  //   config: {
  //     endpoint: '/graphql',
  //     shadowCRUD: true,
  //     playgroundAlways: false,
  //     depthLimit: 7,
  //     amountLimit: 100,
  //     apolloServer: {
  //       tracing: false,
  //     },
  //   },
  // },
  ckeditor: true,
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
};
