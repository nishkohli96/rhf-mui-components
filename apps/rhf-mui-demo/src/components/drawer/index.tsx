import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { DemoPageLinks } from '@/constants';

export default function DrawerContent() {
  return (
    <Paper
      sx={{
        height: '100%',
        borderRadius: 0,
      }}
    >
      <List>
        {DemoPageLinks.map((link) => (
          <ListItem key={link.href.replace('/', '')} disablePadding>
            <ListItemButton href={`${link.href}`}>
              <ListItemText>{link.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
