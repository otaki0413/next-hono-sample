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
        <Typography component="h1" gutterBottom={true} variant="h4">
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            autoComplete="name"
            autoFocus={true}
            fullWidth={true}
            id="name"
            label="Full Name"
            margin="normal"
            name="name"
            required={true}
          />
          <TextField
            autoComplete="email"
            fullWidth={true}
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            required={true}
            type="email"
          />
          <TextField
            autoComplete="new-password"
            fullWidth={true}
            id="password"
            inputProps={{ minLength: 8 }}
            label="Password"
            margin="normal"
            name="password"
            required={true}
            type="password"
          />
          <Button
            fullWidth={true}
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
