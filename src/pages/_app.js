import App from 'next/app'
import Head from 'next/head'
import React from 'react'

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <>
                <Head>
                    <meta charSet="utf-8"/>
                    <link rel="shortcut icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/bar-chart_1f4ca.png"/>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <link rel="manifest" href="/manifest.json"/>
                    <title>Websheets.app | Convert your sheet data to a Web app</title>
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}
