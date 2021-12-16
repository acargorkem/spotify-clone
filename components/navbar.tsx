import NextLink from 'next/link'
import {
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'

const Navbar = ({ menus }) => {
  return (
    <List spacing={2}>
      {menus.map((menu) => (
        <ListItem key={menu.name} paddingX="20px" fontSize="16px">
          <LinkBox>
            <NextLink href={menu.route} passHref>
              <LinkOverlay>
                <ListIcon as={menu.icon} color="white" marginRight="20px" />
                {menu.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  )
}

export default Navbar
