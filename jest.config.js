module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    "preset": "react-native",
    "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-query)"
    ],
    "setupFilesAfterEnv": ["./setupTest.js"],
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
};

