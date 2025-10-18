"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { authClient } from "~/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!(isPending || session?.user)) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!session?.user) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Redirecting...</Typography>
        </Box>
      </Container>
    );
  }

  const { user } = session;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography component="h1" gutterBottom={true} variant="h4">
          Dashboard
        </Typography>
        <Typography variant="h6">Welcome, {user.name || "User"}!</Typography>
        <Typography color="text.secondary" variant="body1">
          Email: {user.email}
        </Typography>
        <Button
          color="primary"
          fullWidth={true}
          onClick={() => authClient.signOut()}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
}
