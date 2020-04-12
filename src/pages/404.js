import React from 'react';
import {Provider, Heading, Subhead, Flex, NavLink, Small} from 'rebass';

function NotFoundHandler() {
    return (
        <Provider>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Heading>404</Heading>
                <Subhead>
                    <NavLink children="Go back" href="/"/>
                </Subhead>

            </Flex>
            <Flex is="footer" alignItems="center" p={3}>
                <NavLink children="Terms & condition" href="#"/>
                <NavLink children="Privacy Policy" href="#"/>
                <Small color="grey" ml="auto">© Websheets.app, 2020</Small>
            </Flex>
        </Provider>
    );
}

export default NotFoundHandler;
