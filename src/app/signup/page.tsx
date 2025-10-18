"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { signUp } from "~/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom={true}>
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required={true}
            fullWidth={true}
            id="name"
            name="name"
            label="Full Name"
            autoComplete="name"
            autoFocus={true}
          />
          <TextField
            margin="normal"
            required={true}
            fullWidth={true}
            id="email"
            name="email"
            label="Email Address"
            type="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required={true}
            fullWidth={true}
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            inputProps={{ minLength: 8 }}
          />
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
