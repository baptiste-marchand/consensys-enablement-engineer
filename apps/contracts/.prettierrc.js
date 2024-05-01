module.exports = {
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 120,
        tabWidth: 4,
        bracketSpacing: true,
      },
    },
  ],
  plugins: ['prettier-plugin-solidity'],
};
