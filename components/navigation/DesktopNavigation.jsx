import React from "react";
import Link from "next/link";

import {
    Button,
    AppBar,
    Box,
    IconButton,
    MenuIcon,
    Toolbar,
    Typography,
} from '@/components/mui';
import { useTheme } from "@mui/material/styles";
import { useUser } from "@auth0/nextjs-auth0/client";

import ShoppingCartDisplay from "@/components/BasketDisplay";


function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
}) {
  const { user } = useUser();
  const theme = useTheme();
  // console.log(theme);
  const lightTextColor = theme.palette.common.white;
  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href={`/`}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: lightTextColor,
            }}
          >
            My Shop
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {user && <ShoppingCartDisplay user={user} />}
          {user && user["https://full-stack-vert.vercel.app/admin"] && (
              <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/blog"
              >
              Admin
            </Button>
            )}
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/blog"
            >
              Blog
            </Button>
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/contact"
            >
              Contact
            </Button>
            { user ? (
              <>
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/profile"
            >
              Profile
            </Button>
            <Button
                  href="/api/auth/logout"
                  component={Link}
                  sx={{ color: lightTextColor }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button
                href="/api/auth/login"
                component={Link}
                sx={{ color: lightTextColor }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;