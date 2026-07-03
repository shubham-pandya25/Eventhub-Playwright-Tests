const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    retries: 1,

    use: {
        BASE_URL : process.env.BASE_URl,
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },

    ],
});