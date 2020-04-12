import React from 'react';
import { Provider, Heading, Subhead, Flex, Box, Relative, Absolute, NavLink } from 'rebass';
import { Hero, CallToAction, ScrollDownIndicator, Section, MacWindow, Phone, PricingTier } from 'react-landing-page';

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

function IndexPage() {
    return (
        <Provider>
            <Relative pb={5}>
                <Absolute zIndex={1} left={0} right={0} top={0}>
                    <Flex is="header" p={3}>
                        <NavLink href="/" fontSize={3}>
                            WEBSHEETS
                        </NavLink>
                        <CallToAction href="/login/google" ml="auto">
                            Get Started
                        </CallToAction>
                    </Flex>
                </Absolute>
            </Relative>
            <Hero color="black">
                <Flex flexWrap="wrap" alignItems="center">
                    <Flex alignItems="flex-start" width={[1, 1, 1 / 2]} p={3}>
                        <MacWindow style={{ transform: 'translate(32px, 0px)' }} src="/landing-page-sheet.jpg" />
                        <MacWindow style={{ transform: 'translate(0, 50px)' }} src="/transformed-website.jpg" />
                    </Flex>
                    <Box width={[1, 1, 1 / 2]} p={3}>
                        <Subhead textAlign="center">
                            Convert your sheet data into a beautiful website or dashboard
                        </Subhead>
                        <Flex mt={3} flexWrap="wrap" justifyContent="center">
                            <CallToAction href="/getting-started" mr={3}>
                                Get Started Now
                            </CallToAction>
                        </Flex>
                    </Box>
                </Flex>
                <ScrollDownIndicator />
            </Hero>
            <Section width={1} heading="Pricing" bg="green">
                <PricingTier
                    bg="blue"
                    tierName="Basic"
                    price="Free"
                    billingType="1 website"
                    sellingPoints={[
                        '-  Connect 1 sheet',
                        '-  Custom domain with SSL',
                        '-  3 Subpages'
                    ]}
                >
                    <CallToAction bg="black" width={1} mt="auto">
                        Get Started
                    </CallToAction>
                </PricingTier>
            </Section>
        </Provider>
    );
}

export default IndexPage;
