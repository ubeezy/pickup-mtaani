import { useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react';
import { Avatar, Box, Dialog, Paper } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react'
import { useTheme } from '@mui/material/styles';


export default function SignIn() {
  const supabase = useSupabaseClient()
  const theme = useTheme()
  const open = Boolean(true);

  return (
    <Dialog open={open}>
      <Box
        component={Paper}
        sx={{
          py: 6,
          px: 9,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar 
          sx={{ height: "4rem", width: "4rem",mb:2 }} 
          src="https://pbs.twimg.com/profile_images/1240932977422598144/VZ-Bp63M_400x400.jpg" 
        />
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#ffc107",
                  brandAccent: '#FDD835',
                },
              },
            },
          }}
          magicLink
          providers={['google']}
          redirectTo="/signin"
          theme={theme.palette.mode}
        />
      </Box>
    </Dialog>
  );
}