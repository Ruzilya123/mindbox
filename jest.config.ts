module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transformIgnorePatterns: [
        "/node_modules/(?!your-module-name|other-module).+\\.js$"
    ],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
    },
};
