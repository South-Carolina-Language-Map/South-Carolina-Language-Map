import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

//mui style
import {
  Stack,
  Container,
  Box
} from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
    <Stack spacing={2}>
      <RegisterForm />
      <Box>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}> Login</button>
      </Box>
    </Stack>
  </Container>
  );
}

export default RegisterPage;
