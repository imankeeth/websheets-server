import React from 'react';
import { useRouter } from 'next/router';
import {CallToAction} from 'react-landing-page';
import {Provider, Heading, Flex, Absolute, NavLink, Small, Text, Image, Box, Label, Input} from 'rebass';

function GetSheetKey() {
    const router = useRouter();
    const { userId } = router.query;
    console.log(router.query);
    return (
        <Provider>
            <Flex flexDirection="column" p={2}>
                <Heading mt={3}>Steps to connect to your sheet</Heading>
                <Text>(Only Google supported)</Text>

                <Text mt={[4]}>1. Get the spreadsheet ID from the Google Spreadsheet URL</Text>
                <Box width={['75%']}>
                    <Image
                        src={'/spreadsheet-screenshot.png'}
                        alt={'Google sheet url'}
                        mt={2}
                        sx={{
                            width: ['100%', '50%'],
                            borderRadius: 8,
                        }}
                    />
                </Box>
                <Text mt={[3]}>2. Click Publish Website</Text>

                <Box
                    as='form'
                    onSubmit={e => e.preventDefault()}
                    mt={5}
                >
                    <Box>
                        <Label htmlFor='text'>Spreadsheet ID</Label>
                        <Input
                            id='text'
                            name='text'
                            type='text'
                            placeholder={'1271u2y3t7u1623t17623t'}
                        />
                        <CallToAction href='#' mt={2}>Publish 🎉</CallToAction>
                    </Box>
                </Box>
            </Flex>
            <Absolute zIndex={1} left={0} right={0} bottom={0}>
                <Flex is="footer" alignItems="center" p={3}>
                    <NavLink children="Terms & condition" href="#"/>
                    <NavLink children="Privacy Policy" href="#"/>
                    <Small color="grey" ml="auto">© Websheets.app, 2020</Small>
                </Flex>
            </Absolute>
        </Provider>
    );
}

export default GetSheetKey;
