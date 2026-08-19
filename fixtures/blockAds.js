async function blockAds(page) {
    await page.route('**/*doubleclick*', (route) => route.abort());
    await page.route('**/*googlesyndication*', (route) => route.abort());
    await page.route('**/*google_vignette*', (route) => route.abort());
    await page.route('**/*adsbygoogle*', (route) => route.abort());
}

module.exports = { blockAds };