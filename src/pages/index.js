import React from 'react';
import {Provider, Heading, Subhead, Flex, Box, Relative, Absolute, NavLink, Small} from 'rebass';
import {
    Hero,
    CallToAction,
    ScrollDownIndicator,
    Section,
    MacWindow,
    PricingTier,
    SignUp,
} from 'react-landing-page';

const featherCheckmark = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);
const theme = {
    colors: {
        blue: '#a79344',
    },
};
function IndexPage() {
    const addEmail = () =>
        new Promise((resolve, reject) => {
            resolve(true);
        });
    const addToNewsLetter = async (email) => {
        await addEmail();
        console.log('Newsletter sent to email: ', email);
    };
    return (
        <Provider>
            <Relative pb={5}>
                <Absolute zIndex={1} left={0} right={0} top={0}>
                    <Flex is="header" p={3}>
                        <NavLink href="/" fontSize={3}>
                            WEBSHEETS
                        </NavLink>
                        <CallToAction
                            theme={theme}
                            href="/login/google"
                            ml="auto"
                        >
                            Get Started
                        </CallToAction>
                    </Flex>
                </Absolute>
            </Relative>
            <Hero color="black">
                <Flex flexWrap="wrap" alignItems="center">
                    <Flex alignItems="flex-start" width={[1, 1, 1 / 2]} p={3}>
                        <MacWindow
                            style={{ transform: 'translate(32px, 0px)' }}
                            src="/landing-page-sheet.jpg"
                        />
                        <MacWindow
                            style={{ transform: 'translate(0, 50px)' }}
                            src="/transformed-website.jpg"
                        />
                    </Flex>
                    <Box width={[1, 1, 1 / 2]} p={3}>
                        <Subhead textAlign="center">
                            Convert your sheet data into a beautiful website or
                            dashboard
                        </Subhead>
                        <Flex mt={3} flexWrap="wrap" justifyContent="center">
                            <CallToAction
                                theme={theme}
                                href="/login/google"
                                mr={3}
                            >
                                Get Started Now
                            </CallToAction>
                        </Flex>
                    </Box>
                </Flex>
                <ScrollDownIndicator />
            </Hero>
            <Section width={1} bg="#0b2647" color='white'>
                <Heading color="white">Pricing</Heading>
                <Flex justifyContent="space-around">
                    <PricingTier
                        width={2 / 5}
                        bg="#041121"
                        tierName="Personal"
                        price="Free"
                        billingType="1 website"
                        sellingPoints={[
                            '-  Connect 1 sheet',
                            '-  Google Analytics',
                            '-  Upto 3 API integrations',
                            '-  Business hour support',
                            '-  1+ day response',
                        ]}
                    >
                        <CallToAction theme={theme} href="/login/google" width={1} mt="auto">
                            Get Started
                        </CallToAction>
                    </PricingTier>
                    <PricingTier
                        bg="grey"
                        width={2 / 5}
                        tierName="Premium"
                        price="$$"
                        billingType="Unlimited websites 💯"
                        sellingPoints={[
                            '-  Custom domain with SSL',
                            '-  Social authentication',
                            `-  Remove 'Made with websheets.app' branding`,
                            '-  24x7 Support',
                            '** More premium feature under development',
                        ]}
                    >
                        <CallToAction disabled bg="black" width={1} mt="auto">
                            Coming soon
                        </CallToAction>
                    </PricingTier>
                </Flex>
            </Section>
            <Section width={1}>
                <Flex flexDirection="column" justifyContent="center">
                    <Heading>Sign up to our Newsletter</Heading>
                    <SignUp onSubmit={addToNewsLetter} mt={3} mx='auto' width={1}/>
                </Flex>
            </Section>
            <Flex is="footer" alignItems="center" p={3}>
                <NavLink children="Terms & condition" href="#"/>
                <NavLink children="Privacy Policy" href="#"/>
                <Small color="grey" ml="auto">© Websheets.app, 2020</Small>
            </Flex>
        </Provider>
    );
}

export default IndexPage;
