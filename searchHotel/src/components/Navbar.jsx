import LanguageIcon from "@mui/icons-material/Language";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AppBar, Badge, Box, styled, Toolbar, Typography } from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
// const NavbarColor = styled({
//   palette: {
//     primary: "#226885",
//   },
// });

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          ZAREN TRAVEL
        </Typography>
        <Icons>
          <Badge>
            <LanguageIcon />
          </Badge>
          <Badge>
            <ExitToAppIcon />
            <Typography>Sign up</Typography>
          </Badge>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
